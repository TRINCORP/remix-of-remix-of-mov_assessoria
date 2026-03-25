import HeroSection from '@/components/HeroSection';
import ForWhoSection from '@/components/ForWhoSection';
import ProblemsSection from '@/components/ProblemsSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PinnedSection from '@/components/PinnedSection';
import TrustIndicators from '@/components/TrustIndicators';
import ImpactSection from '@/components/ImpactSection';
import ClientsPartnersSection from '@/components/ClientsPartnersSection';
import CreativeShowcase from '@/components/CreativeShowcase';
import VideoHeroBanner from '@/components/VideoHeroBanner';

import { useGSAPNavigation } from '@/hooks/useGSAPNavigation';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  useGSAPNavigation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <ForWhoSection />
        <ProblemsSection />
        <VideoHeroBanner />
        <PinnedSection />
        
        <TrustIndicators />
        <CreativeShowcase />
        <ImpactSection />
        
        <section id="about">
          <AboutSection />
        </section>
        <ClientsPartnersSection theme={theme} />
        <section id="services">
          <ServicesSection />
        </section>
        <section id="cases">
          <TestimonialsSection />
        </section>
        <section id="contact">
          <CTASection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
