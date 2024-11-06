import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaSchool,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const AboutSection: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative bg-gradient-to-b from-blue-50 to-gray-100 py-20 px-8"
      id="about"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 pointer-events-none"></div>

      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">About Me</h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          I’m an Undergraduate Computer Engineer from the{" "}
          <span className="text-blue-500 font-semibold">
            University of Ruhuna, Faculty of Engineering, Computer Department
          </span>
          . I specialize in developing innovative and user-friendly applications
          and have expertise in Machine Learning and Artificial Intelligence to
          drive data-driven insights and automation.
        </p>
      </motion.div>

      {/* Personal Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {[
          {
            icon: <FaMapMarkerAlt size={28} className="text-blue-500 mb-3" />,
            title: "Address",
            detail: "123 Main Street, Matara, Sri Lanka",
          },
          {
            icon: <FaSchool size={28} className="text-green-500 mb-3" />,
            title: "School",
            detail: "Rahula College, Matara",
          },
          {
            icon: <FaEnvelope size={28} className="text-purple-500 mb-3" />,
            title: "Email",
            detail: "mfm.rifath@example.com",
          },
          {
            icon: <FaPhoneAlt size={28} className="text-red-500 mb-3" />,
            title: "Contact",
            detail: "+94 77 123 4567",
          },
        ].map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-xl rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-300"
          >
            {info.icon}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {info.title}
            </h3>
            <p className="text-gray-600">{info.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Decorative Element */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-28 h-28 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      {/* Call to Action Buttons */}
      <div className="flex justify-center space-x-8 mt-16">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
        >
          My Projects
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
        >
          Download CV
        </motion.button>
      </div>
    </section>
  );
};

export default AboutSection;
