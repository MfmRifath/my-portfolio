import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const navigate = useNavigate(); // Initialize navigate

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/"); // Redirect to /dashboard after successful login
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center px-4 ${
        isDarkTheme
          ? "bg-gradient-to-br from-black via-gray-900 to-blue-900"
          : "bg-gradient-to-br from-gray-200 via-blue-100 to-blue-300"
      }`}
    >
      {/* Decorative Background */}
      {isDarkTheme ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-900 to-black opacity-20 rounded-full blur-3xl animate-pulse"></div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-blue-200 to-gray-100 opacity-40 rounded-full blur-3xl"></div>
        </>
      )}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-3 rounded-full ${
          isDarkTheme
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-blue-200 text-black hover:bg-blue-300"
        } shadow-md`}
      >
        {isDarkTheme ? "☀️" : "🌙"}
      </button>

      {/* Login Card */}
      <div
        className={`relative z-10 w-full max-w-4xl ${
          isDarkTheme
            ? "bg-black/90 text-white"
            : "bg-white/90 text-gray-800"
        } backdrop-blur-md rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row`}
      >
        {/* Profile Section */}
        <div
          className={`md:w-1/2 flex items-center justify-center p-10 ${
            isDarkTheme
              ? "bg-gradient-to-b from-gray-800 to-black"
              : "bg-gradient-to-b from-blue-100 to-blue-200"
          }`}
        >
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-black blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
            <img
              src="/profileimg.png"
              alt="Rifath"
              className="relative z-10 w-36 h-36 rounded-full shadow-xl transition-transform transform group-hover:scale-110 duration-300"
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold">RIFATH MFM</h2>
            <p className="text-sm mt-2">Full Stack Developer</p>
            <p className="text-xs mt-2 text-gray-400">
              Building scalable, intuitive apps with cutting-edge tech.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-10">
          <h2 className="text-3xl font-extrabold text-center text-blue-500">
            Welcome Back
          </h2>
          <p className="text-sm text-center mt-2 text-gray-400">
            Log in to access your dashboard
          </p>

          {error && (
            <div className="mt-4 px-4 py-2 text-sm text-red-700 bg-red-100 rounded-md border border-red-400">
              {error}
            </div>
          )}

          <form className="mt-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter email"
                  required
                />
                <span className="absolute left-3 top-3 text-gray-500">📧</span>
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter password"
                  required
                />
                <span className="absolute left-3 top-3 text-gray-500">🔒</span>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-500 hover:text-blue-500"
                >
                  {passwordVisible ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <a href="#" className="text-blue-500 hover:underline text-sm">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg ${
                loading
                  ? "bg-blue-300"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;