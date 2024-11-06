import React from "react";
import { motion } from "framer-motion";

const ProjectIdeaSection: React.FC = () => {
  return (
    <section
      className="bg-gradient-to-r from-blue-50 to-blue-100 p-12 text-center"
      id="project-idea"
    >
      <motion.h2
        className="text-4xl font-extrabold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Do you have a Project Idea?
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Let's discuss your project! I'm here to help bring your ideas to life.
        Whether it’s a website, mobile app, or any custom solution, I’m ready to
        collaborate and deliver exceptional results.
      </motion.p>
      <motion.button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => alert("Let’s start your project!")}
      >
        Let’s Work Together
      </motion.button>
    </section>
  );
};

export default ProjectIdeaSection;
