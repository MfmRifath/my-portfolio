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
                  <section id="hero">
                    <HeroSection />
                  </section>
                  <section id="about">
                    <EducationExperience />
                  </section>
                  <section id="skills">
                    <SkillsSection />
                  </section>
                  <section id="services">
                    <ServicesSection />
                  </section>
                  <section id="projects">
                    <ProjectsSection />
                  </section>
                  <section id="certifications">
                    <CertificationsSection />
                  </section>
                  <section id="ideas">
                    <ProjectIdeaSection />
                  </section>
                  <section id="contact">
                    <ContactForm />
                  </section>
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