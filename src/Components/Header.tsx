import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

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

  const navAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navAnimation}
      className="bg-gradient-to-r from-blue-900 via-black to-gray-900 text-white p-4 sticky top-0 z-50 shadow-lg"
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
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md mx-auto"
              onClick={() => setMenuOpen(false)}
            >
              Download CV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold py-3 px-8 rounded-lg shadow-md mx-auto"
              onClick={() => setMenuOpen(false)}
            >
              Log In
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
