import React, { useEffect } from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation"; // Install with `npm install react-type-animation`

const HeroSection: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const buttonHover = {
    hover: { scale: 1.05, boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.3)" },
    tap: { scale: 0.95 },
  };

  return (
    <section
      className="relative text-white p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-16"
      id="home"
      ref={ref}
    >
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center opacity-40 blur-md"
        style={{ backgroundImage: "url('/Landscape_Background.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900 opacity-90"></div>

      {/* Text Content */}
      <motion.div
        className="relative z-10 max-w-lg text-center md:text-left space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold leading-tight"
          variants={itemVariants}
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
            RIFATH MFM
          </span>
        </motion.h1>
        <motion.div variants={itemVariants}>
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              1000,
              "Computer Engineer",
              1000,
              "Creative Problem Solver",
              1000,
              "Tech Enthusiast",
              1000,
            ]}
            speed={50}
            className="text-2xl sm:text-3xl font-semibold text-blue-300"
            repeat={Infinity}
          />
        </motion.div>
        <motion.p
          className="text-md sm:text-lg text-gray-300 leading-relaxed"
          variants={itemVariants}
        >
          I specialize in crafting high-performance web and mobile applications
          that blend functionality and creativity to deliver exceptional user
          experiences.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start"
          variants={itemVariants}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:from-blue-600 hover:to-cyan-600"
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            Let's Work Together
          </motion.button>
          <motion.button
            className="bg-transparent border-2 border-blue-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-blue-500 hover:text-black"
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            View My Portfolio
          </motion.button>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          className="flex justify-center md:justify-start space-x-8 text-4xl text-blue-400 mt-6"
          variants={itemVariants}
        >
          <motion.a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-transform transform hover:scale-125"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-transform transform hover:scale-125"
          >
            <FaTwitter />
          </motion.a>
          <motion.a
            href="https://www.github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-transform transform hover:scale-125"
          >
            <FaGithub />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Profile Image */}
      <motion.div
        className="relative z-10 shadow-2xl overflow-hidden rounded-full max-w-xs border-8 border-gradient-to-r from-blue-500 to-cyan-500"
        variants={imageVariants}
        initial="hidden"
        animate={controls}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src="/profileimg.png" // Replace with actual profile image path
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
