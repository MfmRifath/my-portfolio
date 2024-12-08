import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemProvider";

const ProjectIdeaSection: React.FC = () => {
  const { theme } = useTheme(); // Use theme from context

  return (
    <section
      className={`relative p-12 text-center shadow-lg rounded-lg overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
          : "bg-white text-gray-800"
      }`}
      id="project-idea"
    >
      {/* Layered Decorative Pastel Elements */}
      <motion.div
        className={`absolute top-0 left-0 w-72 h-72 ${
          theme === "dark" ? "bg-blue-900" : "bg-blue-100"
        } rounded-full blur-3xl opacity-40`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <motion.div
        className={`absolute bottom-0 right-0 w-96 h-96 ${
          theme === "dark" ? "bg-pink-900" : "bg-pink-100"
        } rounded-full blur-3xl opacity-40`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      ></motion.div>

      <motion.h2
        className="text-5xl font-extrabold mb-6 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Got a Project Idea?
      </motion.h2>
      <motion.p
        className={`text-lg max-w-2xl mx-auto mb-8 leading-relaxed relative z-10 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        I’d love to hear about your project. Whether it’s a web app, mobile app,
        or a custom solution, I’m here to help turn your ideas into reality.
        Let’s collaborate and create something amazing together.
      </motion.p>
      <motion.button
        className={`py-4 px-10 rounded-full shadow-lg font-semibold relative z-10 transition-transform ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white"
            : "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white"
        }`}
        whileHover={{ scale: 1.1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => alert("Let’s start your project!")}
      >
        Let’s Collaborate
      </motion.button>

      {/* Bottom Decorative Element */}
      <motion.div
        className={`absolute bottom-0 left-0 w-full h-20 ${
          theme === "dark"
            ? "bg-gradient-to-t from-gray-700 to-transparent"
            : "bg-gradient-to-t from-gray-200 to-transparent"
        } opacity-40`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      ></motion.div>
    </section>
  );
};

export default ProjectIdeaSection;