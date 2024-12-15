import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/quizlapLogo.png";

const FormGroup = ({ label, id, type, placeholder, required, options, value, onChange }) => {
  if (type === "select") {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-sm font-medium text-secondary mb-1">
          {label}
        </label>
        <select
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-md focus:ring-secondary focus:border-blue-500"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

const SignupForm = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // Update form data
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Check if all fields are filled
  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.userType &&
    formData.mobile &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword; // Ensure passwords match

  return (
    <div className="w-full h-full flex flex-col bg-white p-6 overflow-y-auto">
      {/* Logo */}
      <div className="mb-4">
        <img className="w-32" src={logo} alt="QuizLap Logo" />
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create Your Free Account</h1>
        <p className="text-gray-600 mt-2">
          Join likeminded people to connect with others and discover amazing
          resources tailored to you.
        </p>
      </div>

      {/* Form */}
      <form action="#" className="space-y-6">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <FormGroup
            label="First Name"
            id="firstName"
            type="text"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <FormGroup
            label="Last Name"
            id="lastName"
            type="text"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Email Address */}
        <FormGroup
          label="Email Address"
          id="email"
          type="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
        />

        {/* User Type & Mobile Number */}
        <div className="grid grid-cols-2 gap-4">
          <FormGroup
            label="User Type"
            id="userType"
            type="select"
            placeholder="Select your role"
            required
            options={[
              { value: "teacher", label: "Teacher" },
              { value: "student", label: "Student" },
            ]}
            value={formData.userType}
            onChange={handleChange}
          />
          <FormGroup
            label="Mobile Number"
            id="mobile"
            type="tel"
            placeholder="Mobile Number"
            required
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-2 gap-4">
          <FormGroup
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <FormGroup
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-secondary text-white font-bold py-3 rounded-md ${
            isFormValid ? "hover:bg-gray-900" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => navigate("/login")}
          disabled={!isFormValid}
        >
          Create Account
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-secondary hover:underline font-medium"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
