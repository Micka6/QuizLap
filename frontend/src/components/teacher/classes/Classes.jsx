import React, { useState } from 'react';
import CreateClassModal from './CreateClassModal';
import ShowClassCodeModal from './ShowClassCodeModal';
import EditClassModal from './EditClassModal';
import TeacherQuizzes from './TeacherQuizzes'; // Import the TeacherQuizzes component
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';

const Classes = () => {
  const [showModal, setShowModal] = useState(false);
  const [showClassCodeModal, setShowClassCodeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [classCodeToShow, setClassCodeToShow] = useState('');
  const [classToEdit, setClassToEdit] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null); // Track the selected class for quizzes

  const [subjects, setSubjects] = useState([
    { name: 'Automation Testing', subjectCode: 'IT101', studentCount: 25, classCode: '11111' },
    { name: 'SOSAD TALAGA', subjectCode: 'ENG202', studentCount: 30, classCode: '22222' },
    { name: 'Try trylang', subjectCode: 'BIO303', studentCount: 20, classCode: '33333' },
  ]);

  const handleCreateClass = (newClass) => {
    setSubjects((prevSubjects) => [...prevSubjects, newClass]);
    alert(`Class "${newClass.name}" added successfully!`);
    setShowModal(false);
  };

  const handleDeleteClass = (subjectCode) => {
    const updatedSubjects = subjects.filter((subject) => subject.subjectCode !== subjectCode);
    setSubjects(updatedSubjects);
    alert('Class deleted successfully!');
  };

  const handleShowClassCode = (classCode) => {
    setClassCodeToShow(classCode);
    setShowClassCodeModal(true);
  };

  const handleEditClass = (editedClass) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.subjectCode === editedClass.subjectCode ? editedClass : subject
    );
    setSubjects(updatedSubjects);
    alert('Class updated successfully!');
    setShowEditModal(false);
  };

  const colors = ['#0E79B2', '#F4A261', '#2A9D8F', '#E76F51', '#264653', '#E9C46A'];

  return (
    <div className="w-full h-full p-6 bg-gray-100">
      {!selectedClass ? (
        <>
          {/* Classes View */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
            <button
              className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              onClick={() => setShowModal(true)}
            >
              Create Class
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              const backgroundColor = colors[index % colors.length];
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer relative"
                  onClick={() => setSelectedClass(subject)} // Navigate to quizzes
                >
                  {/* Top Section */}
                  <div
                    className="p-6 text-white text-center rounded-t-lg"
                    style={{ backgroundColor }}
                  >
                    <div className="text-3xl font-semibold">{subject.subjectCode}</div>
                    <div className="text-lg mt-2 font-medium">{subject.name}</div>
                  </div>

                  {/* Icons */}
                  <div className="absolute top-3 right-3 flex space-x-3">
                    <FaEye
                      className="text-white cursor-pointer hover:text-blue-800 transition duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowClassCode(subject.classCode);
                      }}
                    />
                    <FaTrash
                      className="text-white cursor-pointer hover:text-red-800 transition duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClass(subject.subjectCode);
                      }}
                    />
                    <FaEdit
                      className="text-white cursor-pointer hover:text-yellow-800 transition duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setClassToEdit(subject);
                        setShowEditModal(true);
                      }}
                    />
                  </div>

                  {/* Bottom Section */}
                  <div className="p-4 text-center">
                    <p className="text-gray-800 text-sm font-semibold">
                      Students: <span className="font-normal">{subject.studentCount}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Quizzes View */
        <TeacherQuizzes
          selectedClass={selectedClass}
          goBack={() => setSelectedClass(null)} // Go back to classes
        />
      )}

      {showModal && (
        <CreateClassModal onCreate={handleCreateClass} onClose={() => setShowModal(false)} />
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
