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

  // Only allow http and https protocols
  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return NextResponse.json({ error: 'Only http and https protocols are supported' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(parsedUrl.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 WebEmbedChecker/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    const headers = response.headers;
    const xFrameOptions = headers.get('x-frame-options');
    const csp = headers.get('content-security-policy') || headers.get('content-security-policy-report-only');
    const cors = headers.get('access-control-allow-origin');
    const contentType = headers.get('content-type') || '';
    const finalUrl = response.url;

    // Check for frame-ancestors in CSP
    let cspFrameAncestors: string | null = null;
    if (csp) {
      const match = csp.match(/frame-ancestors\s+([^;]+)/i);
      if (match) {
        cspFrameAncestors = match[1].trim();
      }
    }

    // Determine embeddability
    let isEmbeddable = true;
    let reason = 'Site does not restrict framing via HTTP headers.';
    let verdict = 'Direct <iframe> embedding is allowed!';
    let recommendation = 'You can use a standard <iframe src="..."> tag safely.';

    if (xFrameOptions) {
      const xfo = xFrameOptions.toUpperCase();
      if (xfo.includes('DENY')) {
        isEmbeddable = false;
        reason = `Blocked by X-Frame-Options: ${xFrameOptions}. The server explicitly prohibits being embedded in any frame.`;
        verdict = 'Blocked by X-Frame-Options: DENY';
        recommendation = 'Use an official embed API/widget, an OpenGraph preview card, or a reverse proxy if you own the service.';
      } else if (xfo.includes('SAMEORIGIN')) {
        isEmbeddable = false;
        reason = `Blocked by X-Frame-Options: ${xFrameOptions}. The site only permits embedding on the same domain.`;
        verdict = 'Blocked by X-Frame-Options: SAMEORIGIN';
        recommendation = 'Major sites like Google and GitHub use this for clickjacking security. Use their official embed widgets, oEmbed, or link preview cards.';
      }
    }

    if (cspFrameAncestors) {
      const fa = cspFrameAncestors.toLowerCase();
      if (fa.includes("'none'")) {
        isEmbeddable = false;
        reason = `Blocked by CSP: frame-ancestors 'none'. Modern browsers will block rendering in any iframe.`;
        verdict = "Blocked by CSP: frame-ancestors 'none'";
        recommendation = 'Framing is prohibited by Content Security Policy. Consider link preview cards or official APIs.';
      } else if (fa.includes("'self'") && !fa.includes('*')) {
        isEmbeddable = false;
        reason = `Blocked by CSP: frame-ancestors ${cspFrameAncestors}. The site only allows framing by itself or specified domains.`;
        verdict = `Blocked by CSP: frame-ancestors ${cspFrameAncestors}`;
        recommendation = 'Unless your domain is explicitly listed in their frame-ancestors directive, embedding will be rejected by the browser.';
      }
    }

    // Check if it is youtube watch page vs embed page
    if (parsedUrl.hostname.includes('youtube.com') && parsedUrl.pathname.includes('/watch')) {
      isEmbeddable = false;
      const v = parsedUrl.searchParams.get('v');
      reason = 'Standard YouTube watch pages block iframes with SAMEORIGIN.';
      verdict = 'YouTube Watch Page (Embed via /embed/ endpoint)';
      recommendation = v
        ? `Change your URL to: https://www.youtube.com/embed/${v}`
        : 'Use the official https://www.youtube.com/embed/{VIDEO_ID} endpoint.';
    }

    return NextResponse.json({
      url: parsedUrl.toString(),
      finalUrl,
      statusCode: response.status,
      contentType,
      isEmbeddable,
      verdict,
      reason,
      recommendation,
      headers: {
        'x-frame-options': xFrameOptions,
        'content-security-policy': csp ? (csp.length > 200 ? csp.slice(0, 200) + '...' : csp) : null,
        'csp-frame-ancestors': cspFrameAncestors,
        'access-control-allow-origin': cors,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to reach URL';
    return NextResponse.json({
      url: parsedUrl.toString(),
      isEmbeddable: false,
      verdict: 'Network / Connection Error',
      reason: `Could not connect to ${parsedUrl.hostname}: ${message}. The server may be down, blocking automated requests, or has invalid SSL certificates.`,
      recommendation: 'Check the URL spelling or test with another known URL.',
      headers: {},
    }, { status: 200 });
  }
}
