import React from "react";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import AboutSection from "./Components/AboutSection";
import ContactForm from "./Components/ContactForm";
import ProjectsSection from "./Components/ProjectsSection";
import ServicesSection from "./Components/ServicesSection";
import SkillsSection from "./Components/SkillsSection";
import ProjectIdeaSection from "./Components/ProjectIdeaSection";
import Footer from "./Components/Footer";

const App: React.FC = () => {
  return (
    <div className="App bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Adding smooth scrolling */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>

      {/* Header */}
      <Header />

      {/* Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <ProjectIdeaSection />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
