import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EmbedTester from '@/components/EmbedTester';
import IntegrationMethods from '@/components/IntegrationMethods';
import DecisionWizard from '@/components/DecisionWizard';
import SecurityGuide from '@/components/SecurityGuide';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <EmbedTester />
        <IntegrationMethods />
        <DecisionWizard />
        <SecurityGuide />
      </main>
      <Footer />
    </div>
  );
}
