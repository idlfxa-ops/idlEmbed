import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WebEmbed Studio - Website Embedding & Integration Lab',
  description: 'Interactive developer studio and playground for embedding other websites into your site using iframes, official embed widgets, OpenGraph cards, and reverse proxies.',
  openGraph: {
    title: 'WebEmbed Studio - Website Embedding & Integration Lab',
    description: 'Interactive developer studio and playground for embedding other websites into your site using iframes, official embed widgets, OpenGraph cards, and reverse proxies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebEmbed Studio - Website Embedding & Integration Lab',
    description: 'Interactive developer studio and playground for embedding other websites into your site using iframes, official embed widgets, OpenGraph cards, and reverse proxies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-indigo-500 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
