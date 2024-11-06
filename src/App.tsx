import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import ContactForm from "./Components/ContactForm";
import ProjectsSection from "./Components/ProjectsSection";
import ServicesSection from "./Components/ServicesSection";
import SkillsSection from "./Components/SkillsSection";
import ProjectIdeaSection from "./Components/ProjectIdeaSection";
import Footer from "./Components/Footer";
import EducationExperience from "./Components/AboutSection";
import CertificationsSection from "./Components/Cretificates";

const SectionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="section-wrapper"
    >
      {children}
    </motion.div>
  );
};

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
        <SectionWrapper>
          <EducationExperience />
        </SectionWrapper>
        <SectionWrapper>
          <SkillsSection />
        </SectionWrapper>
        <SectionWrapper>
          <ServicesSection />
        </SectionWrapper>
        <SectionWrapper>
          <ProjectsSection />
        </SectionWrapper>
        <SectionWrapper>
          <CertificationsSection />
        </SectionWrapper>
        <SectionWrapper>
          <ProjectIdeaSection />
        </SectionWrapper>
        <SectionWrapper>
          <ContactForm />
        </SectionWrapper>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
