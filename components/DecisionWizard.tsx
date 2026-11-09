'use client';

import { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Code2,
  Tv,
  Share2,
  Server,
  Layers,
} from 'lucide-react';

export default function DecisionWizard() {
  const [contentType, setContentType] = useState<string>('video');
  const [ownership, setOwnership] = useState<string>('third_party');
  const [allowsIframe, setAllowsIframe] = useState<string>('not_sure');

  // Compute recommendation
  let recommendation = {
    title: 'Method 02: Official Embed Widget or oEmbed',
    icon: Tv,
    badge: 'Best for Media & Services',
    why: 'Platforms like YouTube, Google Maps, Spotify, and Calendly have official embed endpoints that bypass standard page restrictions.',
    steps: [
      'Locate the official embed code or API documentation for the provider.',
      'For YouTube: Replace /watch?v=ID with https://www.youtube.com/embed/ID.',
      'For Google Maps: Use the Maps Embed API or an exported share iframe.',
      'Paste the iframe with allow="accelerometer; autoplay; encrypted-media" into your layout.',
    ],
    targetTab: 'widgets',
  };

  if (contentType === 'video') {
    recommendation = {
      title: 'Method 02: Official Embed Endpoints & Player SDKs',
      icon: Tv,
      badge: 'Recommended for Video, Audio & Maps',
      why: 'Standard video and audio sites block their regular watch pages to protect revenue and sessions, but provide embed URLs tailored for smooth playback.',
      steps: [
        'Do not paste the raw browser URL (e.g., youtube.com/watch?v=...).',
        'Use the designated embed endpoint (e.g., youtube.com/embed/...).',
        'Include proper allow attributes (fullscreen, autoplay).',
      ],
      targetTab: 'widgets',
    };
  } else if (contentType === 'blog_docs') {
    if (ownership === 'own') {
      recommendation = {
        title: 'Method 04: Reverse Proxy & Subpath Rewrites (Next.js Rewrites)',
        icon: Server,
        badge: 'Recommended for Subdomains & Micro-sites',
        why: 'Mounting your Ghost, WordPress, or GitBook site under yoursite.com/blog keeps 100% of SEO equity on your main domain and eliminates all CORS and iframe barriers.',
        steps: [
          'Open next.config.ts in your project.',
          'Add an async rewrites() block mapping /blog/:path* to your external blog host.',
          'Deploy the changes — visitors view the external blog while staying on your domain.',
        ],
        targetTab: 'proxy',
      };
    } else {
      recommendation = {
        title: 'Method 03: Rich Link Preview Cards (OpenGraph)',
        icon: Share2,
        badge: 'Recommended for Third-Party Blogs & Articles',
        why: 'Third-party blogs and articles often block iframes and have cookie banners that break iframe UX. Rich preview cards give users an enticing teaser and link directly.',
        steps: [
          'Extract og:title, og:image, and og:description via your backend API.',
          'Render a clickable Notion/Twitter-style card with a clean thumbnail.',
          'Open the destination article in a new tab with target="_blank" rel="noopener noreferrer".',
        ],
        targetTab: 'opengraph',
      };
    }
  } else if (contentType === 'data_custom') {
    recommendation = {
      title: 'Method 05: Headless API Integration (REST / GraphQL)',
      icon: Layers,
      badge: 'Recommended for Custom UI & Native Styling',
      why: 'Fetching raw JSON data lets you design a completely seamless, branded user experience without dealing with third-party headers, footers, or ads.',
      steps: [
        'Check if the target website has a public REST API, GraphQL API, or RSS feed.',
        'Fetch the data on the server side using Next.js Server Components or API routes.',
        'Render the items using your own Tailwind CSS components.',
      ],
      targetTab: 'api',
    };
  } else if (contentType === 'preview_only') {
    recommendation = {
      title: 'Method 03: Rich OpenGraph Preview Cards',
      icon: Share2,
      badge: 'Recommended for Link Bookmarks & Social Previews',
      why: 'Card embeds are lightweight, mobile-friendly, load instantly, and never fail due to X-Frame-Options or CSP headers.',
      steps: [
        'Use the /api/og-preview endpoint to fetch meta tags.',
        'Display the website favicon, title, description, and thumbnail image.',
        'Provide a clean external link with noopener noreferrer.',
      ],
      targetTab: 'opengraph',
    };
  } else if (contentType === 'full_app') {
    if (allowsIframe === 'blocked') {
      recommendation = {
        title: 'Method 03 (Cards) or Method 04 (Reverse Proxy if Owned)',
        icon: Server,
        badge: 'Iframe is Blocked by Target Server',
        why: 'Because the target website sends X-Frame-Options: SAMEORIGIN or CSP frame-ancestors, an iframe will render a blank "refused to connect" error.',
        steps: [
          'If you own the app: Set up a Next.js rewrite or update its CSP header to allow your domain.',
          'If it is third-party: Use an OpenGraph link card with an "Open App" button.',
        ],
        targetTab: 'proxy',
      };
    } else {
      recommendation = {
        title: 'Method 01: Standard HTML <iframe> with Sandbox',
        icon: Code2,
        badge: 'Recommended for Interactive Web Tools',
        why: 'When the target site allows embedding, an <iframe> is the fastest way to drop an interactive calculator, tool, or portal directly into your page.',
        steps: [
          'Always add a descriptive title attribute for screen readers and accessibility.',
          'Include sandbox="allow-scripts allow-same-origin allow-forms" to protect your site.',
          'Set loading="lazy" so off-screen iframes don\'t slow down initial page speed.',
        ],
        targetTab: 'iframe',
      };
    }
  }

  const handleReset = () => {
    setContentType('video');
    setOwnership('third_party');
    setAllowsIframe('not_sure');
  };

  const jumpToTab = (tabId: string) => {
    const el = document.getElementById('methods');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const IconComponent = recommendation.icon;

  return (
    <section id="wizard" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800">
      <div className="mb-8">
        <div className="text-xs font-mono text-indigo-400 mb-1">
          <span>INTERACTIVE DECISION ENGINE</span>
          <span aria-hidden="true">·</span>
          <span>WHICH ARCHITECTURE FITS YOUR USE CASE?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Integration Method Selector
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Answer 3 quick questions about what you want to add, and get an immediate architecture recommendation with rationale and next steps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Questions column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question 1 */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <label className="block text-sm font-semibold text-white mb-3">
              1. What type of content from the other website do you want to show?
            </label>
            <div className="space-y-2">
              {[
                { id: 'video', label: 'Media player (YouTube video, Google Maps, Spotify song, Calendly)' },
                { id: 'full_app', label: 'Full interactive web application, calculator, or internal tool' },
                { id: 'blog_docs', label: 'Entire blog, documentation site, or knowledge base' },
                { id: 'data_custom', label: 'Raw data / articles, styled with my own custom website design' },
                { id: 'preview_only', label: 'Just an article link or website bookmark preview card' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                    contentType === opt.id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white font-medium'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="contentType"
                    checked={contentType === opt.id}
                    onChange={() => setContentType(opt.id)}
                    className="text-indigo-600 focus:ring-0"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <label className="block text-sm font-semibold text-white mb-3">
              2. Do you own or manage the other website?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'own', label: 'Yes, I control both sites (I can edit code, headers, or DNS)' },
                { id: 'third_party', label: 'No, it is a third-party site owned by someone else' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                    ownership === opt.id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white font-medium'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="ownership"
                    checked={ownership === opt.id}
                    onChange={() => setOwnership(opt.id)}
                    className="text-indigo-600 focus:ring-0"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <label className="block text-sm font-semibold text-white mb-3">
              3. Does the other site allow iframe embedding?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'allowed', label: 'Yes, it allows framing' },
                { id: 'blocked', label: 'No, it blocks iframes' },
                { id: 'not_sure', label: 'Not sure (check with sandbox)' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                    allowsIframe === opt.id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white font-medium'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="allowsIframe"
                    checked={allowsIframe === opt.id}
                    onChange={() => setAllowsIframe(opt.id)}
                    className="text-indigo-600 focus:ring-0"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Recommendation Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 p-6 rounded-xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/40 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                {recommendation.badge}
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                title="Reset Answers"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                {recommendation.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {recommendation.why}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-800 mb-6">
              <div className="text-xs font-mono text-indigo-400 font-semibold uppercase">
                Recommended Implementation Steps:
              </div>
              {recommendation.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => jumpToTab(recommendation.targetTab)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <span>View Code &amp; Documentation in Playbook</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
