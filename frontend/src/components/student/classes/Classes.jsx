import React, { useState, useEffect } from 'react';
import api from '../../../api'; // Make sure this path is correct
import Quizzes from '../Quizzes/Quizzes';
import JoinClassModal from '../dashboard/JoinClassModal';

const Classes = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/student/classes/');
      setClasses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch classes. Please try again later.');
      console.error('Error fetching classes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleJoinClass = async () => {
    try {
      const response = await api.post('/api/student/join-class/', { class_code: classCode });
      setClasses((prevClasses) => [...prevClasses, response.data]);
      alert(`Class "${response.data.subject_name}" joined successfully!`);
      setShowModal(false);
      setClassCode('');
    } catch (err) {
      alert('Failed to join class. Please check the class code and try again.');
      console.error('Error joining class:', err);
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
          {classes.length === 0 ? (
            <div className="text-center text-gray-500">You have not joined any classes yet. Join a class to get started!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classes.map((subject, index) => {
                const backgroundColor = colors[index % colors.length];
                return (
                  <div
                    key={subject.class_code}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => handleSubjectClick(subject)}
                  >
                    <div
                      className="p-6 text-white text-center"
                      style={{ backgroundColor }}
                    >
                      <div className="text-3xl font-semibold">{subject.subject_code}</div>
                      <div className="text-base mt-1">{subject.subject_name}</div>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-gray-700 text-sm font-medium">
                        Teacher: <span className="font-normal">{subject.teacher_name}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Quizzes
          subject={selectedSubject}
          goBack={() => setSelectedSubject(null)}
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
