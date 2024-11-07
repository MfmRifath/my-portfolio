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
      {/* Decorative Pastel Elements */}
      <div
        className={`absolute top-0 left-0 w-48 h-48 ${
          theme === "dark" ? "bg-blue-900" : "bg-blue-100"
        } rounded-full blur-2xl opacity-30`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-56 h-56 ${
          theme === "dark" ? "bg-pink-900" : "bg-pink-100"
        } rounded-full blur-2xl opacity-30`}
      ></div>

      <motion.h2
        className="text-4xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Got a Project Idea?
      </motion.h2>
      <motion.p
        className={`text-lg max-w-xl mx-auto mb-8 leading-relaxed ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        I’d love to hear about your project. Whether it’s a web app, mobile app,
        or a custom solution, I’m here to help turn your ideas into reality.
        Let’s collaborate and create something amazing together.
      </motion.p>
      <motion.button
        className={`py-3 px-8 rounded-full shadow-lg transition-transform transform font-semibold ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white"
            : "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => alert("Let’s start your project!")}
      >
        Let’s Collaborate
      </motion.button>

      {/* Bottom Decorative Element */}
      <div
        className={`absolute bottom-0 left-0 w-full h-16 ${
          theme === "dark"
            ? "bg-gradient-to-t from-gray-700 to-transparent"
            : "bg-gradient-to-t from-gray-200 to-transparent"
        } opacity-30`}
      ></div>
    </section>
  );
};

export default ProjectIdeaSection;
