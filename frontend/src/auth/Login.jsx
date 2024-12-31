import React, { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import logo from "../assets/quizlapLogo.png";
import paper from "../assets/auth/login.png";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  // State for email and password
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate


  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors
  
    try {
      // Authenticate and retrieve tokens
      const res = await api.post("/api/token/", { username, password });
      const accessToken = res.data.access;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      const decodedToken = jwtDecode(res.data.access);
      localStorage.setItem("first_name", decodedToken.first_name);
      localStorage.setItem("last_name", decodedToken.last_name);

      // Decode token to get user role
      const decoded = jwtDecode(accessToken); 
      console.log(decoded); // Check the structure of the decoded token

      const isTeacher = decoded.is_teacher 
      const isStudent = decoded.is_student


      // Navigate to the correct page based on role
      if (isTeacher) {
        navigate("/teacher");
      } else if (isStudent) {
        navigate("/student");
      } else {
        setError("User role not recognized. Please contact support.");
      }
    } catch (error) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-y-auto">
      {/* Left Section - Login Form */}
      <div className="basis-[40%] bg-white p-8 flex flex-col">
        <div className="flex justify-between items-center">
          {/* Logo with navigation */}
          <img
            src={logo}
            alt="Logo"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")} // Navigate to landing page
          />
        </div>

        {/* Login Content */}
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="w-full h-full flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome back</h1>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username or Email
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username or Email"
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-white font-bold py-3 rounded-md hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </form>

            {/* Links */}
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <button
                onClick={() => navigate("/signup")} // Navigate to the signup page
                className="hover:underline text-secondary font-medium"
              >
                Create an account
              </button>
              <Link to="/" className="hover:underline">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Info */}
      <div className="basis-[60%] bg-logsign flex items-center justify-center p-16">
        <div className="w-full h-full flex flex-col justify-center text-center gap-6">
          <h2 className="text-4xl font-bold text-secondary">What’s new on likeminded.</h2>
          <img src={paper} alt="Laptop and Phone Mockup" className="max-w-full max-h-[70%] mx-auto mt-6" />
        </div>
      </div>
    </div>
  );
};

export default Login;
