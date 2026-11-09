'use client';

import { useState } from 'react';
import {
  Code2,
  Tv,
  Share2,
  Server,
  Layers,
  Copy,
  Check,
  ExternalLink,
  Info,
  Youtube,
  MapPin,
  Music,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function IntegrationMethods() {
  const [activeTab, setActiveTab] = useState<'iframe' | 'widgets' | 'opengraph' | 'proxy' | 'api'>('iframe');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Method 2 (Widget) state
  const [selectedWidget, setSelectedWidget] = useState<'youtube' | 'maps' | 'spotify' | 'calendly'>('youtube');
  const [youtubeId, setYoutubeId] = useState('dQw4w9WgXcQ');
  const [youtubeAutoplay, setYoutubeAutoplay] = useState(false);
  const [youtubeControls, setYoutubeControls] = useState(true);

  const [mapsLocation, setMapsLocation] = useState('Eiffel Tower, Paris');
  const [spotifyTrackId, setSpotifyTrackId] = useState('4cOdK2wGLETKBW3PvgPWqT');
  const [calendlyUser, setCalendlyUser] = useState('acme-support');

  // Method 3 (OpenGraph Preview) state
  const [ogUrlInput, setOgUrlInput] = useState('https://github.com');
  const [ogData, setOgData] = useState<{
    url: string;
    title: string;
    description: string;
    image: string | null;
    siteName: string;
    favicon: string;
  }>({
    url: 'https://github.com',
    title: 'GitHub: Let’s build from here',
    description: 'GitHub is where over 100 million developers shape the future of software, together.',
    image: 'https://github.githubassets.com/images/modules/site/social-cards/campaign-social.png',
    siteName: 'GitHub',
    favicon: 'https://www.google.com/s2/favicons?domain=github.com&sz=128',
  });
  const [ogLoading, setOgLoading] = useState(false);

  // Method 4 (Proxy) state
  const [proxySubpath, setProxySubpath] = useState('blog');
  const [proxyTarget, setProxyTarget] = useState('https://myblog.ghost.io');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fetchOgData = async (target: string) => {
    setOgLoading(true);
    try {
      const res = await fetch(`/api/og-preview?url=${encodeURIComponent(target)}`);
      const data = await res.json();
      setOgData(data);
    } catch {
      // Fallback
    } finally {
      setOgLoading(false);
    }
  };

  return (
    <section id="methods" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800">
      <div className="mb-8">
        <div className="text-xs font-mono text-indigo-400 mb-1">
          <span>ARCHITECTURAL PLAYBOOK</span>
          <span aria-hidden="true">·</span>
          <span>5 TECHNICAL INTEGRATION TECHNIQUES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          The 5 Ways to Add Another Website Into Your Website
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Depending on your relationship with the third-party website, security constraints, and UI goals, choose the right architectural approach.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-1 p-1.5 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto mb-8">
        <button
          onClick={() => setActiveTab('iframe')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
            activeTab === 'iframe'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>1. Iframe Embed</span>
        </button>

        <button
          onClick={() => setActiveTab('widgets')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
            activeTab === 'widgets'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>2. Official Embeds & Widgets</span>
        </button>

        <button
          onClick={() => setActiveTab('opengraph')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
            activeTab === 'opengraph'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>3. Rich Link Preview Card</span>
        </button>

        <button
          onClick={() => setActiveTab('proxy')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
            activeTab === 'proxy'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>4. Reverse Proxy / Rewrites</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
            activeTab === 'api'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>5. Headless API Integration</span>
        </button>
      </div>

      {/* Tab 1: Iframe */}
      {activeTab === 'iframe' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Method 01: Standard HTML &lt;iframe&gt;
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  An <code className="text-indigo-400 font-mono">&lt;iframe&gt;</code> (Inline Frame) creates an isolated nested browsing context inside your webpage. The visitor views and interacts with the target site without navigating away from your URL.
                </p>
              </div>
              <span className="hidden sm:inline-block text-xs font-mono px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Client-Side Sandbox
              </span>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800">
              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/50">
                <div className="text-xs font-semibold text-emerald-400 mb-2">
                  ADVANTAGES
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Zero backend coding: 1 line of HTML code works immediately.</li>
                  <li>Total visual separation: target CSS and JS cannot break your styles.</li>
                  <li>Supports interactive web tools, internal portals, and dashboards.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/50">
                <div className="text-xs font-semibold text-rose-400 mb-2">
                  LIMITATIONS & CAVEATS
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>
                    <strong>X-Frame-Options & CSP:</strong> Many popular websites forbid framing to protect against clickjacking.
                  </li>
                  <li>
                    <strong>No SEO Benefit:</strong> Search engines do not attribute iframe content to your domain.
                  </li>
                  <li>
                    <strong>Mobile Sizing:</strong> Fixed iframe heights can be difficult to make responsive across devices.
                  </li>
                </ul>
              </div>
            </div>

            {/* Code Examples */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">
                  PRODUCTION-GRADE REACT / TAILWIND SNIPPET:
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-md">
  <iframe
    src="https://example.com"
    title="External Embedded Tool"
    className="w-full h-full border-0"
    loading="lazy"
    referrerPolicy="no-referrer"
    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  />
</div>`,
                      'iframe-react'
                    )
                  }
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'iframe-react' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy Snippet</span>
                </button>
              </div>

              <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`<div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-md">
  <iframe
    src="https://example.com"
    title="External Embedded Tool"
    className="w-full h-full border-0"
    loading="lazy"
    referrerPolicy="no-referrer"
    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  />
</div>`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Official Embeds & Widgets */}
      {activeTab === 'widgets' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">
              Method 02: Official Embed Endpoints &amp; Widgets
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Platforms like YouTube, Google Maps, Spotify, and Calendly block framing on their main domain, but provide <strong>dedicated embed URLs</strong> and oEmbed endpoints designed specifically for third-party websites.
            </p>

            {/* Widget Picker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
              <button
                onClick={() => setSelectedWidget('youtube')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  selectedWidget === 'youtube'
                    ? 'bg-indigo-950 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                  <Youtube className="w-4 h-4 text-rose-500" />
                  <span>YouTube</span>
                </div>
                <div className="text-[11px] text-slate-400">Video Player</div>
              </button>

              <button
                onClick={() => setSelectedWidget('maps')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  selectedWidget === 'maps'
                    ? 'bg-indigo-950 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>Google Maps</span>
                </div>
                <div className="text-[11px] text-slate-400">Interactive Map</div>
              </button>

              <button
                onClick={() => setSelectedWidget('spotify')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  selectedWidget === 'spotify'
                    ? 'bg-indigo-950 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                  <Music className="w-4 h-4 text-green-400" />
                  <span>Spotify</span>
                </div>
                <div className="text-[11px] text-slate-400">Track &amp; Playlist</div>
              </button>

              <button
                onClick={() => setSelectedWidget('calendly')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  selectedWidget === 'calendly'
                    ? 'bg-indigo-950 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Calendly</span>
                </div>
                <div className="text-[11px] text-slate-400">Booking Widget</div>
              </button>
            </div>

            {/* Widget Configurator & Preview */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              {selectedWidget === 'youtube' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        YouTube Video ID or Full URL:
                      </label>
                      <input
                        type="text"
                        value={youtubeId}
                        onChange={(e) => {
                          const val = e.target.value;
                          const match = val.match(/(?:v=|\/embed\/|youtu\.be\/)([\w-]{11})/);
                          setYoutubeId(match ? match[1] : val);
                        }}
                        placeholder="e.g. dQw4w9WgXcQ"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                      />
                    </div>
                    <div className="flex flex-col justify-end gap-2 text-xs text-slate-300 pb-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={youtubeAutoplay}
                          onChange={(e) => setYoutubeAutoplay(e.target.checked)}
                          className="rounded text-indigo-600"
                        />
                        <span>Autoplay (muted)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={youtubeControls}
                          onChange={(e) => setYoutubeControls(e.target.checked)}
                          className="rounded text-indigo-600"
                        />
                        <span>Show Player Controls</span>
                      </label>
                    </div>
                  </div>

                  {/* Live Embed Preview */}
                  <div className="aspect-video w-full max-w-xl mx-auto rounded-lg overflow-hidden border border-slate-800 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${
                        youtubeAutoplay ? 1 : 0
                      }&mute=${youtubeAutoplay ? 1 : 0}&controls=${youtubeControls ? 1 : 0}`}
                      title="YouTube video player"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Code snippet */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-slate-400">Copy Embed Code:</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/${youtubeId}?autoplay=${youtubeAutoplay ? 1 : 0}&mute=${youtubeAutoplay ? 1 : 0}&controls=${youtubeControls ? 1 : 0}"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
></iframe>`,
                          'code-yt'
                        )
                      }
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'code-yt' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy Embed Code</span>
                    </button>
                  </div>
                </div>
              )}

              {selectedWidget === 'maps' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Location / Address / Landmark:
                    </label>
                    <input
                      type="text"
                      value={mapsLocation}
                      onChange={(e) => setMapsLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                  </div>

                  <div className="w-full h-64 rounded-lg overflow-hidden border border-slate-800">
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        mapsLocation
                      )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      title="Google Map preview"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-slate-400">Copy Embed Code:</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<iframe
  width="100%"
  height="450"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src="https://maps.google.com/maps?q=${encodeURIComponent(mapsLocation)}&t=&z=14&ie=UTF8&iwloc=&output=embed"
/>`,
                          'code-maps'
                        )
                      }
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'code-maps' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy Maps Code</span>
                    </button>
                  </div>
                </div>
              )}

              {selectedWidget === 'spotify' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Spotify Track or Album ID:
                    </label>
                    <input
                      type="text"
                      value={spotifyTrackId}
                      onChange={(e) => setSpotifyTrackId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                    />
                  </div>

                  <div className="w-full h-40 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-slate-400">Copy Embed Code:</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<iframe
  src="https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator"
  width="100%"
  height="152"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>`,
                          'code-spotify'
                        )
                      }
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'code-spotify' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy Spotify Code</span>
                    </button>
                  </div>
                </div>
              )}

              {selectedWidget === 'calendly' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Calendly Username / Event Path:
                    </label>
                    <input
                      type="text"
                      value={calendlyUser}
                      onChange={(e) => setCalendlyUser(e.target.value)}
                      placeholder="e.g. acme-support/30min"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                    />
                  </div>

                  <div className="p-4 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div className="font-semibold text-white">How Calendly Embed Works:</div>
                    <p>
                      Calendly embeds either as an inline calendar frame or as a floating badge button.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-slate-400">Copy Next.js Snippet:</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `// In your component or page:
import Script from 'next/script';

export default function BookingSection() {
  return (
    <>
      <div 
        className="calendly-inline-widget min-w-[320px] h-[700px]" 
        data-url="https://calendly.com/${calendlyUser}" 
      />
      <Script 
        type="text/javascript" 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload" 
      />
    </>
  );
}`,
                          'code-calendly'
                        )
                      }
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'code-calendly' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy Calendly Next.js Code</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: OpenGraph Preview Cards */}
      {activeTab === 'opengraph' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">
              Method 03: Rich Link Preview Cards (OpenGraph / Notion Style)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              When a website blocks iframes (like GitHub, Twitter, or Google) or you don&apos;t want the heavy overhead of loading an entire third-party page, use a <strong>Rich Link Card</strong>. Your server fetches their <code className="text-indigo-400 font-mono">og:title</code>, <code className="text-indigo-400 font-mono">og:description</code>, and <code className="text-indigo-400 font-mono">og:image</code>, rendering a sleek interactive card.
            </p>

            {/* Live Card Generator Input */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={ogUrlInput}
                onChange={(e) => setOgUrlInput(e.target.value)}
                placeholder="https://github.com or https://nextjs.org"
                className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white font-mono"
              />
              <button
                onClick={() => fetchOgData(ogUrlInput)}
                disabled={ogLoading}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {ogLoading ? <span>Fetching Metadata...</span> : <span>Generate Live Card</span>}
              </button>
            </div>

            {/* Live Rendered Card Preview */}
            <div className="mt-6 p-6 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-slate-500 mb-3">
                LIVE INTERACTIVE CARD PREVIEW:
              </div>

              <a
                href={ogData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block max-w-xl mx-auto rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-700 transition-all overflow-hidden group shadow-lg"
              >
                {ogData.image && (
                  <div className="h-44 w-full overflow-hidden bg-slate-950 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ogData.image}
                      alt={ogData.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ogData.favicon}
                      alt=""
                      className="w-4 h-4 rounded-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-medium text-slate-400">
                      {ogData.siteName || 'External Website'}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500 ml-auto group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {ogData.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {ogData.description}
                  </p>
                </div>
              </a>
            </div>

            {/* Ready-to-use Code */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">
                  REUSABLE REACT COMPONENT SNIPPET:
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `// Reusable OpenGraph Link Card
export function LinkPreviewCard({ url, title, description, image, siteName, favicon }: {
  url: string;
  title: string;
  description: string;
  image?: string;
  siteName: string;
  favicon?: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block max-w-xl rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-700 transition-all overflow-hidden group shadow-md"
    >
      {image && (
        <div className="h-44 w-full overflow-hidden bg-slate-950">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-102 transition-transform" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
          {favicon && <img src={favicon} alt="" className="w-4 h-4 rounded-sm" />}
          <span>{siteName}</span>
        </div>
        <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  );
}`,
                      'og-code'
                    )
                  }
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'og-code' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy React Card Code</span>
                </button>
              </div>

              <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`// Fetched from your /api/og-preview endpoint
<LinkPreviewCard
  url="${ogData.url}"
  title="${ogData.title}"
  description="${ogData.description.replace(/"/g, '\\"')}"
  image="${ogData.image || ''}"
  siteName="${ogData.siteName}"
  favicon="${ogData.favicon}"
/>`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Reverse Proxy & Next.js Rewrites */}
      {activeTab === 'proxy' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">
              Method 04: Reverse Proxy &amp; Subpath Rewrites (next.config.ts)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              What if you want an external website (like a <strong>Ghost blog</strong>, a <strong>WordPress site</strong>, or a <strong>GitBook documentation hub</strong>) to appear directly on your domain, e.g.{' '}
              <code className="text-indigo-300 font-mono">yoursite.com/{proxySubpath}</code>?
              Next.js provides built-in <strong>Rewrites</strong> that act as a reverse proxy!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Subpath (URL on your website):
                </label>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs font-mono text-slate-300">
                  <span className="text-slate-500">yoursite.com/</span>
                  <input
                    type="text"
                    value={proxySubpath}
                    onChange={(e) => setProxySubpath(e.target.value)}
                    className="bg-transparent text-indigo-400 focus:outline-none flex-1 font-mono"
                  />
                  <span className="text-slate-500">/:path*</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  External Destination Website:
                </label>
                <input
                  type="text"
                  value={proxyTarget}
                  onChange={(e) => setProxyTarget(e.target.value)}
                  placeholder="https://myblog.ghost.io"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Generated next.config.ts snippet */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">
                  CONFIG TO ADD IN next.config.ts:
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/${proxySubpath}/:path*',
        destination: '${proxyTarget}/:path*',
      },
    ];
  },
};

export default nextConfig;`,
                      'proxy-code'
                    )
                  }
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'proxy-code' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy next.config.ts</span>
                </button>
              </div>

              <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/${proxySubpath}/:path*',
        destination: '${proxyTarget}/:path*',
      },
    ];
  },
};

