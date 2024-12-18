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
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-800 to-black opacity-50 animate-gradient"></div>

      {/* Logo Section */}
      <div className="relative flex flex-col items-center mb-8">
        <div className="relative flex items-center justify-center">
          {/* Outer Spinner */}
          <div className="animate-spin-slow rounded-full h-24 w-24 border-t-4 border-blue-500 border-opacity-75"></div>
          {/* Middle Glow */}
          <div className="absolute rounded-full h-18 w-18 bg-blue-700 opacity-30 blur-lg"></div>
          {/* Logo */}
          <div className="absolute h-100 w-100 bg-black rounded-full shadow-lg flex items-center justify-center">
            <img
              src="/profileimg.png" // Replace with your logo
              alt="Personal Logo"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </div>
        {/* Name and Title */}
        <h1 className="mt-6 text-2xl font-bold text-blue-400">
          Your Name
        </h1>
        <p className="text-blue-300 text-sm tracking-wide">
          Full-Stack Developer | Designer | Innovator
        </p>
      </div>

      {/* Animated Loading Text */}
      <div className="flex space-x-1 text-blue-400 text-lg font-medium animate-text-fade">
        {"Loading your experience...".split("").map((char, index) => (
          <span
            key={index}
            className={`animate-bounce delay-${index * 150}`}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative mt-6 w-64 h-3 bg-gray-800 rounded-full overflow-hidden">
        <div className="absolute h-full w-1/2 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 rounded-full animate-progress"></div>
      </div>
    </div>
  );
};





const App: React.FC = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);
  
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
        {isLoading && <LoadingScreen />}

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