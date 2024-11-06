import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    budget: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <section
      className="relative bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 p-12 text-white min-h-screen flex items-center justify-center"
      id="contact"
    >
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-2xl max-w-lg w-full p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Let’s Discuss Your Project
        </h2>
        <p className="text-center text-gray-200 mb-8">
          Fill out the form below, and I’ll get back to you shortly.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="text"
            name="location"
            placeholder="Location (Optional)"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="text"
            name="budget"
            placeholder="Budget (Optional)"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 h-32 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            whileFocus={{ scale: 1.02 }}
          ></motion.textarea>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </form>

        {formSubmitted && (
          <motion.div
            className="mt-6 text-center text-green-300 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Thank you! Your message has been sent.
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ContactForm;
