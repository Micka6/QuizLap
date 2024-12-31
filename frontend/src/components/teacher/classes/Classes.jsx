import React, { useState, useEffect, useRef } from 'react';
import api from '../../../api'; // Ensure correct path
import CreateClassModal from './CreateClassModal';
import ShowClassCodeModal from './ShowClassCodeModal';
import EditClassModal from './EditClassModal';
import TeacherQuizzes from './TeacherQuizzes';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';

const Classes = () => {
  const toast = useRef(null); // Toast reference
  const [showModal, setShowModal] = useState(false);
  const [showClassCodeModal, setShowClassCodeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [classCodeToShow, setClassCodeToShow] = useState('');
  const [classToEdit, setClassToEdit] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/classcode/');
      setClasses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch classes. Please try again later.');
      console.error('Error fetching classes:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteClass = (classCode) => {
    confirmDialog({
      message: 'Are you sure you want to delete this class?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: "customdelete-yes-button",
      accept: async () => {
        try {
          // Send DELETE request to delete the class
          await api.delete(`/api/classcode/${classCode}/`);
  
          // Show success toast
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Class deleted successfully',
            life: 3000,
          });
  
          // Fetch classes after showing the toast
          setTimeout(() => {
            fetchClasses();
          }, 500); // Adjust delay to allow the toast to show first
  
        } catch (err) {
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete class. Please try again.',
            life: 3000,
          });
          console.error('Error deleting class:', err);
        }
      },
      reject: () => {
        toast.current.show({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'Delete operation cancelled',
          life: 3000,
        });
      },
    });
  };
  
  

  const handleShowClassCode = (classCode) => {
    setClassCodeToShow(classCode);
    setShowClassCodeModal(true);
  };

  const handleEditClass = async (editedClass) => {
    try {
      const response = await api.put(`/api/classcode/${editedClass.class_code}/`, editedClass);
      fetchClasses();
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Class updated successfully', life: 3000 });
      setShowEditModal(false);
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update class. Please try again.', life: 3000 });
      console.error('Error updating class:', err);
    }
  };

  const colors = ['#0E79B2', '#F4A261', '#2A9D8F', '#E76F51', '#264653', '#E9C46A'];

  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-full h-full flex justify-center items-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-full p-6 bg-gray-100">
      <Toast ref={toast} />

      {!selectedClass ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
            <button
              className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              onClick={() => setShowModal(true)}
            >
              Create Class
            </button>
          </div>

          {classes.length === 0 ? (
            <div className="w-full h-1/2 flex justify-center items-center text-gray-600 font-medium">
              No classes created yet. Start by creating a class.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classes.map((classItem, index) => {
                const backgroundColor = colors[index % colors.length];
                return (
                  <div
                    key={classItem.class_code}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer relative"
                    onClick={() => setSelectedClass(classItem)}
                  >
                    <div
                      className="p-6 text-white text-center rounded-t-lg"
                      style={{ backgroundColor }}
                    >
                      <div className="text-3xl font-semibold">{classItem.subject_code}</div>
                      <div className="text-lg mt-2 font-medium">{classItem.subject_name}</div>
                    </div>

                    <div className="absolute top-3 right-3 flex space-x-3">
                      <FaEye
                        className="text-white cursor-pointer hover:text-blue-800 transition duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowClassCode(classItem.class_code);
                        }}
                      />
                      <FaTrash
                        className="text-white cursor-pointer hover:text-red-800 transition duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClass(classItem.class_code);
                        }}
                      />
                      <FaEdit
                        className="text-white cursor-pointer hover:text-yellow-800 transition duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setClassToEdit(classItem);
                          setShowEditModal(true);
                        }}
                      />
                    </div>

                    <div className="p-4 text-center">
                      <p className="text-gray-800 text-sm font-semibold">
                        Students: <span className="font-normal">{classItem.student_count}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <TeacherQuizzes
          selectedClass={selectedClass}
          goBack={() => setSelectedClass(null)}
        />
      )}

      {showModal && (
        <CreateClassModal
          fetchClasses={fetchClasses}
          onClose={() => setShowModal(false)}
        />
      )}

      {showClassCodeModal && (
        <ShowClassCodeModal classCode={classCodeToShow} onClose={() => setShowClassCodeModal(false)} />
      )}

      {showEditModal && (
        <EditClassModal
          classToEdit={classToEdit}
          onEdit={handleEditClass}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Classes;
