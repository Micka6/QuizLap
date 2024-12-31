import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import api from '../../../api';
import CreateQuizModal from './CreateQuizModal';
import EditQuizModal from './EditQuizModal';
import { FaEye, FaTrash, FaEdit, FaDownload } from 'react-icons/fa';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';

const TeacherQuizzes = ({ selectedClass, goBack }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);
  const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);
  const [activeTab, setActiveTab] = useState('quizzes');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showEditQuizModal, setShowEditQuizModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentScoresModal, setShowStudentScoresModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    fetchStudents();
    fetchQuizzes();
  }, [selectedClass]);


  const fetchStudentScores = async (student) => {
    try {
      const response = await api.get(
        `/api/classcode/${selectedClass.class_code}/student/${student.student_no}/scores/`
      );
      const data = response.data;
      console.log('STUDENT AND THEIR SCORES: ', response.data)
      setSelectedStudent((prev) => ({ ...prev, scores: data }));
    } catch (err) {
      console.error("Failed to fetch student scores:", err);
      setError("Failed to fetch scores. Please try again.");
    }
  };
  

  const fetchQuizzes = async () => {
    try {
      const response = await api.get(`/api/classcode/${selectedClass.class_code}/quizzes/`);
      console.log(response.data); // Debug fetched data
      setQuizzes(response.data);
      
      console.error('FETCHING QUIZZES:', response.data);
      setError(null);
    } catch (err) {
      console.error('Fetch Quizzes Error:', err);
      
      console.error('FETCHING QUIZZES:', response.data);
      setError('Failed to fetch quizzes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/classcode/${selectedClass.class_code}/students/`);
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students. Please try again later.');
      console.error('Error fetching students:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQuiz = async (newQuiz) => {
    try {
      const response = await api.post(`/api/classcode/${selectedClass.class_code}/quizzes/`, newQuiz);
      setQuizzes((prevQuizzes) => [...prevQuizzes, response.data]);
      setShowCreateQuizModal(false);
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert('Failed to create quiz. Please try again.');
    }
  };

  const handleEditQuiz = async (updatedQuiz) => {
    try {
      const response = await api.put(`/api/classcode/${selectedClass.class_code}/quizzes/${updatedQuiz.id}/`, updatedQuiz);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) => (quiz.id === updatedQuiz.id ? response.data : quiz))
      );
      window.location.reload();
      setShowEditQuizModal(false);
    } catch (err) {
      console.error('Error updating quiz:', err);
      alert('Failed to update quiz. Please try again.');
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    confirmDialog({
      message: 'Are you sure you want to delete this quiz?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger customdelete-yes-button',
      accept: async () => {
        try {
          await api.delete(`/api/classcode/${selectedClass.class_code}/quizzes/${quizId}/`);
          setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'Quiz deleted successfully', life: 3000 });
        } catch (err) {
          console.error('Error deleting quiz:', err);
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete quiz. Please try again.', life: 3000 });
        }
      },
      reject: () => {
        toast.current.show({ severity: 'info', summary: 'Cancelled', detail: 'Quiz deletion cancelled', life: 3000 });
      }
    });
  };

  const getInitials = (firstName, lastName) => {
    return (
      (firstName ? firstName[0].toUpperCase() : '') +
      (lastName ? lastName[0].toUpperCase() : '')
    );
  };

  const openEditQuizModal = (quiz) => {
    console.log('Opening edit modal for quiz:', quiz);
    setSelectedQuiz(quiz);
    setShowEditQuizModal(true);
  };

  const closeEditQuizModal = () => {
    setShowEditQuizModal(false);
    setSelectedQuiz(null);
  };

  const downloadScores = async (quizId, format) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;
  
    try {
      const response = await api.get(`/api/classcode/${selectedClass.class_code}/quizzes/${quizId}/export/`);
      const studentResults = response.data;
  
      if (format === 'pdf') {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`Scores for ${quiz.quiz_name}`, 105, 20, null, null, 'center');
  
        const headers = ['No.', 'Student Name', 'Student Number', 'Score', 'Total Items'];
        let y = 50;
  
        doc.setFont("helvetica", "bold");
        doc.setFillColor(200, 200, 200);
        doc.rect(10, y - 6, 190, 10, 'F');
  
        headers.forEach((header, index) => {
          doc.text(header, 12 + index * 40, y);
        });
  
        y += 10;
        doc.setFont("helvetica", "normal");
  
        studentResults.forEach((student, index) => {
          doc.text(`${index + 1}`, 12, y);
          doc.text(student.name, 30, y);
          doc.text(student.student_no, 100, y);
          doc.text(`${student.score}`, 160, y);
          doc.text(`${student.total_items}`, 200, y);
          y += 10;
        });
  
        doc.save(`${quiz.quiz_name}_Scores.pdf`);
      } else if (format === 'csv') {
        const headers = ['No.', 'Student Name', 'Student Number', 'Score', 'Total Items'];
        const rows = studentResults.map((student, index) => [
          index + 1,
          student.name,
          student.student_no,
          student.score,
          student.total_items,
        ]);
  
        const csvContent = [
          headers.join(','),
          ...rows.map(row => row.join(',')),
        ].join('\n');
  
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${quiz.quiz_name}_Scores.csv`);
      }
    } catch (error) {
      console.error('Error exporting scores:', error);
      alert('Failed to export scores. Please try again.');
    }
  };
  

  const openStudentScoresModal = (student) => {
    setSelectedStudent(student);
    fetchStudentScores(student);
    setShowStudentScoresModal(true);
  };

  const closeStudentScoresModal = () => {
    setSelectedStudent(null);
    setShowStudentScoresModal(false);
  };

  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-full h-full flex justify-center items-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-full p-6">
      <Toast ref={toast} />
      <div className="flex justify-between items-center mb-6">
        <button className="text-lg font-bold text-blue-900 hover:underline" onClick={goBack}>
          &lt; Back to Classes
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{selectedClass.subject_name}</h1>
        <button
          className="bg-blue-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
          onClick={() => setShowCreateQuizModal(true)}
        >
          Create a quiz
        </button>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'quizzes' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-500'}`}
          onClick={() => setActiveTab('quizzes')}
        >
          Quizzes
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'students' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-500'}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
      </div>

      {activeTab === 'quizzes' ? (
        <div>
          {quizzes.length === 0 ? (
            <p className="text-gray-500">No quizzes yet. Create your first quiz!</p>
          ) : (
            quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-4 bg-indigo-900 text-white rounded-lg shadow-md mb-4 hover:ring-2 hover:ring-blue-500 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="flex justify-center items-center w-12 h-12 bg-indigo-800 rounded-full">
                    <span className="text-lg font-bold">{quiz.total_items}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{quiz.quiz_name}</h3>
                    <p className="text-sm">
                      Start: {new Date(quiz.start_date).toLocaleString()} - End: {new Date(quiz.end_date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-white text-indigo-900 px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition"
                    onClick={() => openEditQuizModal(quiz)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-400 transition"
                    onClick={() => handleDeleteQuiz(quiz.id)}
                  >
                    <FaTrash />
                  </button>
                  <div className="relative">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-400 transition"
                      onClick={() => setActiveDropdown(activeDropdown === quiz.id ? null : quiz.id)}
                    >
                      <FaDownload />
                    </button>
                    {activeDropdown === quiz.id && (
                      <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-40 z-10" style={{ left: '-7rem' }}>
                        <button
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left w-full"
                          onClick={() => downloadScores(quiz.id, 'csv')}
                        >
                          Download as CSV
                        </button>
                        <button
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left w-full"
                          onClick={() => downloadScores(quiz.id, 'pdf')}
                        >
                          Download as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          {students.length === 0 ? (
            <p className="text-gray-500">No students have joined this class yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Student Number</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                            {getInitials(student.first_name, student.last_name)}
                          </div>
                          <span>{`${student.first_name} ${student.last_name}`}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-b">{student.student_no}</td>
                      <td className="px-4 py-2 border-b">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition"
                        onClick={() => openStudentScoresModal(student)}
                      >
                        View Scores
                      </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showCreateQuizModal && (
        <CreateQuizModal
          isOpen={showCreateQuizModal}
          selectedClass={selectedClass}
          onSave={[handleCreateQuiz]}
          onClose={() => setShowCreateQuizModal(false)}
        />
      )}

      {showEditQuizModal && selectedQuiz && (
        <EditQuizModal
          isOpen={showEditQuizModal}
          onClose={closeEditQuizModal}
          quiz={selectedQuiz}
          onSave={[handleEditQuiz]}
          selectedClass={selectedClass}
        />
      )}

      {showStudentScoresModal && selectedStudent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-md relative">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {`${selectedStudent.first_name} ${selectedStudent.last_name}'s Scores`}
            </h2>
            <div className="max-h-[300px] overflow-y-auto">
              <ul className="space-y-2">
                              {quizzes.map((quiz) => {
                  const score = selectedStudent.scores?.find((s) => s.quiz_id === quiz.id);
                  return (
                    <li key={quiz.id} className="flex justify-between items-center">
                      <span>{quiz.quiz_name}</span>
                      <span className="font-semibold">
                        {score ? `${score.score} / ${quiz.total_items}` : 'Not taken'}
                      </span>
                    </li>
                  );
                })}

              </ul>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeStudentScoresModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherQuizzes;

