import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemProvider";
// Adjust this import based on your file structure

const certifications = [
  {
    title: "Full Stack Web Development",
    institution: "Coursera",
    date: "June 2023",
    logo: "https://via.placeholder.com/300x200", // Replace with actual image URL
    link: "https://coursera.org/certificate/example",
  },
  {
    title: "React Developer Certification",
    institution: "Udemy",
    date: "May 2023",
    logo: "https://via.placeholder.com/300x200", // Replace with actual image URL
    link: "https://udemy.com/certificate/example",
  },
  {
    title: "Machine Learning",
    institution: "Stanford University",
    date: "April 2023",
    logo: "https://via.placeholder.com/300x200", // Replace with actual image URL
    link: "https://stanford.edu/certificate/example",
  },
  {
    title: "SQL (Intermediate)",
    institution: "HackerRank",
    date: "March 2023",
    logo: "https://via.placeholder.com/300x200", // Replace with actual image URL
    link: "https://hackerrank.com/certificate/example",
  },
];

const flipVariants = {
  hidden: { rotateY: 180, opacity: 0 },
  visible: { rotateY: 0, opacity: 1, transition: { duration: 0.7 } },
  exit: { rotateY: -180, opacity: 0, transition: { duration: 0.7 } },
};

const CertificationsSection: React.FC = () => {
  const [flippedStates, setFlippedStates] = useState<boolean[]>(
    Array(certifications.length).fill(false)
  );
  const { theme } = useTheme(); // Access theme

  const handleFlip = (index: number) => {
    setFlippedStates((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

  return (
    <section
      className={`py-20 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
      id="certifications"
    >
      <h2 className="text-5xl font-extrabold text-center mb-12">
        Certifications
      </h2>
      <p
        className={`text-center max-w-3xl mx-auto mb-16 leading-relaxed ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Here are some of the certifications I’ve earned to enhance my skills and
        stay updated with the latest industry standards.
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.3 }}
      >
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="group perspective w-full h-80 cursor-pointer relative"
            onClick={() => handleFlip(index)}
          >
            <motion.div
              className="absolute inset-0 backface-hidden w-full h-full"
              animate={flippedStates[index] ? "exit" : "visible"}
              variants={flipVariants}
            >
              {/* Front Side */}
              <div
                className={`absolute inset-0 p-6 flex flex-col items-center justify-center rounded-lg shadow-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  src={cert.logo}
                  alt={`${cert.title} certificate`}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h3
                  className={`text-lg font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {cert.title}
                </h3>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  } text-sm`}
                >
                  {cert.institution}
                </p>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  } text-sm`}
                >
                  {cert.date}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 backface-hidden w-full h-full rotate-y-180"
              animate={flippedStates[index] ? "visible" : "exit"}
              variants={flipVariants}
            >
              {/* Back Side */}
              <div
                className={`absolute inset-0 text-center p-6 flex flex-col items-center justify-center rounded-lg shadow-lg ${
                  theme === "dark" ? "bg-blue-500" : "bg-blue-100"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{cert.title}</h3>
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-2 px-4 rounded-full font-semibold transition-colors ${
                    theme === "dark"
                      ? "bg-white text-blue-500 hover:bg-gray-100"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Certification
                </motion.a>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default CertificationsSection;
