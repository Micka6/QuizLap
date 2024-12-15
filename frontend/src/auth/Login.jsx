import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";
import logo from "../assets/quizlapLogo.png";
import laptop from "../assets/auth/laptop2.png";

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages

  // Dummy accounts
  const teacherAccounts = [
    { email: "teacher@example.com", password: "teacher123", role: "teacher" },
    { email: "teacher1@example.com", password: "teacher123", role: "teacher" },
    { email: "teacher2@example.com", password: "teacher123", role: "teacher" }
  ];

  const studentAccounts = [
    { email: "student@example.com", password: "student123", role: "student" },
    { email: "student1@example.com", password: "student123", role: "student" },
    { email: "student2@example.com", password: "student123", role: "student" }
  ];

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    // Check if email and password match a teacher account
    const teacherMatch = teacherAccounts.find(
      (account) => account.email === email && account.password === password
    );

    // Check if email and password match a student account
    const studentMatch = studentAccounts.find(
      (account) => account.email === email && account.password === password
    );

    if (teacherMatch) {
      // If a teacher account is found, navigate to the teacher dashboard
      navigate("/teacher");
    } else if (studentMatch) {
      // If a student account is found, navigate to the student dashboard
      navigate("/student");
    } else {
      // Invalid credentials
      setError("Invalid email or password");
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
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
      <div className="basis-[60%] bg-blue-50 flex items-center justify-center p-12">
        <div className="w-full h-full flex flex-col justify-center text-center gap-6">
          <h2 className="text-4xl font-bold text-secondary">What’s new on likeminded.</h2>
          <div className="w-full flex justify-center">
            <p className="text-gray-600 mb-4 max-w-md">
              <span className="font-bold">Video calling feature is out! 😎</span>
              <br />
              Connect with your like-minded friends through video call & start the conversation about your favorite book, movie, music, etc...
            </p>
          </div>
          <img src={laptop} alt="Laptop and Phone Mockup" className="w-[45rem] mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Login;
