'use client';

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-indigo-400 transition-colors"
        >
          WebEmbed<span className="text-indigo-500 font-mono text-sm ml-1">Studio</span>
        </a>

        {/* Zone 2: 4–5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollTo('sandbox')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Live Sandbox
          </button>
          <button
            onClick={() => scrollTo('methods')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            5 Integration Methods
          </button>
          <button
            onClick={() => scrollTo('wizard')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Decision Wizard
          </button>
          <button
            onClick={() => scrollTo('security')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Security & Headers
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => scrollTo('sandbox')}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-indigo-500/20 cursor-pointer"
          >
            Test Any URL
          </button>
        </div>
      </div>
    </header>
  );
}
