export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-sm">WebEmbed Studio</span>
          <span aria-hidden="true">·</span>
          <span>Website Integration Architecture Guide &amp; Sandbox</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition-colors"
          >
            MDN Iframe Docs
          </a>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition-colors"
          >
            X-Frame-Options
          </a>
          <a
            href="https://nextjs.org/docs/app/api-reference/next-config-js/rewrites"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition-colors"
          >
            Next.js Rewrites
          </a>
        </div>
      </div>
    </footer>
  );
}
