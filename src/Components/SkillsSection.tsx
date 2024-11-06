import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaJava,
  FaDocker,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiFlutter,
  SiTensorflow,
  SiAngular,
  SiVuedotjs,
  SiKotlin,
  SiSwift,
  SiCplusplus,
  SiDevpost,
  SiSpringboot,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

const skills = [
  {
    name: "JavaScript",
    level: 90,
    icon: <SiJavascript size={48} className="text-yellow-500" />,
  },
  {
    name: "React",
    level: 85,
    icon: <FaReact size={48} className="text-blue-400" />,
  },
  {
    name: "TypeScript",
    level: 80,
    icon: <SiTypescript size={48} className="text-blue-600" />,
  },
  {
    name: "Node.js",
    level: 75,
    icon: <FaNodeJs size={48} className="text-green-500" />,
  },
  {
    name: "Flutter",
    level: 70,
    icon: <SiFlutter size={48} className="text-blue-500" />,
  },
  {
    name: "Python",
    level: 65,
    icon: <FaPython size={48} className="text-blue-300" />,
  },
  {
    name: "Machine Learning",
    level: 60,
    icon: <SiTensorflow size={48} className="text-green-400" />,
  },
  {
    name: "Database Management",
    level: 85,
    icon: <FaDatabase size={48} className="text-purple-500" />,
  },
  {
    name: "Spring Boot",
    level: 80,
    icon: <SiSpringboot size={48} className="text-green-600" />,
  },
  {
    name: "MERN Stack",
    level: 85,
    icon: <FaReact size={48} className="text-blue-400" />,
  },
  {
    name: "Angular",
    level: 75,
    icon: <SiAngular size={48} className="text-red-500" />,
  },
  {
    name: "Vue.js",
    level: 70,
    icon: <SiVuedotjs size={48} className="text-green-400" />,
  },
  {
    name: "Java",
    level: 80,
    icon: <FaJava size={48} className="text-red-600" />,
  },
  {
    name: "Kotlin",
    level: 65,
    icon: <SiKotlin size={48} className="text-purple-400" />,
  },
  {
    name: "Swift",
    level: 70,
    icon: <SiSwift size={48} className="text-orange-500" />,
  },
  {
    name: "C++",
    level: 75,
    icon: <SiCplusplus size={48} className="text-blue-500" />,
  },
  {
    name: "DevOps",
    level: 60,
    icon: <SiDevpost size={48} className="text-gray-400" />,
  },
  {
    name: "Docker",
    level: 70,
    icon: <FaDocker size={48} className="text-blue-400" />,
  },
];

const SkillsSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section
      className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20 text-white"
      id="skills"
    >
      <h2 className="text-5xl font-extrabold text-center mb-12">My Skills</h2>
      <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed">
        Through dedicated learning and hands-on projects, I’ve cultivated a
        robust skill set across diverse technologies and disciplines.
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="relative group text-center"
            variants={circleVariants}
          >
            <div className="w-24 h-24 mx-auto relative">
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-full border-8 border-gray-700 group-hover:border-blue-500 transition-all duration-500"
                style={{
                  borderColor: `conic-gradient(
                    from 0deg, 
                    #3b82f6 ${skill.level}%, 
                    #374151 ${skill.level}%)`,
                }}
              >
                <div className="text-2xl font-bold text-blue-400">
                  {skill.level}%
                </div>
              </motion.div>
            </div>
            <div className="mt-4 flex flex-col items-center">
              {skill.icon}
              <h3 className="mt-2 text-lg font-semibold">{skill.name}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all transform"
        >
          View My Projects
        </motion.a>
      </div>
    </section>
  );
};

export default SkillsSection;
