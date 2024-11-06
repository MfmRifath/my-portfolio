import React from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">
          © {new Date().getFullYear()} RIFATH MFM
        </p>
        <p className="text-gray-400 text-sm">
          All rights reserved. Designed and built by RIFATH MFM.
        </p>
      </div>
      <div className="flex justify-center space-x-6">
        <motion.a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaLinkedin size={24} />
        </motion.a>
        <motion.a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTwitter size={24} />
        </motion.a>
        <motion.a
          href="https://www.github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaGithub size={24} />
        </motion.a>
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Made with ❤️ and React</p>
      </div>
    </footer>
  );
};

export default Footer;
