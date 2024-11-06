import React from "react";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaCloud,
  FaDatabase,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaPaintBrush className="text-blue-500 text-5xl mb-4 mx-auto" />,
    title: "UI/UX Design",
    description:
      "Creating intuitive and user-friendly designs that enhance user experience.",
  },
  {
    icon: <FaLaptopCode className="text-green-500 text-5xl mb-4 mx-auto" />,
    title: "Web Development",
    description:
      "Building responsive and high-performance websites using modern technologies.",
  },
  {
    icon: <FaMobileAlt className="text-purple-500 text-5xl mb-4 mx-auto" />,
    title: "Mobile Development",
    description:
      "Developing sleek, user-friendly cross-platform mobile applications.",
  },
  {
    icon: <FaDatabase className="text-red-500 text-5xl mb-4 mx-auto" />,
    title: "Database Management",
    description:
      "Designing and maintaining robust and scalable database systems.",
  },
  {
    icon: <FaCloud className="text-yellow-500 text-5xl mb-4 mx-auto" />,
    title: "Cloud Services",
    description:
      "Offering scalable cloud solutions to meet your business needs.",
  },
  {
    icon: <FaRobot className="text-pink-500 text-5xl mb-4 mx-auto" />,
    title: "Machine Learning",
    description:
      "Implementing AI and ML models to automate and optimize processes.",
  },
  {
    icon: <FaShieldAlt className="text-teal-500 text-5xl mb-4 mx-auto" />,
    title: "Cybersecurity",
    description:
      "Ensuring the security of your systems and data with advanced solutions.",
  },
  {
    icon: <FaChartLine className="text-indigo-500 text-5xl mb-4 mx-auto" />,
    title: "Data Analytics",
    description:
      "Providing actionable insights through comprehensive data analysis.",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-gray-100 p-12"
      id="services"
    >
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        My Services
      </h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
        I offer a wide range of services tailored to meet the unique needs of
        each project, from design and development to data-driven solutions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform duration-300"
          >
            {service.icon}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
