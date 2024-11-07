import React from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const iconHover = {
    hover: {
      scale: 1.2,
      color: "#4ade80", // Subtle green glow
      boxShadow: "0 0 8px rgba(74, 222, 128, 0.7)",
    },
    tap: { scale: 0.9 },
  };

  return (
    <motion.footer
      className="bg-gradient-to-t from-gray-900 to-black text-white py-8"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
      {/* Footer Text */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-lg font-semibold">
          © {new Date().getFullYear()} RIFATH MFM
        </p>
        <p className="text-gray-400 text-sm">
          All rights reserved. Designed and built by RIFATH MFM.
        </p>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        className="flex justify-center space-x-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
          variants={iconHover}
          whileHover="hover"
          whileTap="tap"
        >
          <FaLinkedin size={28} />
        </motion.a>
        <motion.a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
          variants={iconHover}
          whileHover="hover"
          whileTap="tap"
        >
          <FaTwitter size={28} />
        </motion.a>
        <motion.a
          href="https://www.github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
          variants={iconHover}
          whileHover="hover"
          whileTap="tap"
        >
          <FaGithub size={28} />
        </motion.a>
      </motion.div>

      {/* Footer Bottom Text */}
      <motion.div
        className="mt-6 text-center text-sm text-gray-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p>Made with ❤️ and React</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
