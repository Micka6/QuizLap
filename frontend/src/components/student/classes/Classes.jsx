import React, { useState } from 'react';
import Quizzes from '../Quizzes/Quizzes';
import JoinClassModal from '../dashboard/JoinClassModal';

const Classes = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [classCode, setClassCode] = useState(''); // Class code input
  const [subjects, setSubjects] = useState([
    { name: 'Automation Testing', subjectCode: 'IT101', teacher: 'Ruel Paraiso' },
    { name: 'SOSAD TALAGA', subjectCode: 'ENG202', teacher: 'Aaron Dela Rosa' },
    { name: 'Try trylang', subjectCode: 'BIO303', teacher: 'Allan Iverson Reyes' },
  ]);

  const handleSubjectClick = (subjectName) => {
    setSelectedSubject(subjectName); // Set the clicked subject name
  };

  const handleJoinClass = () => {
    const dummyCodeMapping = {
      '12345': { name: 'New Subject 1', subjectCode: 'NEW101', teacher: 'John Doe' },
      '67890': { name: 'New Subject 2', subjectCode: 'NEW102', teacher: 'Jane Smith' },
    };

    if (classCode.trim() && dummyCodeMapping[classCode]) {
      // Add the new subject if the code matches a dummy entry
      setSubjects((prevSubjects) => [...prevSubjects, dummyCodeMapping[classCode]]);
      alert(`Class "${dummyCodeMapping[classCode].name}" added successfully!`);
      setShowModal(false); // Close the modal
      setClassCode(''); // Reset the input
    } else {
      alert('Invalid class code! Please try again.');
    }
  };

  const colors = ['#0E79B2', '#F4A261', '#2A9D8F', '#E76F51', '#264653', '#E9C46A'];

  return (
    <div className="w-full h-full p-6 bg-gray-100">
      {!selectedSubject ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Classes</h1>
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-full"
              onClick={() => setShowModal(true)}
            >
              Join Class
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              const backgroundColor = colors[index % colors.length];
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={() => handleSubjectClick(subject.name)}
                >
                  {/* Top Section: Color Background */}
                  <div
                    className="p-6 text-white text-center"
                    style={{ backgroundColor }}
                  >
                    <div className="text-3xl font-semibold">{subject.subjectCode}</div>
                    <div className="text-base mt-1">{subject.name}</div>
                  </div>

                  {/* Bottom Section: Teacher Info */}
                  <div className="p-4 text-center">
                    <p className="text-gray-700 text-sm font-medium">
                      Teacher: <span className="font-normal">{subject.teacher}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Quizzes
          subject={selectedSubject}
          goBack={() => setSelectedSubject(null)} // Function to go back
        />
      )}

      {showModal && (
        <JoinClassModal
          classCode={classCode}
          setClassCode={setClassCode}
          onJoin={handleJoinClass}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Classes;
