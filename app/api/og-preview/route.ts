import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl.startsWith('http://') || targetUrl.startsWith('https://') ? targetUrl : `https://${targetUrl}`);
  } catch {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 WebEmbedPreview/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    const html = await response.text();

    // Helper regex extractors
    const extractTag = (regex: RegExp) => {
      const match = html.match(regex);
      return match ? match[1].trim() : null;
    };

    const title =
      extractTag(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
      extractTag(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i) ||
      extractTag(/<title[^>]*>([^<]+)<\/title>/i) ||
      parsedUrl.hostname;

    const description =
      extractTag(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
      extractTag(/<meta\s+name=["']twitter:description["']\s+content=["']([^"']+)["']/i) ||
      extractTag(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
      'No description provided by the website.';

    let image =
      extractTag(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
      extractTag(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i) ||
      null;

    if (image && !image.startsWith('http://') && !image.startsWith('https://')) {
      try {
        image = new URL(image, parsedUrl.origin).toString();
      } catch {
        image = null;
      }
    }

    const siteName =
      extractTag(/<meta\s+property=["']og:site_name["']\s+content=["']([^"']+)["']/i) ||
      parsedUrl.hostname.replace('www.', '');

    const favicon = `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}&sz=128`;

    return NextResponse.json({
      url: parsedUrl.toString(),
      hostname: parsedUrl.hostname,
      title,
      description,
      image,
      siteName,
      favicon,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch metadata';
    return NextResponse.json({
      url: parsedUrl.toString(),
      hostname: parsedUrl.hostname,
      title: parsedUrl.hostname,
      description: `Could not retrieve live OpenGraph tags: ${message}`,
      image: null,
      siteName: parsedUrl.hostname,
      favicon: `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}&sz=128`,
    });
  }
}
