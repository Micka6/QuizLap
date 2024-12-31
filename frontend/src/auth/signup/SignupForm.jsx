import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/quizlapLogo.png";

const FormGroup = ({ label, id, type, placeholder, required, options, value, onChange, error, showBorder }) => {
  const inputBorderClass = showBorder ? (error ? "border-red-500" : "border-green-500") : "border-gray-500";

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
          className={`w-full p-2 border rounded-md focus:ring-secondary focus:border-blue-500 ${inputBorderClass}`}
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
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
        className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${inputBorderClass}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    userType: "",
    mobile: "09",
    password: "",
    confirmPassword: "",
    student_no: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // For mobile number input, enforce numeric-only typing and prepend "09" if not already present.
    if (id === "mobile") {
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      setFormData((prevData) => ({ ...prevData, [id]: sanitizedValue.startsWith("09") ? sanitizedValue : "09" }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }

    // Clear the error for the field when it changes
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^09\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateForm = () => {
    const validationErrors = {};

    // Password validation
    if (!validatePassword(formData.password)) {
      validationErrors.password =
        "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long.";
    }

    // Mobile number validation
    if (!validateMobileNumber(formData.mobile)) {
      validationErrors.mobile =
        "Mobile number must start with '09' and be 11 digits long.";
    }

    // Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    // Ensure required fields are filled
    if (!formData.firstName) validationErrors.firstName = "First name is required.";
    if (!formData.lastName) validationErrors.lastName = "Last name is required.";
    if (!formData.username) validationErrors.username = "Username is required.";
    if (!formData.email) validationErrors.email = "Email is required.";
    if (!formData.userType) validationErrors.userType = "User type is required.";
    if (formData.userType === "student" && !formData.student_no) {
      validationErrors.student_no = "Student number is required.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validateForm();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const payload = {
      user: {
        username: formData.username,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        is_teacher: formData.userType === "teacher",
        is_student: formData.userType === "student",
      },
    };
  
    if (formData.userType === "teacher") {
      payload.teacher_no = Math.floor(100000 + Math.random() * 900000);
    } else if (formData.userType === "student") {
      payload.student_no = formData.student_no;
    }
  
    try {
      const endpoint =
        formData.userType === "teacher"
          ? "http://localhost:8000/api/register/teacher/"
          : "http://localhost:8000/api/register/student/";
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
  
        // Map backend error keys to user-friendly messages
        const customErrors = {};
        if (errorData.user?.username) {
          customErrors.username = "Username already exists.";
        }
        if (errorData.user?.email) {
          customErrors.email = "Email already exists.";
        }
        if (errorData.student_no) {
          customErrors.student_no = "Student number already exists.";
        }
  
        // Add any other errors returned from the API
        if (Object.keys(customErrors).length === 0) {
          customErrors.general = "An error occurred while creating your account. Please try again.";
        }
  
        setErrors(customErrors);
        return;
      }
  
      // Navigate to login page after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Submission Error:", err);
  
      // Handle any other network or unexpected errors
      setErrors({
        general:
          "A network error occurred. Please check your connection and try again.",
      });
    }
  };
  

  const isFormComplete =
    formData.firstName &&
    formData.lastName &&
    formData.username &&
    formData.email &&
    formData.userType &&
    (formData.userType !== "student" || formData.student_no) &&
    formData.password &&
    formData.confirmPassword;

  return (
    <div className="w-full h-full flex flex-col bg-white p-6 overflow-y-auto">
      <div className="mb-4">
        <img className="w-32" src={logo} alt="QuizLap Logo" />
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create Your Free Account</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormGroup
            label="First Name"
            id="firstName"
            type="text"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            showBorder={submitted}
          />
          <FormGroup
            label="Last Name"
            id="lastName"
            type="text"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            showBorder={submitted}
          />
        </div>
        <FormGroup
          label="Username"
          id="username"
          type="text"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          showBorder={submitted}
        />
        <FormGroup
          label="Email Address"
          id="email"
          type="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          showBorder={submitted}
        />
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
            error={errors.userType}
            showBorder={submitted}
          />
          <FormGroup
            label="Mobile Number"
            id="mobile"
            type="tel"
            placeholder="Mobile Number"
            required
            value={formData.mobile}
            onChange={handleChange}
            error={errors.mobile}
            showBorder={submitted}
          />
        </div>
        {formData.userType === "student" && (
          <FormGroup
            label="Student Number"
            id="student_no"
            type="text"
            placeholder="Student Number"
            required
            value={formData.student_no}
            onChange={handleChange}
            error={errors.student_no}
            showBorder={submitted}
          />
        )}
        <div className="grid grid-cols-2 gap-4">
          <FormGroup
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            showBorder={submitted}
          />
          <FormGroup
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            showBorder={submitted}
          />
        </div>
        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
        <button
          type="submit"
          className={`w-full bg-secondary text-white font-bold py-3 rounded-md ${
            isFormComplete ? "hover:bg-gray-900" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isFormComplete}
        >
          Create Account
        </button>
      </form>
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
