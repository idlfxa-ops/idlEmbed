'use client';

import { ExternalLink, Layers, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 pb-16 px-6 border-b border-slate-800 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-3 tracking-wide">
            <span>ARCHITECTURAL GUIDE & PLAYGROUND</span>
            <span aria-hidden="true">·</span>
            <span>WEB STANDARDS</span>
            <span aria-hidden="true">·</span>
            <span>NEXT.JS & HTML5</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 text-balance">
            How to Add Another Website Into Your Website
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
            When you want to display or integrate content from an external website, there is no single one-size-fits-all solution. Depending on whether you want an interactive view, a video player, a link preview card, or seamless subpath routing, you have 5 distinct techniques.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('sandbox')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Test Target URL in Live Sandbox</span>
            </button>
            <button
              onClick={() => scrollTo('wizard')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Which Method Should I Use?</span>
            </button>
          </div>
        </div>

        {/* Quick summary strip of the 5 methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-12 pt-8 border-t border-slate-800/80">
          <div
            onClick={() => scrollTo('methods')}
            className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="text-xs font-mono text-indigo-400 mb-1">01. IFRAME EMBED</div>
            <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
              Inline Frame
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Renders full external page in a sandbox window. Blocked by some sites.
            </div>
          </div>

          <div
            onClick={() => scrollTo('methods')}
            className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="text-xs font-mono text-indigo-400 mb-1">02. OFFICIAL WIDGETS</div>
            <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
              oEmbed & APIs
            </div>
            <div className="text-xs text-slate-400 mt-1">
              YouTube, Maps, Spotify, Calendly provide dedicated embed URLs.
            </div>
          </div>

          <div
            onClick={() => scrollTo('methods')}
            className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="text-xs font-mono text-indigo-400 mb-1">03. RICH LINK CARDS</div>
            <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
              OpenGraph Preview
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Notion/Twitter style card with title, description, image, and link.
            </div>
          </div>

          <div
            onClick={() => scrollTo('methods')}
            className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="text-xs font-mono text-indigo-400 mb-1">04. REVERSE PROXY</div>
            <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
              Subpath Rewrites
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Serve another site under yoursite.com/blog via server rewrites.
            </div>
          </div>

          <div
            onClick={() => scrollTo('methods')}
            className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="text-xs font-mono text-indigo-400 mb-1">05. HEADLESS API</div>
            <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
              JSON Data Fetching
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Fetch raw data via REST/GraphQL and render with your own custom UI.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
