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
  FaCogs,
  FaVrCardboard,
  FaBusinessTime,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "./ThemProvider";
// Ensure the path is correct

const services = [
  {
    icon: FaPaintBrush,
    title: "UI/UX Design",
    description:
      "Crafting visually appealing and intuitive designs to enhance user experience.",
    color: "text-blue-500",
  },
  {
    icon: FaLaptopCode,
    title: "Web Development",
    description:
      "Developing responsive and high-performance web applications tailored to your needs.",
    color: "text-green-500",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Development",
    description:
      "Building seamless cross-platform mobile applications with exceptional performance.",
    color: "text-purple-500",
  },
  {
    icon: FaDatabase,
    title: "Database Management",
    description:
      "Designing scalable database solutions to securely manage your data.",
    color: "text-red-500",
  },
  {
    icon: FaCloud,
    title: "Cloud Services",
    description:
      "Providing scalable cloud computing solutions to streamline your business operations.",
    color: "text-yellow-500",
  },
  {
    icon: FaRobot,
    title: "Machine Learning",
    description:
      "Implementing advanced AI solutions to optimize processes and drive innovation.",
    color: "text-pink-500",
  },
  {
    icon: FaShieldAlt,
    title: "Cybersecurity",
    description:
      "Protecting your digital assets with cutting-edge security solutions.",
    color: "text-teal-500",
  },
  {
    icon: FaChartLine,
    title: "Data Analytics",
    description:
      "Deriving actionable insights from complex data to inform strategic decisions.",
    color: "text-indigo-500",
  },
  {
    icon: FaCogs,
    title: "DevOps & CI/CD",
    description:
      "Automating and streamlining development pipelines for faster, reliable delivery.",
    color: "text-orange-500",
  },
  {
    icon: FaVrCardboard,
    title: "AR/VR Solutions",
    description:
      "Creating immersive augmented and virtual reality experiences for various industries.",
    color: "text-purple-500",
  },
  {
    icon: FaBusinessTime,
    title: "IT Consulting",
    description:
      "Providing expert advice and strategic planning to achieve your IT goals.",
    color: "text-blue-500",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ServicesSection: React.FC = () => {
  const { theme } = useTheme(); // Access the theme context

  return (
    <section
      className={`py-20 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-white to-gray-100 text-gray-800"
      }`}
      id="services"
    >
      <h2 className="text-5xl font-extrabold text-center mb-12">My Services</h2>
      <p
        className={`text-center max-w-3xl mx-auto mb-16 leading-relaxed ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        I provide a comprehensive range of services to help businesses thrive in
        a digital-first world.
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.3 }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className={`relative group rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Front Card */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div
                className={`text-6xl ${service.color} mb-4 group-hover:opacity-80`}
              >
                <service.icon />
              </div>
              <h3
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {service.title}
              </h3>
            </div>

            {/* Back Card */}
            <motion.div
              className={`absolute inset-0 text-center p-6 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-blue-50 text-gray-700"
              }`}
              variants={cardVariants}
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-sm">{service.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesSection;
