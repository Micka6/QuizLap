import React, { useState } from "react";

// Helper function to generate a random class code
const generateClassCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a random 5-digit code
};

const CreateClassModal = ({ onCreate, onClose }) => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [classCode] = useState(generateClassCode()); // No need for setClassCode

  const handleCreateClass = () => {
    if (subjectCode && subjectName) {
      const newClass = {
        name: subjectName,
        subjectCode: subjectCode,
        studentCount: 0, // Initial student count is 0
        classCode: classCode
      };
      onCreate(newClass); // Pass the new class object to the parent function
      onClose(); // Close the modal after creating the class
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Create a Class</h2>
        <p className="text-center mb-6">Fill out the form below to create a new class</p>

        {/* Subject Code */}
        <div className="flex items-center mb-4">
          <label className="bg-indigo-900 px-4 py-3 rounded-l-lg text-sm text-white w-1/3">Subject Code</label>
          <input
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className="border border-gray-300 p-2 flex-1 rounded-r-lg"
            placeholder="Enter subject code"
          />
        </div>

        {/* Subject Name */}
        <div className="flex items-center mb-4">
          <label className="bg-indigo-900 px-4 py-3 rounded-l-lg text-sm text-white w-1/3">Subject Name</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="border border-gray-300 p-2 flex-1 rounded-r-lg"
            placeholder="Enter subject name"
          />
        </div>

        {/* Class Code */}
        <div className="flex items-center mb-6">
          <label className="bg-indigo-900 px-4 py-2 rounded-l-lg text-white w-1/3">Class Code</label>
          <input
            type="text"
            value={classCode}
            readOnly
            className="border border-gray-300 p-2 flex-1 rounded-r-lg bg-gray-100"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button onClick={handleCreateClass} className="px-4 py-2 bg-indigo-900 text-white rounded-full">
            Create Class
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClassModal;
