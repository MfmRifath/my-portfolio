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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  FaGraduationCap,
  FaBriefcase,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useTheme } from "./ThemProvider";
import { db } from "../firebase";

interface Education {
  id: string;
  title: string;
  institution?: string;
  company?: string;
  period: string;
  imageUrl: string;
}

interface Experience {
  id: string;
  title: string;
  institution?: string;
  company?: string;
  period: string;
  imageUrl: string;
}

const EducationExperience: React.FC = () => {
  const { theme } = useTheme();
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState<"education" | "experience" | null>(
    null
  );
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    institution?: string;
    company?: string;
    period: string;
    imageUrl: string;
  }>({
    id: "",
    title: "",
    institution: "",
    company: "",
    period: "",
    imageUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const storage = getStorage(); // Firebase Storage

  const fetchData = async () => {
    setLoading(true);
    try {
      const educationSnapshot = await getDocs(collection(db, "education"));
      const experienceSnapshot = await getDocs(collection(db, "experience"));

      setEducation(
        educationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Education[]
      );
      setExperience(
        experienceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Experience[]
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Image Upload
  const handleImageUpload = async (): Promise<string> => {
    if (!file) return formData.imageUrl || "";
    const storageRef = ref(storage, `${formType}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // Handle Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, title, institution, company, period } = formData;

    try {
      const imageUrl = await handleImageUpload();

      if (id) {
        // Update existing record
        const collectionName = formType === "education" ? "education" : "experience";
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, { title, institution, company, period, imageUrl });
      } else {
        // Add new record
        const collectionName = formType === "education" ? "education" : "experience";
        const docRef = collection(db, collectionName);
        await addDoc(docRef, { title, institution, company, period, imageUrl });
      }
      fetchData();
      setFormData({ id: "", title: "", institution: "", company: "", period: "", imageUrl: "" });
      setFile(null);
      setFormType(null);
    } catch (error) {
      console.error("Error adding/updating document:", error);
    }
  };

  // Handle Delete Operation
  const handleDelete = async (id: string, type: "education" | "experience") => {
    try {
      const collectionName = type === "education" ? "education" : "experience";
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      fetchData();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
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
      className={`relative py-20 px-8 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-gray-700 text-white"
          : "bg-gradient-to-b from-gray-50 to-blue-100 text-gray-800"
      }`}
      id="education-experience"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-5xl font-extrabold mb-6">Education & Experience</h2>
        <p
          className={`text-lg ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          A detailed look at my academic and professional journey.
        </p>
      </motion.div>

      {/* Education Section */}
      <motion.div
        className="my-16"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold">Education</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setFormType("education");
              setFormData({
                id: "",
                title: "",
                institution: "",
                company: "",
                period: "",
                imageUrl: "",
              });
            }}
          >
            <FaPlus /> Add
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              variants={fadeIn}
            >
              <img
                src={edu.imageUrl}
                alt={edu.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                <p className="text-gray-300">{edu.institution}</p>
                <p className="text-sm text-gray-400">{edu.period}</p>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  className="text-blue-500 bg-white rounded-full p-2 shadow"
                  onClick={() => {
                    setFormType("education");
                    setFormData({ ...edu, company: "" });
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 bg-white rounded-full p-2 shadow"
                  onClick={() => handleDelete(edu.id, "education")}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience Section */}
      <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold">Experience</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setFormType("experience");
              setFormData({
                id: "",
                title: "",
                institution: "",
                company: "",
                period: "",
                imageUrl: "",
              });
            }}
          >
            <FaPlus /> Add
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experience.map((exp) => (
            <motion.div
              key={exp.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              variants={fadeIn}
            >
              <img
                src={exp.imageUrl}
                alt={exp.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <p className="text-gray-300">{exp.company}</p>
                <p className="text-sm text-gray-400">{exp.period}</p>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  className="text-blue-500 bg-white rounded-full p-2 shadow"
                  onClick={() => {
                    setFormType("experience");
                    setFormData({ ...exp, institution: "" });
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 bg-white rounded-full p-2 shadow"
                  onClick={() => handleDelete(exp.id, "experience")}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default EducationExperience;