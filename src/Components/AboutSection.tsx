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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import {
  FaGraduationCap,
  FaBriefcase,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useTheme } from "./ThemProvider";
import { db } from "../firebase";

interface EducationExperienceProps {
  id: string;
  title: string;
  institution?: string;
  company?: string;
  period: string;
  imageUrl: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5 },
  }),
};

const EducationExperience: React.FC = () => {
  const { theme } = useTheme();
  const [education, setEducation] = useState<EducationExperienceProps[]>([]);
  const [experience, setExperience] = useState<EducationExperienceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formType, setFormType] = useState<"education" | "experience" | null>(
    null
  );
  const [formData, setFormData] = useState<EducationExperienceProps>({
    id: "",
    title: "",
    institution: "",
    company: "",
    period: "",
    imageUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const storage = getStorage();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const educationSnapshot = await getDocs(collection(db, "education"));
      const experienceSnapshot = await getDocs(collection(db, "experience"));

      setEducation(
        educationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as EducationExperienceProps[]
      );
      setExperience(
        experienceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as EducationExperienceProps[]
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

  const handleImageUpload = async (): Promise<string> => {
    if (!file) return formData.imageUrl || "";
    const storageRef = ref(storage, `${formType}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { id, title, institution, company, period } = formData;

    try {
      const imageUrl = await handleImageUpload();

      if (id) {
        const collectionName = formType === "education" ? "education" : "experience";
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, { title, institution, company, period, imageUrl });
      } else {
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
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (loading || isSubmitting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
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
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6">Education & Experience</h2>
      </div>

      <div className="my-16">
        {/* Education Section */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold">Education</h3>
          {user && (
            <button
              className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded shadow-lg"
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
          )}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <img
                src={edu.imageUrl}
                alt={edu.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold">{edu.title}</h3>
                <p className="text-gray-500">{edu.institution}</p>
                <p className="text-gray-400 text-sm">{edu.period}</p>
              </div>
              {user && (
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
                    onClick={() => {
                      setFormType("education");
                      setFormData({ ...edu, company: "" });
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                    onClick={() => handleDelete(edu.id, "education")}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="my-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold">Experience</h3>
            {user && (
              <button
                className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded shadow-lg"
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
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <img
                  src={exp.imageUrl}
                  alt={exp.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <p className="text-gray-500">{exp.company}</p>
                  <p className="text-gray-400 text-sm">{exp.period}</p>
                </div>
                {user && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
                      onClick={() => {
                        setFormType("experience");
                        setFormData({ ...exp, institution: "" });
                      }}
                    >
                        <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                      onClick={() => handleDelete(exp.id, "experience")}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {formType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {formType === "education" ? "Add Education" : "Add Experience"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-2 border rounded"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              {formType === "education" && (
                <div className="mb-4">
                  <label htmlFor="institution" className="block font-medium">
                    Institution
                  </label>
                  <input
                    type="text"
                    id="institution"
                    className="w-full p-2 border rounded"
                    value={formData.institution || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, institution: e.target.value })
                    }
                  />
                </div>
              )}
              {formType === "experience" && (
                <div className="mb-4">
                  <label htmlFor="company" className="block font-medium">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full p-2 border rounded"
                    value={formData.company || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="period" className="block font-medium">
                  Period
                </label>
                <input
                  type="text"
                  id="period"
                  className="w-full p-2 border rounded"
                  value={formData.period}
                  onChange={(e) =>
                    setFormData({ ...formData, period: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block font-medium">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setFormType(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default EducationExperience;