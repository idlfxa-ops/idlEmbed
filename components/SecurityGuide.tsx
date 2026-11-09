'use client';

import { ShieldAlert, ShieldCheck, Lock, AlertTriangle, Key, HelpCircle } from 'lucide-react';

export default function SecurityGuide() {
  return (
    <section id="security" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800">
      <div className="mb-8">
        <div className="text-xs font-mono text-indigo-400 mb-1">
          <span>SECURITY &amp; COMPLIANCE BLUEPRINT</span>
          <span aria-hidden="true">·</span>
          <span>HTTP HEADERS &amp; SANDBOX ATTRIBUTES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Security, Headers &amp; Clickjacking Protection
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Why do some websites refuse to appear in an iframe, and how do you protect your own site when embedding untrusted content? Here is everything you need to know.
        </p>
      </div>

      {/* 2-column overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Why sites block iframes */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold mb-3">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Why Websites Block Being Embedded (Clickjacking)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In a <strong>Clickjacking attack</strong>, a malicious website loads a target site (like your bank, email, or admin portal) inside a transparent 0% opacity iframe, and positions it directly under innocent-looking buttons like &quot;Click to Claim Free Prize&quot;. When the user clicks the prize, they unwittingly click &quot;Transfer Funds&quot; or &quot;Delete Account&quot;.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
            To prevent this, high-value sites (Google, GitHub, Facebook, Banks) send security headers forbidding other domains from loading them in frames.
          </p>
        </div>

        {/* How to protect your own site */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-3">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>How to Protect Your Site with the `sandbox` Attribute</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            When you embed an external site using an iframe, that third-party code could potentially run annoying scripts, redirect your parent window, or access local storage.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
            By applying the HTML5 <code className="text-indigo-300 font-mono">sandbox</code> attribute, you place the embedded frame in maximum isolation, selectively granting only necessary capabilities.
          </p>
        </div>
      </div>

      {/* Security Headers Breakdown Table */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 mb-10">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-indigo-400" />
          <span>HTTP Framing Headers Reference</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Header Directive</th>
                <th className="py-2.5 px-3">Standard</th>
                <th className="py-2.5 px-3">Meaning / Effect</th>
                <th className="py-2.5 px-3">Allowed In Iframe?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-3 font-mono text-indigo-300 font-semibold">
                  X-Frame-Options: DENY
                </td>
                <td className="py-3 px-3">Legacy (RFC 7034)</td>
                <td className="py-3 px-3">The page cannot be displayed in a frame, regardless of who is framing it.</td>
                <td className="py-3 px-3 text-rose-400 font-semibold">Never</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-indigo-300 font-semibold">
                  X-Frame-Options: SAMEORIGIN
                </td>
                <td className="py-3 px-3">Legacy (RFC 7034)</td>
                <td className="py-3 px-3">The page can only be framed by pages sharing the exact same origin (protocol, domain, port).</td>
                <td className="py-3 px-3 text-amber-400 font-semibold">Same domain only</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-indigo-300 font-semibold">
                  CSP: frame-ancestors &apos;none&apos;
                </td>
                <td className="py-3 px-3">Modern (W3C CSP Level 2/3)</td>
                <td className="py-3 px-3">Modern replacement for DENY. Browsers completely block rendering in any iframe.</td>
                <td className="py-3 px-3 text-rose-400 font-semibold">Never</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-indigo-300 font-semibold">
                  CSP: frame-ancestors &apos;self&apos; https://partner.com
                </td>
                <td className="py-3 px-3">Modern (W3C CSP Level 2/3)</td>
                <td className="py-3 px-3">The site permits itself and the explicitly whitelisted domains to frame it.</td>
                <td className="py-3 px-3 text-emerald-400 font-semibold">Whitelisted domains only</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-indigo-300 font-semibold">
                  (No framing headers present)
                </td>
                <td className="py-3 px-3">Default Web Standard</td>
                <td className="py-3 px-3">Framing is permitted by default across the open web (e.g. Wikipedia, OpenStreetMap).</td>
                <td className="py-3 px-3 text-emerald-400 font-semibold">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sandbox flags cheat sheet */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Key className="w-4 h-4 text-indigo-400" />
          <span>Iframe `sandbox` Attribute Flags Explained</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-mono text-xs text-indigo-300 font-semibold mb-1">
              allow-scripts
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allows the embedded document to run JavaScript. Without this, buttons with JS handlers, animations, and interactivity will not execute.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-mono text-xs text-indigo-300 font-semibold mb-1">
              allow-same-origin
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allows the document to maintain its origin (e.g. access its own cookies, localStorage). Without this, it is treated as a forced unique origin.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-mono text-xs text-indigo-300 font-semibold mb-1">
              allow-forms
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allows submitting forms inside the iframe. Essential if the embedded site has search bars, login fields, or input questionnaires.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-mono text-xs text-indigo-300 font-semibold mb-1">
              allow-popups
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allows the embedded page to open new browser tabs or windows via <code className="text-slate-300">window.open</code> or links with <code className="text-slate-300">target=&quot;_blank&quot;</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-mono text-xs text-rose-300 font-semibold mb-1">
              allow-top-navigation (Careful!)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allows the embedded iframe to redirect <em>your whole parent window</em> to another URL. Only enable if you fully trust the external site!
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-mono text-xs text-indigo-300 font-semibold mb-1">
              allow-downloads
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allows the embedded webpage to initiate file downloads upon user click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
