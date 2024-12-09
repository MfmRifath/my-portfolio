import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./Components/ThemProvider";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import EducationExperience from "./Components/AboutSection";
import SkillsSection from "./Components/SkillsSection";
import ServicesSection from "./Components/ServicesSection";
import ProjectsSection from "./Components/ProjectsSection";
import CertificationsSection from "./Components/Cretificates";
import ProjectIdeaSection from "./Components/ProjectIdeaSection";
import ContactForm from "./Components/ContactForm";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import { useEffect, useRef, useState } from "react";
import { Certificate } from "crypto";
// Hook for detecting element visibility
const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Section component
const Section = ({
  id,
  animationClass,
  children,
}: {
  id: string;
  animationClass: string;
  children: React.ReactNode;
}) => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-transform duration-700 ease-in-out transform ${
        isVisible ? animationClass : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </section>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  
  return (
    <ThemeProvider>
      <div className="App bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 dark:from-black dark:to-gray-900">
        <style>
          {`
            html {
              scroll-behavior: smooth;
            }
          `}
        </style>

        {!isLoginRoute && <Header />}

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div>
      <div className="space-y-16">
      <Section id="hero" animationClass="opacity-100 translate-y-0">

          <HeroSection/>
        
      </Section>
      <Section id="about" animationClass="opacity-100 translate-y-0">
       
          <EducationExperience/>
       
      </Section>
      <Section id="skills" animationClass="opacity-100 translate-y-0">
       
         <SkillsSection/>
       
      </Section>
      <Section id="services" animationClass="opacity-100 translate-y-0">
      
          <ServicesSection/>
       
      </Section>
      <Section id="projects" animationClass="opacity-100 translate-y-0">
       
          <ProjectsSection/>
        
      </Section>
      <Section id="ideas" animationClass="opacity-100 translate-y-0">
        
        <ProjectIdeaSection/>
        
      </Section>
      
      <Section id="certification" animationClass="opacity-100 translate-y-0">
      
        <CertificationsSection/>
      
      </Section>
      <Section id="contact" animationClass="opacity-100 translate-y-0">
        
        <ContactForm/>
        
      </Section>
    
    </div>
    </div>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {!isLoginRoute && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default App;