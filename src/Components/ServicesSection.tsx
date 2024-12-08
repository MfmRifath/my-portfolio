import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPaintBrush,
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
  FaDatabase,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaCogs,
  FaVrCardboard,
  FaBusinessTime,
} from "react-icons/fa";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { useTheme } from "./ThemProvider"; // Adjust the path to your ThemeProvider
import { db } from "../firebase";

const icons = {
  FaPaintBrush,
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
  FaDatabase,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaCogs,
  FaVrCardboard,
  FaBusinessTime,
};

type IconKey = keyof typeof icons;

interface Service {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: IconKey;
}

const ServicesSection: React.FC = () => {
  const { theme } = useTheme();
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<Service>({
    id: "",
    title: "",
    description: "",
    color: "bg-blue-500",
    icon: "FaPaintBrush",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Track the logged-in user

  const auth = getAuth(); // Firebase Auth

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Fetch services from Firestore
  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      const fetchedServices: Service[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          description: data.description || "",
          color: data.color || "bg-blue-500",
          icon: data.icon || "FaPaintBrush",
        };
      });
      setServices(fetchedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form submission for adding/editing services
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, ...data } = formData;

    try {
      if (id) {
        await updateDoc(doc(db, "services", id), data);
      } else {
        await addDoc(collection(db, "services"), data);
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "services", id));
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      color: "bg-blue-500",
      icon: "FaPaintBrush",
    });
    setIsEditing(false);
  };

  return (
    <section
      className={`py-20 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-gray-100 to-white text-gray-800"
      }`}
    >
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-extrabold mb-6">Our Services</h2>
        <p className="max-w-2xl mx-auto text-lg">
          Explore our comprehensive range of services tailored to your needs.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12">
        {services.length ? (
          services.map((service) => (
            <motion.div
              key={service.id}
              className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${service.color} text-white text-5xl mb-4`}
              >
                {React.createElement(icons[service.icon])}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm mb-4">{service.description}</p>
              {user && ( // Show Edit/Delete buttons only if user is logged in
                <div className="flex justify-between">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setFormData(service);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No services available. Add some to get started!
          </p>
        )}
      </div>

      {/* Add New Service Button */}
      {user && ( // Show Add button only if user is logged in
        <motion.button
          className="mt-12 block mx-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsEditing(true)}
        >
          Add New Service
        </motion.button>
      )}

      {/* Modal for Add/Edit */}
      {isEditing && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {formData.id ? "Edit Service" : "Add Service"}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="block w-full p-3 border rounded mb-4"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                className="block w-full p-3 border rounded mb-4"
                required
              />
              <select
                value={formData.color}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, color: e.target.value }))
                }
                className="block w-full p-3 border rounded mb-4"
              >
                <option value="bg-blue-500">Blue</option>
                <option value="bg-green-500">Green</option>
                <option value="bg-purple-500">Purple</option>
                <option value="bg-red-500">Red</option>
                <option value="bg-yellow-500">Yellow</option>
              </select>
              <select
                value={formData.icon}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, icon: e.target.value as IconKey }))
                }
                className="block w-full p-3 border rounded mb-4"
              >
                {Object.keys(icons).map((key) => (
                  <option key={key} value={key}>
                    {key.replace("Fa", "").replace(/([A-Z])/g, " $1")}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ServicesSection;