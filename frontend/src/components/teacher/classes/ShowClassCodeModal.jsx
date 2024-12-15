import React from 'react';
import { FaTimes, FaCopy } from 'react-icons/fa'; // Close and Copy icons

const ShowClassCodeModal = ({ classCode, onClose }) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(classCode);
    alert('Class code copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={22} />
        </button>

        {/* Modal Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide">
          Class Code
        </h2>

        {/* Class Code Display */}
        <div className="flex justify-center items-center mb-6">
          <div className="bg-gray-50 text-indigo-900 px-8 py-4 rounded-xl text-2xl font-semibold shadow-sm border border-gray-200">
            {classCode}
          </div>

          {/* Copy Icon */}
          <button
            onClick={handleCopyCode}
            className="ml-4 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            <FaCopy size={18} />
          </button>
        </div>

        {/* Close Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition duration-200 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowClassCodeModal;
