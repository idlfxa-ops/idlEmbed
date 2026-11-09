'use client';

import { useState } from 'react';
import {
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  RotateCw,
  Shield,
  Info,
} from 'lucide-react';

interface DiagnosticResult {
  url: string;
  finalUrl?: string;
  statusCode?: number;
  isEmbeddable: boolean;
  verdict: string;
  reason: string;
  recommendation: string;
  headers?: {
    'x-frame-options'?: string | null;
    'content-security-policy'?: string | null;
    'csp-frame-ancestors'?: string | null;
    'access-control-allow-origin'?: string | null;
  };
}

const PRESETS = [
  {
    name: 'Wikipedia Article',
    url: 'https://en.wikipedia.org/wiki/World_Wide_Web',
    type: 'allowed',
    note: 'Embeddable: Wikipedia does not send X-Frame-Options DENY.',
  },
  {
    name: 'OpenStreetMap',
    url: 'https://www.openstreetmap.org/export/embed.html?bbox=-0.15%2C51.50%2C-0.10%2C51.52&layer=mapnik',
    type: 'allowed',
    note: 'Embeddable: Official OpenStreetMap embed view.',
  },
  {
    name: 'YouTube Embed Endpoint',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'allowed',
    note: 'Embeddable: Official YouTube /embed/ endpoint.',
  },
  {
    name: 'CodePen Demo',
    url: 'https://codepen.io/chriscoyier/embed/gOBegoX',
    type: 'allowed',
    note: 'Embeddable: CodePen dedicated embed player.',
  },
  {
    name: 'Google.com (Blocked)',
    url: 'https://www.google.com',
    type: 'blocked',
    note: 'Blocked: Google sends X-Frame-Options: SAMEORIGIN.',
  },
  {
    name: 'GitHub.com (Blocked)',
    url: 'https://github.com',
    type: 'blocked',
    note: 'Blocked: GitHub blocks framing with X-Frame-Options: DENY.',
  },
  {
    name: 'YouTube Watch (Blocked)',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'blocked',
    note: 'Blocked: Regular watch pages block iframes (use /embed/ instead).',
  },
];

