
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import our refactored components
import AboutHero from '@/components/about/AboutHero';
import CompanyHistory from '@/components/about/CompanyHistory';
import TeamSection from '@/components/about/TeamSection';
import PartnersSection from '@/components/about/PartnersSection';
import ValuesSection from '@/components/about/ValuesSection';
import CallToActionSection from '@/components/about/CallToActionSection';
import ScrollReveal from '@/components/about/ScrollReveal';

const About = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Initialize the scroll reveal functionality */}
      <ScrollReveal />
      
      {/* Page sections */}
      <AboutHero />
      <CompanyHistory />
      <TeamSection />
      <PartnersSection />
      <ValuesSection />
      <CallToActionSection />
      
      <Footer />
    </div>
  );
};

export default About;
