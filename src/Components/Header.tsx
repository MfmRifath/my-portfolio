import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemProvider";
// Import ThemeProvider hook

const navLinks = [
  "Home",
  "Experians",
  "Services",
  "Projects",
  "Cretificates",
  "Contact",
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Use global theme and toggle

  const navAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navAnimation}
      className="bg-gradient-to-r from-black via-blue-900 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white p-4 sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="text-3xl font-extrabold tracking-wide"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-blue-500">MFM</span> Rifath
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="relative font-medium hover:text-blue-400 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {item}
              <motion.span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          {/* Call to Actions */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          >
            Download CV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          >
            Log In
          </motion.button>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full text-yellow-400 dark:text-gray-400 focus:outline-none"
          >
            {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-yellow-400 dark:text-gray-400 focus:outline-none"
          >
            {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-gray-900 bg-opacity-95 absolute top-16 left-0 w-full py-8 flex flex-col space-y-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {navLinks.map((item, index) => (
              <motion.a
                key={index}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-white text-lg font-medium hover:text-blue-400 text-center"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
