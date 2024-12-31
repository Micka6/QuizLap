import React, { useState, useEffect, useRef } from 'react';
import api from '../../../api'; // Ensure correct path
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';

const EditClassModal = ({ classToEdit, onEdit, onClose }) => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [classCode, setClassCode] = useState('');
  const toast = useRef(null); // Toast reference

  useEffect(() => {
    if (classToEdit) {
      setSubjectCode(classToEdit.subject_code);
      setSubjectName(classToEdit.subject_name);
      setClassCode(classToEdit.class_code);
    }
  }, [classToEdit]);

  const handleEditClass = async () => {
    if (subjectCode && subjectName) {
      // Show confirmation dialog before updating
      confirmDialog({
        message: 'Are you sure you want to update this class?',
        header: 'Update Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptClassName: "custom-accept-button custom-yes-button",
        accept: async () => {
          try {
            const response = await api.put(`/api/classcode/${classToEdit.class_code}/`, {
              subject_code: subjectCode,
              subject_name: subjectName,
              class_code: classCode,
            });

            // Remove setTimeout to verify if the toast works immediately
            toast.current.show({
              severity: 'success',
              summary: 'Success',
              detail: 'Class updated successfully',
              life: 3000,
            });

            onEdit(response.data);
            onClose();

          } catch (error) {
            console.error('Error updating class:', error);

            // Remove setTimeout to verify if the toast works immediately
            toast.current.show({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update class. Please try again.',
              life: 3000,
            });
          }
        },
        reject: () => {
          toast.current.show({
            severity: 'warn',
            summary: 'Cancelled',
            detail: 'Class update operation cancelled',
            life: 3000,
          });
        },
      });
    } else {
      toast.current.show({
        severity: 'warn',
        summary: 'Missing Information',
        detail: 'Please fill in all fields.',
        life: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <Toast ref={toast} /> {/* Ensure Toast component is here */}

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
          />
        </div>

        {/* Subject Name */}
        <div className="flex items-center mb-6">
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
        <div className="flex items-center mb-4">
          <label className="bg-indigo-900 px-4 py-3 rounded-l-lg text-sm text-white w-1/3">
            Class Code
          </label>
          <input
            type="text"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            disabled
            className="border border-gray-300 p-2 flex-1 rounded-r-lg"
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
