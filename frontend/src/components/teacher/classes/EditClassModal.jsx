import React, { useState, useEffect } from 'react';

const EditClassModal = ({ class: classToEdit, onEdit, onClose }) => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [maxStudents, setMaxStudents] = useState('');
  const [classCode] = useState(''); // Class code is not editable, so we'll leave it empty

  useEffect(() => {
    if (classToEdit) {
      setSubjectCode(classToEdit.subjectCode);
      setSubjectName(classToEdit.name);
      setMaxStudents(classToEdit.studentCount);
    }
  }, [classToEdit]);

  const handleEditClass = () => {
    if (subjectCode && subjectName && maxStudents) {
      const updatedClass = {
        ...classToEdit,
        subjectCode,
        name: subjectName,
        studentCount: maxStudents,
      };
      onEdit(updatedClass); // Pass the updated class to the parent function
      onClose(); // Close the modal after editing
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Class</h2>
        <p className="text-center mb-6">Modify the class details below</p>

        {/* Subject Code */}
        <div className="flex items-center mb-4">
          <label className="bg-indigo-900 px-4 py-3 rounded-l-lg text-sm text-white w-1/3">Subject Code</label>
          <input
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className="border border-gray-300 p-2 flex-1 rounded-r-lg"
            placeholder="Enter subject code"
            disabled // Subject code is not editable
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

        {/* Max Students */}
        <div className="flex items-center mb-6">
          <label className="bg-indigo-900 px-4 py-3 rounded-l-lg text-sm text-white w-1/3">Max Students</label>
          <input
            type="number"
            value={maxStudents}
            onChange={(e) => setMaxStudents(e.target.value)}
            className="border border-gray-300 p-2 flex-1 rounded-r-lg"
            placeholder="Enter max number of students"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button onClick={handleEditClass} className="px-4 py-2 bg-indigo-900 text-white rounded-full">
            Update Class
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClassModal;
