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
    // Simulate form submission
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <section
      className="bg-gradient-to-r from-gray-50 to-blue-50 p-12"
      id="contact"
    >
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        Let's discuss your Project
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Fill out the form below, and I’ll get back to you as soon as possible.
      </p>

      <motion.form
        className="max-w-lg mx-auto grid gap-4 bg-white shadow-lg rounded-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
      >
        <motion.input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.input
          type="text"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 h-24 resize-none"
          whileFocus={{ scale: 1.02 }}
        ></motion.textarea>
        <motion.button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>

      {formSubmitted && (
        <motion.div
          className="mt-6 text-center text-green-500 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Thank you! Your message has been sent.
        </motion.div>
      )}
    </section>
  );
};

export default ContactForm;
