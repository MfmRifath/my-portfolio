import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { useTheme } from "./ThemProvider";

interface Certification {
  id: string;
  title: string;
  institution: string;
  date: string;
  logo: string;
  link: string;
}

const flipVariants = {
  hidden: { rotateY: 180, opacity: 0 },
  visible: { rotateY: 0, opacity: 1, transition: { duration: 0.7 } },
  exit: { rotateY: -180, opacity: 0, transition: { duration: 0.7 } },
};

const CertificationsSection: React.FC = () => {
  const { theme } = useTheme();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [formData, setFormData] = useState<Certification>({
    id: "",
    title: "",
    institution: "",
    date: "",
    logo: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [flippedStates, setFlippedStates] = useState<boolean[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication state

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Update isLoggedIn based on user presence
    });
    return unsubscribe;
  }, [auth]);

  const fetchCertifications = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "certifications"));
      const fetchedCertifications: Certification[] = querySnapshot.docs.map(
        (doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            institution: data.institution,
            date: data.date,
            logo: data.logo,
            link: data.link,
          };
        }
      );
      setCertifications(fetchedCertifications);
      setFlippedStates(Array(fetchedCertifications.length).fill(false));
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, ...data } = formData;

    try {
      let imageUrl = formData.logo;

      if (imageFile) {
        const storage = getStorage();
        const imageRef = ref(storage, `certifications/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (id) {
        const docRef = doc(db, "certifications", id);
        await updateDoc(docRef, { ...data, logo: imageUrl });
      } else {
        await addDoc(collection(db, "certifications"), { ...data, logo: imageUrl });
      }

      fetchCertifications();
      resetForm();
    } catch (error) {
      console.error("Error saving certification:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, "certifications", id);
      await deleteDoc(docRef);
      fetchCertifications();
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      institution: "",
      date: "",
      logo: "",
      link: "",
    });
    setImageFile(null);
    setIsEditing(false);
  };

  const startEdit = (certification: Certification) => {
    setFormData(certification);
    setIsEditing(true);
  };

  const handleFlip = (index: number) => {
    setFlippedStates((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

  const buttonStyles = `
    py-2 px-4 rounded-lg font-semibold shadow-lg transition-transform 
    transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
  `;

  return (
    <section
      className={`py-20 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
      id="certifications"
    >
      <h2 className="text-5xl font-extrabold text-center mb-12">Certifications</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.3 }}
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            className="group perspective w-full h-80 cursor-pointer relative transition-shadow hover:shadow-2xl"
            onClick={() => handleFlip(index)}
          >
            <motion.div
              className="absolute inset-0 backface-hidden w-full h-full"
              animate={flippedStates[index] ? "exit" : "visible"}
              variants={flipVariants}
            >
              <div
                className={`absolute inset-0 p-6 flex flex-col items-center justify-center rounded-lg shadow-lg ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-gray-800 to-gray-900"
                    : "bg-gradient-to-r from-white to-gray-100"
                }`}
              >
                <img
                  src={cert.logo}
                  alt={`${cert.title} certificate`}
                  className="w-full h-40 object-cover mb-4 rounded-lg"
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
                {isLoggedIn && (
                  <div className="mt-4 space-x-2">
                    <button
                      onClick={() => startEdit(cert)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {isLoggedIn && (
        <motion.button
          className={`mt-12 mx-auto block bg-blue-500 hover:bg-blue-600 text-white ${buttonStyles}`}
          onClick={() => setIsEditing(true)}
        >
          Add New Certification
        </motion.button>
      )}

      {isEditing && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {formData.id ? "Edit Certification" : "Add Certification"}
            </h3>
            <form onSubmit={handleFormSubmit}>
              {/* Form fields here */}
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default CertificationsSection;