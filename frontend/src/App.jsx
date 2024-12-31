import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./auth/Login";
import Signup from "./auth/signup/SignupPage";
import StudentPage from "./pages/student/StudentPage";
import TeacherPage from "./pages/teacher/TeacherPage";
import ProtectedRoute from "./components/ProtectedRoute";
import './toast-modal.css'
import { ConfirmDialog } from "primereact/confirmdialog";

function Logout() {
  localStorage.clear();
  return <Navigate to="/landing" />;
}

const App = () => {
  return (
    <BrowserRouter>
    <ConfirmDialog />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TeacherPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <TeacherPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-All */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