export default function EmbedTester() {
  const [urlInput, setUrlInput] = useState('https://en.wikipedia.org/wiki/World_Wide_Web');
  const [activeUrl, setActiveUrl] = useState('https://en.wikipedia.org/wiki/World_Wide_Web');
  const [isLoading, setIsLoading] = useState(false);
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>({
    url: 'https://en.wikipedia.org/wiki/World_Wide_Web',
    statusCode: 200,
    isEmbeddable: true,
    verdict: 'Direct <iframe> embedding is allowed!',
    reason: 'Site does not restrict framing via HTTP headers (Wikipedia allows open embedding).',
    recommendation: 'You can use a standard <iframe src="..."> tag safely.',
    headers: {
      'x-frame-options': null,
      'content-security-policy': null,
    },
  });
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState(1);

  // Sandbox options
  const [sandboxOptions, setSandboxOptions] = useState({
    scripts: true,
    sameOrigin: true,
    forms: true,
    popups: true,
  });

  const getSandboxString = () => {
    const list: string[] = [];
    if (sandboxOptions.scripts) list.push('allow-scripts');
    if (sandboxOptions.sameOrigin) list.push('allow-same-origin');
    if (sandboxOptions.forms) list.push('allow-forms');
    if (sandboxOptions.popups) list.push('allow-popups');
    return list.join(' ');
  };

  const checkEmbeddability = async (target: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/check-embed?url=${encodeURIComponent(target)}`);
      const data = await res.json();
      setDiagnostic(data);
      setActiveUrl(target);
      setIframeKey((k) => k + 1);
    } catch {
      setDiagnostic({
        url: target,
        isEmbeddable: false,
        verdict: 'Check Failed',
        reason: 'Unable to communicate with verification API.',
        recommendation: 'Verify network connection or test another URL.',
      });
      setActiveUrl(target);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (presetUrl: string) => {
    setUrlInput(presetUrl);
    checkEmbeddability(presetUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    checkEmbeddability(urlInput.trim());
  };

  const copyCode = (type: 'html' | 'react') => {
    const sandboxAttr = getSandboxString();
    let snippet = '';
    if (type === 'html') {
      snippet = `<!-- Responsive Iframe Container -->
<div style="position: relative; width: 100%; height: 500px; overflow: hidden; border-radius: 8px; border: 1px solid #e2e8f0;">
  <iframe
    src="${activeUrl}"
    title="Embedded Content"
    width="100%"
    height="100%"
    style="border: none;"
    loading="lazy"
    referrerpolicy="no-referrer"
    sandbox="${sandboxAttr}"
  ></iframe>
</div>`;
    } else {
      snippet = `// React / Next.js Component
export function EmbeddedWebsite() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg border border-slate-700">
      <iframe
        src="${activeUrl}"
        title="Embedded Content"
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="${sandboxAttr}"
      />
    </div>
  );
}`;
    }

    navigator.clipboard.writeText(snippet);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section id="sandbox" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>METHOD 01 PLAYGROUND</span>
            <span aria-hidden="true">·</span>
            <span>LIVE HTTP HEADER INSPECTOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Live Iframe Embed Sandbox & Security Scanner
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Enter any website URL to see whether it permits `&lt;iframe&gt;` embedding, inspect its `X-Frame-Options` and `Content-Security-Policy` headers, and preview the live viewport.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => copyCode('react')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedType === 'react' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>Copy React Code</span>
          </button>
          <button
            onClick={() => copyCode('html')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedType === 'html' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>Copy HTML Code</span>
          </button>
        </div>
      </div>

      {/* URL Input Form */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 text-white border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <RotateCw className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>Analyze & Preview</span>
          </button>
        </form>

        {/* Quick Presets */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Presets:</span>
          {PRESETS.map((preset) => {
            const isCurrent = activeUrl === preset.url;
            return (
              <button
                key={preset.name}
                onClick={() => handlePresetClick(preset.url)}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-indigo-950 border border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
                title={preset.note}
              >
                {preset.type === 'allowed' ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <XCircle className="w-3 h-3 text-rose-400" />
                )}
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diagnostic Alert Box */}
      {diagnostic && (
        <div
          className={`p-4 rounded-xl border mb-6 transition-all ${
            diagnostic.isEmbeddable
              ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-100'
              : 'bg-rose-950/30 border-rose-800/60 text-rose-100'
          }`}
        >
          <div className="flex items-start gap-3">
            {diagnostic.isEmbeddable ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-sm">
              <div className="flex flex-wrap items-center gap-2 font-semibold">
                <span>{diagnostic.verdict}</span>
                {diagnostic.statusCode && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/10">
                    HTTP {diagnostic.statusCode}
                  </span>
                )}
              </div>
              <p className="mt-1 text-slate-300 leading-relaxed text-xs sm:text-sm">
                {diagnostic.reason}
              </p>

              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">Recommended Action: </span>
                  {diagnostic.recommendation}
                </div>
                {diagnostic.headers?.['x-frame-options'] && (
                  <div className="text-xs font-mono text-slate-400 bg-black/40 px-2 py-1 rounded">
                    X-Frame-Options: {diagnostic.headers['x-frame-options']}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Viewport & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-900 rounded-t-xl border border-b-0 border-slate-800">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`px-3 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewport === 'desktop'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`px-3 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewport === 'tablet'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet (768px)</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`px-3 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewport === 'mobile'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (375px)</span>
          </button>
        </div>

        {/* Sandbox toggles */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="text-slate-500 font-mono flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            sandbox:
          </span>
          <label className="flex items-center gap-1 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={sandboxOptions.scripts}
              onChange={(e) =>
                setSandboxOptions((prev) => ({ ...prev, scripts: e.target.checked }))
              }
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>allow-scripts</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={sandboxOptions.sameOrigin}
              onChange={(e) =>
                setSandboxOptions((prev) => ({ ...prev, sameOrigin: e.target.checked }))
              }
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>allow-same-origin</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={sandboxOptions.forms}
              onChange={(e) =>
                setSandboxOptions((prev) => ({ ...prev, forms: e.target.checked }))
              }
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>allow-forms</span>
          </label>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIframeKey((k) => k + 1)}
            title="Reload Iframe"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new window"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Iframe Viewport Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-b-xl overflow-hidden flex justify-center p-4 min-h-[520px] relative">
        <div
          className={`transition-all duration-300 rounded-lg overflow-hidden border border-slate-800 bg-white relative flex flex-col ${
            viewport === 'desktop'
              ? 'w-full h-[520px]'
              : viewport === 'tablet'
              ? 'w-[768px] h-[520px]'
              : 'w-[375px] h-[520px]'
          }`}
        >
          {/* Browser-like window header inside */}
          <div className="h-7 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400 select-none shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[11px] font-mono truncate max-w-[240px] text-slate-400">
              {activeUrl}
            </div>
            <div className="text-[10px] text-slate-500 uppercase">
              {viewport}
            </div>
          </div>

          <div className="relative flex-1 bg-white">
            {/* The Live Iframe */}
            <iframe
              key={iframeKey}
              src={activeUrl}
              title="Embedded website preview"
              className="w-full h-full border-0"
              sandbox={getSandboxString()}
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {/* If blocked by security header, show explanatory fallback banner overlay at bottom */}
            {diagnostic && !diagnostic.isEmbeddable && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Website Refused to Be Embedded in an Iframe
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
                  {diagnostic.reason}
                </p>

                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-left max-w-lg w-full text-xs text-slate-300 mb-6">
                  <div className="font-semibold text-indigo-400 mb-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    How to solve this for this website:
                  </div>
                  <ul className="space-y-2 list-disc list-inside text-slate-300">
                    <li>
                      <span className="font-medium text-white">For YouTube / Video:</span> Use the official <code className="text-indigo-300 font-mono">youtube.com/embed/VIDEO_ID</code> endpoint instead of the watch page.
                    </li>
                    <li>
                      <span className="font-medium text-white">For Google / GitHub / Social:</span> Use an <span className="text-indigo-300 font-medium">OpenGraph Preview Card</span> (Method 3) or their official oEmbed API.
                    </li>
                    <li>
                      <span className="font-medium text-white">If you own both sites:</span> Modify the server configuration of the target site to allow your domain: <code className="text-indigo-300 font-mono">Content-Security-Policy: frame-ancestors &apos;self&apos; https://yourdomain.com</code>.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={activeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Website Directly
                  </a>
                  <button
                    onClick={() => {
                      const el = document.getElementById('methods');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs font-medium transition-colors"
                  >
                    Explore Alternative Methods
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
