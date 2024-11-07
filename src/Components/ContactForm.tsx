import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemProvider";

const ContactForm: React.FC = () => {
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

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { theme } = useTheme(); // Access theme

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000); // Reset after 3 seconds
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <section
      className={`relative p-12 min-h-screen flex items-center justify-center ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 text-gray-900"
      }`}
      id="contact"
    >
      {/* Decorative Elements */}
      <div
        className={`absolute top-10 left-10 w-40 h-40 ${
          theme === "dark" ? "bg-purple-500" : "bg-pink-300"
        } rounded-full blur-3xl opacity-30`}
      ></div>
      <div
        className={`absolute bottom-20 right-20 w-56 h-56 ${
          theme === "dark" ? "bg-blue-500" : "bg-purple-300"
        } rounded-full blur-3xl opacity-30`}
      ></div>

      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-2xl max-w-lg w-full p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Let’s Discuss Your Project
        </h2>
        <p className="text-center mb-8 text-gray-200">
          Fill out the form below, and I’ll get back to you shortly.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {(Object.keys(formData) as Array<keyof typeof formData>).map(
            (field, index) => (
              <motion.div key={index} whileHover={{ scale: 1.02 }}>
                <motion.input
                  type={field === "message" ? "textarea" : "text"}
                  name={field}
                  placeholder={`${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  } ${
                    field === "location" || field === "budget"
                      ? "(Optional)"
                      : ""
                  }`}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg placeholder-gray-300 focus:outline-none ${
                    theme === "dark"
                      ? "bg-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                      : "bg-white text-gray-900 focus:ring-2 focus:ring-purple-300"
                  }`}
                />
              </motion.div>
            )
          )}
          <motion.button
            type="submit"
            className={`w-full font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Submit
          </motion.button>
        </form>

        {formSubmitted && (
          <motion.div
            className="mt-6 text-center font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className={theme === "dark" ? "text-green-300" : "text-green-500"}
            >
              Thank you! Your message has been sent.
            </span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ContactForm;
