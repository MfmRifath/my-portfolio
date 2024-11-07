import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useTheme } from "./ThemProvider";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A fully functional e-commerce web application with payment integration.",
    technologies: ["React", "Node.js", "MongoDB"],
    details:
      "This project involved creating a complete e-commerce solution with features such as product browsing, user authentication, cart management, and payment gateway integration. It also includes an admin panel for managing products and orders.",
    link: "#",
    image: "/Landscape_Background.jpg", // Placeholder image
  },
  {
    title: "Mobile Food Delivery App",
    description:
      "Cross-platform mobile application for food delivery services.",
    technologies: ["Flutter", "Firebase"],
    details:
      "A cross-platform food delivery app that supports real-time order tracking, push notifications, and payment options. The app was developed using Flutter and Firebase for scalability.",
    link: "#",
    image: "/Landscape_Background.jpg", // Placeholder image
  },
];

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const { theme } = useTheme(); // Get the current theme

  return (
    <section
      className={`py-20 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-white to-gray-100 text-gray-800"
      }`}
      id="projects"
    >
      <motion.h2
        className="text-5xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>
      <motion.p
        className={`text-center max-w-2xl mx-auto mb-16 leading-relaxed ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore some of the exciting projects I’ve worked on, showcasing my
        expertise in building modern web and mobile solutions.
      </motion.p>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Navigation]}
        className="mb-12"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className={`relative rounded-xl overflow-hidden shadow-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p
                  className={`text-sm mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {project.description}
                </p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-transform transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for project details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className={`rounded-lg max-w-2xl w-full p-8 shadow-lg ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-bold mb-4">
                {selectedProject.title}
              </h3>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p
                className={`mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {selectedProject.details}
              </p>
              <div className="text-sm mb-4">
                <strong>Technologies:</strong>{" "}
                {selectedProject.technologies.join(", ")}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Close
                </button>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Visit Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
