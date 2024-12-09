import React, { useEffect } from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "./ThemProvider"; // Import ThemeProvider hook

const HeroSection: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { theme } = useTheme(); // Use theme from context

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
      className={`relative min-h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20 gap-16 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
      id="home"
      ref={ref}
    >
      {/* Dynamic Background */}
      <div
        className={`absolute inset-0 bg-cover bg-fixed bg-center opacity-50 ${
          theme === "dark"
            ? "bg-gradient-to-br from-black via-gray-900 to-blue-900"
            : "bg-gradient-to-br from-gray-100 via-gray-200 to-blue-50"
        }`}
      ></div>

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
          <span
            className={`bg-gradient-to-r ${
              theme === "dark"
                ? "from-blue-400 to-cyan-500"
                : "from-blue-600 to-cyan-700"
            } text-transparent bg-clip-text`}
          >
            RIFATH MFM
          </span>
        </motion.h1>
        <motion.div variants={itemVariants}>
          <TypeAnimation
            sequence={[
              "Computer Engineer",
              1000,
              "Full Stack Developer",
              1000,
              "Creative Problem Solver",
              1000,
              "Tech Enthusiast",
              1000,
            ]}
            speed={50}
            className={`text-2xl sm:text-3xl font-semibold ${
              theme === "dark" ? "text-blue-300" : "text-blue-600"
            }`}
            repeat={Infinity}
          />
        </motion.div>
        <motion.p
          className={`text-md sm:text-lg leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
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
          {/* Primary Button */}
        <motion.button
          className={`py-3 px-10 font-bold rounded-full shadow-lg transition-all ${
            theme === "dark"
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
              : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-cyan-800"
          }`}
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          onClick={() => window.open('https://www.fiverr.com/s/5rdyNgk', '_blank')}
        >
          Let’s Work Together
        </motion.button>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          className={`flex justify-center md:justify-start space-x-8 text-4xl ${
            theme === "dark" ? "text-blue-400" : "text-blue-600"
          } mt-6`}
          variants={itemVariants}
        >
          {[
            { icon: <FaLinkedin />, link: "https://www.linkedin.com" },
            { icon: <FaTwitter />, link: "https://www.twitter.com" },
            { icon: <FaGithub />, link: "https://www.github.com" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-transform transform hover:scale-125"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Profile Image */}
      <motion.div
        className={`relative z-10 shadow-2xl overflow-hidden rounded-full max-w-xs border-[10px] ${
          theme === "dark"
            ? "border-gradient-to-r from-blue-500 to-cyan-500"
            : "border-gradient-to-r from-blue-600 to-cyan-700"
        }`}
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

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <FaArrowRight
          className={`text-2xl ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } rotate-90`}
        />
        <p
          className={`text-sm mt-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Scroll Down
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;