export default nextConfig;`}
              </pre>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-indigo-300">Why Developers Love Rewrites:</div>
              <p>
                1. <strong>Massive SEO benefit:</strong> Search engines crawl the external blog/docs as part of your primary domain authority.
              </p>
              <p>
                2. <strong>Bypasses iframe blocks:</strong> Because your server proxies the traffic, `X-Frame-Options` restrictions are avoided.
              </p>
              <p>
                3. <strong>Shared cookies:</strong> Seamless session tracking across your apps.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Headless API Integration */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">
              Method 05: Headless API Integration (REST / GraphQL)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              If you want the <strong>data</strong> or <strong>content</strong> from another website (e.g., articles from WordPress, products from Shopify, or posts from a CMS), but want it to look 100% native to your website&apos;s UI design, fetch its REST or GraphQL API!
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-xs font-semibold text-indigo-400 mb-1">1. FETCH DATA</div>
                <p className="text-xs text-slate-400">
                  Call the target site&apos;s public REST API or headless endpoint on the server side using Next.js Server Components.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-xs font-semibold text-indigo-400 mb-1">2. MAP &amp; TRANSFORM</div>
                <p className="text-xs text-slate-400">
                  Pick only the fields you need (titles, prices, excerpts) without any unwanted ads or styles from the source site.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-xs font-semibold text-indigo-400 mb-1">3. RENDER NATIVELY</div>
                <p className="text-xs text-slate-400">
                  Use your own Tailwind CSS, design tokens, fonts, and responsive layout for a flawless, unified experience.
                </p>
              </div>
            </div>

            {/* Code example */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">
                  NEXT.JS SERVER COMPONENT PATTERN:
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `// app/external-feed/page.tsx
interface ExternalPost {
  id: number;
  title: string;
  excerpt: string;
}

export default async function ExternalFeedPage() {
  // Fetch data directly on the server without exposing API keys or CORS issues
  const res = await fetch('https://api.external-site.com/v1/posts', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  const posts: ExternalPost[] = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post) => (
        <article key={post.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900">
          <h3 className="font-semibold text-white">{post.title}</h3>
          <p className="text-sm text-slate-400 mt-2">{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}`,
                      'api-code'
                    )
                  }
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'api-code' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy Server Component</span>
                </button>
              </div>

              <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`// app/external-feed/page.tsx
export default async function ExternalFeedPage() {
  // Fetch data directly on the server without exposing API keys or CORS issues
  const res = await fetch('https://api.external-site.com/v1/posts', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  const posts = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post) => (
        <article key={post.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900">
          <h3 className="font-semibold text-white">{post.title}</h3>
          <p className="text-sm text-slate-400 mt-2">{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
