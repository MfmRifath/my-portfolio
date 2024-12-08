import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth, User } from "firebase/auth"; // Import Firebase Auth and User type
import { useTheme } from "./ThemProvider";
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
  SiSpringboot,
  SiOpenai,
  SiDjango,
} from "react-icons/si";
import { db } from "../firebase";

// Icon options for dropdown
const iconOptions = [
  { label: "JavaScript", value: "SiJavascript", icon: <SiJavascript /> },
  { label: "React", value: "FaReact", icon: <FaReact /> },
  { label: "TypeScript", value: "SiTypescript", icon: <SiTypescript /> },
  { label: "Node.js", value: "FaNodeJs", icon: <FaNodeJs /> },
  { label: "Flutter", value: "SiFlutter", icon: <SiFlutter /> },
  { label: "Python", value: "FaPython", icon: <FaPython /> },
  { label: "Django", value: "SiDjango", icon: <SiDjango /> },
  { label: "Database", value: "FaDatabase", icon: <FaDatabase /> },
  { label: "Spring Boot", value: "SiSpringboot", icon: <SiSpringboot /> },
  { label: "Docker", value: "FaDocker", icon: <FaDocker /> },
  { label: "Angular", value: "SiAngular", icon: <SiAngular /> },
  { label: "Vue.js", value: "SiVuedotjs", icon: <SiVuedotjs /> },
  { label: "Kotlin", value: "SiKotlin", icon: <SiKotlin /> },
  { label: "Swift", value: "SiSwift", icon: <SiSwift /> },
  { label: "C++", value: "SiCplusplus", icon: <SiCplusplus /> },
  { label: "LLM", value: "SiOpenai", icon: <SiOpenai /> },
];

interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string;
}

const SkillsSection: React.FC = () => {
  const { theme } = useTheme();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Skill>({
    id: "",
    name: "",
    level: 0,
    icon: "SiJavascript",
  });
  const [user, setUser] = useState<User | null>(null); // Track logged-in user

  const auth = getAuth(); // Firebase Auth

  // Check for logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Fetch skills from Firestore
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const skillsSnapshot = await getDocs(collection(db, "skills"));
      setSkills(
        skillsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Skill[]
      );
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Add or update skill
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, name, level, icon } = formData;

    try {
      if (id) {
        const docRef = doc(db, "skills", id);
        await updateDoc(docRef, { name, level, icon });
      } else {
        await addDoc(collection(db, "skills"), { name, level, icon });
      }
      fetchSkills();
      setFormData({ id: "", name: "", level: 0, icon: "SiJavascript" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  // Delete skill
  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, "skills", id);
      await deleteDoc(docRef);
      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find((opt) => opt.value === iconName);
    return icon ? icon.icon : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section
      className={`py-20 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-gray-100 via-gray-50 to-white text-gray-900"
      }`}
      id="skills"
    >
      <h2 className="text-5xl font-extrabold text-center mb-12">My Skills</h2>
      <p className="text-center max-w-3xl mx-auto mb-16 leading-relaxed">
        Manage your skills dynamically with real-time updates.
      </p>

      {/* Skills List */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            className={`relative overflow-hidden shadow-lg rounded-lg p-6 text-center ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } group transform hover:scale-105 transition-transform`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Icon */}
            <div className="relative z-10 flex justify-center items-center mb-6">
              <div
                className={`w-24 h-24 flex items-center justify-center rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gradient-to-r from-blue-400 to-teal-400"
                }`}
              >
                <div className="text-5xl">{getIconComponent(skill.icon)}</div>
              </div>
            </div>

            {/* Text */}
            <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
            <p className="text-sm mb-4">{skill.level}% Proficiency</p>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden relative">
              <motion.div
                className={`h-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gradient-to-r from-blue-400 to-teal-400"
                }`}
                style={{ width: `${skill.level}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              ></motion.div>
            </div>

            {/* Edit/Delete Buttons */}
            {user && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="text-blue-500"
                  onClick={() => {
                    setFormData(skill);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(skill.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Add Skill Button */}
      {user && (
        <motion.button
          className="mt-10 block mx-auto bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md transform hover:scale-105 transition-transform"
          onClick={() => setIsEditing(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Add Skill
        </motion.button>
      )}

      {/* Add/Edit Skill Modal */}
      {isEditing && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {formData.id ? "Edit Skill" : "Add Skill"}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Skill Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="block w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="number"
                placeholder="Skill Level (0-100)"
                value={formData.level}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, level: +e.target.value }))
                }
                className="block w-full p-2 border rounded mb-4"
                required
              />
              <select
                value={formData.icon}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, icon: e.target.value }))
                }
                className="block w-full p-2 border rounded mb-4"
              >
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => {
                  setFormData({ id: "", name: "", level: 0, icon: "SiJavascript" });
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default SkillsSection;