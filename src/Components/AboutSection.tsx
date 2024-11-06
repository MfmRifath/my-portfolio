import React from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaBriefcase,
  FaGraduationCap,
  FaBuilding,
} from "react-icons/fa";

const EducationExperience: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative bg-gradient-to-b from-gray-100 to-gray-200 py-20 px-8 overflow-hidden"
      id="education-experience"
    >
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>

      {/* Section Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
          Education & Experience
        </h2>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          A glimpse of my academic journey and professional milestones.
        </p>
      </motion.div>

      {/* Education Section */}
      <motion.div
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Education
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: (
                <FaGraduationCap size={28} className="text-blue-500 mb-3" />
              ),
              title: "Bachelor of Computer Engineering",
              institution: "University of Ruhuna",
              period: "2019 - 2023",
            },
            {
              icon: <FaUniversity size={28} className="text-green-500 mb-3" />,
              title: "Advanced Level Studies",
              institution: "Rahula College, Matara",
              period: "2016 - 2018",
            },
            {
              icon: (
                <FaGraduationCap size={28} className="text-purple-500 mb-3" />
              ),
              title: "O Level Studies",
              institution: "Rahula College, Matara",
              period: "2012 - 2016",
            },
          ].map((edu, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-8 text-center transform hover:scale-105 hover:rotate-1 transition-transform duration-300 ease-out hover:shadow-2xl"
              variants={cardVariants}
            >
              {edu.icon}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {edu.title}
              </h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500 text-sm">{edu.period}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Experience
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <FaBriefcase size={28} className="text-blue-500 mb-3" />,
              title: "Full Stack Developer Intern",
              company: "Tech Solutions Pvt Ltd",
              period: "2022 - 2023",
            },
            {
              icon: <FaBuilding size={28} className="text-green-500 mb-3" />,
              title: "Junior Software Engineer",
              company: "Innovative Systems Inc.",
              period: "2021 - 2022",
            },
            {
              icon: <FaBriefcase size={28} className="text-purple-500 mb-3" />,
              title: "Freelance Developer",
              company: "Self-employed",
              period: "2020 - Present",
            },
          ].map((exp, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-8 text-center transform hover:scale-105 hover:rotate-1 transition-transform duration-300 ease-out hover:shadow-2xl"
              variants={cardVariants}
            >
              {exp.icon}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {exp.title}
              </h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-500 text-sm">{exp.period}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default EducationExperience;
