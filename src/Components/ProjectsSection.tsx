import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A fully functional e-commerce web application with payment integration.",
    technologies: ["React", "Node.js", "MongoDB"],
    details:
      "This project involved creating a complete e-commerce solution with features such as product browsing, user authentication, cart management, and payment gateway integration. It also includes an admin panel for managing products and orders.",
    link: "#",
    image: "Landscape_Background.jpg", // Replace with actual image path
  },
  {
    title: "Mobile Food Delivery App",
    description:
      "Cross-platform mobile application for food delivery services.",
    technologies: ["Flutter", "Firebase"],
    details:
      "A cross-platform food delivery app that supports real-time order tracking, push notifications, and payment options. The app was developed using Flutter and Firebase for scalability.",
    link: "#",
    image: "Landscape_Background.jpg",
  },
  // Add more projects...
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-white p-12"
      id="projects"
    >
      <motion.h2
        className="text-4xl font-extrabold text-center text-gray-800 mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        My Projects
      </motion.h2>
      <motion.p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        Here are some of the projects I've worked on, showcasing my expertise in
        full-stack development, mobile apps, and machine learning.
      </motion.p>

      {/* Swiper Carousel for Projects */}
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
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
              <div className="relative p-6 bg-gradient-to-t from-black via-transparent to-transparent text-white">
                <motion.h3
                  className="text-xl font-bold mb-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="mb-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  {project.description}
                </motion.p>
                <div className="text-sm mb-4">
                  <strong>Technologies:</strong>{" "}
                  {project.technologies.join(", ")}
                </div>
                <motion.button
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.1 }}
                  className="text-blue-400 hover:underline font-semibold"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for project details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-gray-600 mb-4">{selectedProject.details}</p>
              <div className="text-sm mb-4">
                <strong>Technologies:</strong>{" "}
                {selectedProject.technologies.join(", ")}
              </div>
              <div className="flex justify-end space-x-4">
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Close
                </motion.button>
                <motion.a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Visit Project
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
