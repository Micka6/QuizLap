import React, { useState } from 'react';
import api from '../../../api';

// Helper function to generate a random class code
const generateClassCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const CreateClassModal = ({ fetchClasses, onClose }) => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [classCode] = useState(generateClassCode()); // Fixed class code
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateClassCode = async (e) => {
    e.preventDefault();

    if (!subjectCode || !subjectName) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/api/classcode/', {
        class_code: classCode,
        subject_code: subjectCode,
        subject_name: subjectName,
      });

      if (response.status === 201) {
        alert('Classroom created successfully!');
        fetchClasses(); // Refresh class list
        onClose();
      } else {
        alert('Failed to create class.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Create a Class</h2>
        <p className="text-center mb-6">Fill out the form below to create a new class</p>

        <div className="flex items-center mb-4">
          <label className="bg-indigo-900 px-4 py-3 rounded-l-lg text-sm text-white w-1/3">
            Subject Code
          </label>
          <input
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className="border border-gray-300 p-2 flex-1 rounded-r-lg"
            placeholder="Enter subject code"
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="bg-indigo-900 px-4 py-3 rounded-l-lg text-sm text-white w-1/3">
            Subject Name
          </label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="border border-gray-300 p-2 flex-1 rounded-r-lg"
            placeholder="Enter subject name"
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="bg-indigo-900 px-4 py-3 rounded-l-lg text-sm text-white w-1/3">
            Class Code
          </label>
          <input
            type="text"
            value={classCode}
            disabled
            className="border border-gray-300 p-2 flex-1 rounded-r-lg"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 mr-2"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateClassCode}
            className="px-4 py-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Class'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClassModal;
