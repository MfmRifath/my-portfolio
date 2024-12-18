import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, getAuth, User } from "firebase/auth"; // Firebase Authentication
import { db } from "../firebase";
import { useTheme } from "./ThemProvider";

interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  technologies: string[];
  link: string;
  image: string;
}

const ProjectsSection: React.FC = () => {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Project>({
    id: "",
    title: "",
    description: "",
    details: "",
    technologies: [],
    link: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // Track logged-in user

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User state changed:", currentUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      console.log("Fetched Projects:", querySnapshot.docs.map((doc) => doc.data()));
      const fetchedProjects: Project[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          description: data.description || "",
          details: data.details || "",
          technologies: data.technologies || [],
          link: data.link || "",
          image: data.image || "",
        };
      });
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.image;
  
      // Upload the image if selected
      if (imageFile) {
        const storage = getStorage();
        const imageRef = ref(storage, `projects/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }
  
      if (formData.id) {
        // Update project
        const docRef = doc(db, "projects", formData.id);
        await updateDoc(docRef, { ...formData, image: imageUrl });
        console.log("Project updated:", formData.id);
      } else {
        // Add new project
        await addDoc(collection(db, "projects"), { ...formData, image: imageUrl });
        console.log("New project added");
      }
  
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error adding/updating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        const docRef = doc(db, "projects", confirmDelete);
        await deleteDoc(docRef);
        console.log("Project deleted:", confirmDelete);
        fetchProjects();
        setConfirmDelete(null);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      details: "",
      technologies: [],
      link: "",
      image: "",
    });
    setImageFile(null);
    setIsEditing(false);
  };

  const startEdit = (project: Project) => {
    setFormData(project);
    setIsEditing(true);
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
          : "bg-gradient-to-b from-white to-gray-100 text-gray-800"
      }`}
      id="projects"
    >
      <motion.h2
        className="text-5xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Navigation]}
        className="mb-12"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <motion.div
              className={`relative rounded-xl overflow-hidden shadow-lg transform transition-transform ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p
                  className={`text-sm mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {project.description}
                </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`bg-blue-500 hover:bg-blue-600 text-white ${buttonStyles}`}
                    >
                      View Details
                    </button>
                  {user && ( 
                    <><button
                      onClick={() => startEdit(project)}
                      className={`bg-yellow-500 hover:bg-yellow-600 text-white ${buttonStyles}`}
                    >
                      Edit
                    </button><button
                      onClick={() => setConfirmDelete(project.id)}
                      className={`bg-red-500 hover:bg-red-600 text-white ${buttonStyles}`}
                    >
                        Delete
                      </button></>)}
                  </div>
                
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-blue-600 hover:underline"
                >
                  Visit Project
                </a>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {user && ( // Conditionally show Add button if user is logged in
        <motion.button
          className={`mt-12 mx-auto block bg-blue-500 hover:bg-blue-600 text-white ${buttonStyles}`}
          onClick={() => setIsEditing(true)}
        >
          Add New Project
        </motion.button>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`rounded-lg max-w-2xl w-full p-8 shadow-lg ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-bold mb-4">
                {selectedProject.title}
              </h3>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="mb-4">{selectedProject.details}</p>
              <div className="text-sm mb-4">
                <strong>Technologies:</strong>{" "}
                {selectedProject.technologies.join(", ")}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`bg-gray-500 text-white ${buttonStyles}`}
                >
                  Close
                </button>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-blue-500 text-white ${buttonStyles}`}
                >
                  Visit Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isEditing && (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">
        {formData.id ? "Edit Project" : "Add Project"}
      </h3>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
      >
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
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="block w-full p-3 border rounded mb-4"
          required
        />
        <textarea
          placeholder="Details"
          value={formData.details}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, details: e.target.value }))
          }
          className="block w-full p-3 border rounded mb-4"
        />
        <input
          type="url"
          placeholder="Project Link"
          value={formData.link}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, link: e.target.value }))
          }
          className="block w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="block w-full p-3 border rounded mb-4"
        />
        {formData.image && (
          <div className="mb-4">
            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-56 object-cover rounded"
            />
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className={`bg-gray-500 text-white ${buttonStyles}`}
            onClick={resetForm}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-blue-500 text-white ${buttonStyles}`}
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <span>Saving</span>
                <span className="loader w-4 h-4 border-2 border-t-blue-500 border-gray-300 rounded-full animate-spin"></span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  </motion.div>
)}

      {confirmDelete && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <p className="text-lg mb-4">
              Are you sure you want to delete this project?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className={`bg-gray-500 text-white ${buttonStyles}`}
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className={`bg-red-500 text-white ${buttonStyles}`}
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;