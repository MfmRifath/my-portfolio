import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemProvider";
import { Link as ScrollLink } from "react-scroll";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const navLinks = [
  { name: "Home", to: "hero" },
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Services", to: "services" },
  { name: "Projects", to: "projects" },
  { name: "Certifications", to: "certifications" },
  { name: "Ideas", to: "ideas" },
  { name: "Contact", to: "contact" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Update login state
    });
    return () => unsubscribe();
  }, [auth]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      alert("Successfully logged out.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide">
          <span className="text-blue-500">MFM</span> Rifath
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              activeClass="text-blue-500 font-bold"
              spy={true}
              className="text-white hover:text-blue-400 transition-all duration-300 cursor-pointer relative"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 hover:w-full"></span>
            </ScrollLink>
          ))}
          {/* Conditional Authentication Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Log Out
            </button>
          ) : (
            <a
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Log In
            </a>
          )}
          {/* Download CV Button */}
          <a
            href="/path-to-your-cv.pdf"
            download
            className="ml-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Download CV
          </a>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 shadow-md transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="bg-gray-800 text-white p-4 space-y-4 md:hidden shadow-md">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              className="block text-lg font-medium hover:text-blue-400 transition-all duration-300 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </ScrollLink>
          ))}
          {/* Conditional Authentication Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block w-full text-center bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Log Out
            </button>
          ) : (
            <a
              href="/login"
              className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Log In
            </a>
          )}
          {/* Download CV Button */}
          <a
            href="/path-to-your-cv.pdf"
            download
            className="block w-full text-center bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Download CV
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;