import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase"; // Import your Firebase configuration
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useTheme } from "./ThemProvider";

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<
    { id: string; name: string; email: string; location: string; budget: string; message: string }[]
  >([]);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    location: string;
    budget: string;
    message: string;
  }>({
    name: "",
    email: "",
    location: "",
    budget: "",
    message: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication state
  const { theme } = useTheme(); // Use theme from context

  // Initialize Firebase Auth
  const auth = getAuth();

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set isLoggedIn to true if a user is logged in
    });

    return () => unsubscribe();
  }, [auth]);

  // Fetch messages from Firestore
  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || "N/A",
        email: doc.data().email || "N/A",
        location: doc.data().location || "N/A",
        budget: doc.data().budget || "N/A",
        message: doc.data().message || "No message provided",
      }));
      setMessages(fetchedMessages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchMessages(); // Fetch messages only if logged in
    }
  }, [isLoggedIn]);

  // Submit the form and save to Firestore
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), formData);
      setFormData({
        name: "",
        email: "",
        location: "",
        budget: "",
        message: "",
      });
      if (isLoggedIn) {
        fetchMessages(); // Refresh the list after adding a new message
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  // Delete a message from Firestore
  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id)); // Remove message from state
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  return (
    <div
      className={`min-h-screen p-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Form Section */}
      <motion.div
        className={`p-8 rounded-lg shadow-lg mb-10 max-w-lg mx-auto ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-4">Let’s Discuss Your Project</h3>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Name"
            className={`w-full p-3 rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-900"
            }`}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className={`w-full p-3 rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-900"
            }`}
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Location (Optional)"
            className={`w-full p-3 rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-900"
            }`}
          />
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
            placeholder="Budget (Optional)"
            className={`w-full p-3 rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-900"
            }`}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Message"
            className={`w-full p-3 rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-900"
            }`}
            rows={5}
            required
          />
          <motion.button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold shadow-lg ${
              theme === "dark"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>

      {/* Messages List */}
      {isLoggedIn && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`p-6 rounded-lg shadow-lg relative ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold">{msg.name}</h3>
              <p className="text-sm">{msg.email}</p>
              <p className="text-sm truncate">{msg.message}</p>
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ContactMessages;