import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import CreateQuizModal from './CreateQuizModal';
import EditQuizModal from './EditQuizModal';

const TeacherQuizzes = ({ selectedClass, goBack }) => {
  const [quizzes, setQuizzes] = useState([
    {
      title: 'Quiz 1: Programming Basics',
      deadline: { date: '2024-12-31', time: '12:00' },
      instructions: 'Complete all questions. Ensure you review before submission.',
      totalItems: 10,
      studentsTaken: 8,
      questions: [
        { type: 'Short Answer', question: 'What is JavaScript?', correctAnswer: 'A programming language' },
        { type: 'Short Answer', question: 'What is a variable?', correctAnswer: 'A container for data' },
      ],
    },
    {
      title: 'Quiz 2: Advanced JavaScript',
      deadline: { date: '2025-01-15', time: '16:00' },
      instructions: 'Focus on the key concepts covered in class.',
      totalItems: 15,
      studentsTaken: 10,
      questions: [
        { type: 'Short Answer', question: 'What is closure?', correctAnswer: 'A function with access to its own scope' },
        {
          type: 'Multiple Choice',
          question: 'What is a promise?',
          correctAnswer: 'An object representing the eventual completion of an asynchronous operation',
          choices: [
            'A function that resolves values',
            'A syntax for exception handling',
            'An object representing the eventual completion of an asynchronous operation',
            'A way to loop through arrays',
          ],
        },
      ],
    },
  ]);

  const [students, setStudents] = useState([
    {
      name: 'Justine James Medina',
      studentNumber: '2020103523',
      scores: [
        { quiz: 'Quiz 1: Programming Basics', score: 9 },
        { quiz: 'Quiz 2: Advanced JavaScript', score: 6 },
        { quiz: 'Quiz 1: Programming Basics', score: 9 },
        { quiz: 'Quiz 2: Advanced JavaScript', score: 6 },
        { quiz: 'Quiz 1: Programming Basics', score: 9 },
        { quiz: 'Quiz 2: Advanced JavaScript', score: 6 },
        { quiz: 'Quiz 1: Programming Basics', score: 9 },
        { quiz: 'Quiz 2: Advanced JavaScript', score: 6 },
        { quiz: 'Quiz 1: Programming Basics', score: 9 },
        { quiz: 'Quiz 2: Advanced JavaScript', score: 6 },
        { quiz: 'Quiz 1: Programming Basics', score: 9 },
        { quiz: 'Quiz 2: Advanced JavaScript', score: 6 },
      ],
    },
    {
      name: 'Christian Adrian Medina',
      studentNumber: '2020103524',
      scores: [
        { quiz: 'Quiz 1: Programming Basics', score: 8 },
        { quiz: 'Quiz 2: Advanced JavaScript', score: 11 },
      ],
    },
  ]);

  const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);
  const [activeTab, setActiveTab] = useState('quizzes');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showEditQuizModal, setShowEditQuizModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentScoresModal, setShowStudentScoresModal] = useState(false);

  const handleCreateQuiz = (newQuiz) => {
    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
    setShowCreateQuizModal(false);
  };

  const handleEditQuiz = (updatedQuiz) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) => (quiz.title === updatedQuiz.title ? updatedQuiz : quiz))
    );
    setShowEditQuizModal(false);
  };

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    return (
      nameParts[0][0].toUpperCase() +
      (nameParts[nameParts.length - 1][0] ? nameParts[nameParts.length - 1][0].toUpperCase() : '')
    );
  };

  const openEditQuizModal = (quiz) => {
    setSelectedQuiz(quiz);
    setShowEditQuizModal(true);
  };

  const closeEditQuizModal = () => {
    setShowEditQuizModal(false);
    setSelectedQuiz(null);
  };

  const downloadScores = (quizTitle, format) => {
    const quiz = quizzes.find((q) => q.title === quizTitle);
    if (!quiz) return;

    if (format === 'pdf') {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(`Scores for ${quizTitle}`, 105, 20, null, null, 'center');

      doc.setFontSize(12);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);
      doc.text(`Time: ${new Date().toLocaleTimeString()}`, 10, 40);

      const headers = ['No.', 'Student Name', 'Student Number', 'Score', 'Total Items'];
      let y = 50;

      doc.setFont("helvetica", "bold");
      doc.setFillColor(200, 200, 200);
      doc.rect(10, y - 6, 190, 10, 'F');

      doc.text('No.', 12, y);
      doc.text('Student Name', 30, y);
      doc.text('Student Number', 100, y);
      doc.text('Score', 160, y);
      doc.text('Total Items', 180, y);

      y += 10;
      doc.setFont("helvetica", "normal");

      students.forEach((student, index) => {
        const studentScore = student.scores.find((score) => score.quiz === quizTitle);

        doc.text(`${index + 1}`, 12, y);
        doc.text(student.name, 30, y);
        doc.text(student.studentNumber, 100, y);
        doc.text(studentScore ? `${studentScore.score}` : 'Not Taken', 160, y);
        doc.text(`${quiz.totalItems}`, 180, y);

        y += 10;
      });

      doc.save(`${quizTitle} Scores.pdf`);
    } else if (format === 'csv') {
      const headers = ['No.', 'Student Name', 'Student Number', 'Score', 'Total Items'];
      const rows = students.map((student, index) => {
        const studentScore = student.scores.find((score) => score.quiz === quizTitle);
        return [
          index + 1,
          student.name,
          student.studentNumber,
          studentScore ? studentScore.score : 'Not Taken',
          quiz.totalItems
        ];
      });

      const csvContent = [
        `Quiz Title: ${quizTitle}`,
        '',
        headers.join(','),
        ...rows.map(row => row.join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${quizTitle} Scores.csv`);
    }
  };

  const openStudentScoresModal = (student) => {
    setSelectedStudent(student);
    setShowStudentScoresModal(true);
  };

  const closeStudentScoresModal = () => {
    setSelectedStudent(null);
    setShowStudentScoresModal(false);
  };

  return (
    <div className="w-full h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <button className="text-lg font-bold text-blue-900 hover:underline" onClick={goBack}>
          &lt; Back to Classes
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{selectedClass.name}</h1>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-400 transition duration-200"
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
            quizzes.map((quiz, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-indigo-900 text-white rounded-lg shadow-md mb-4 hover:ring-2 hover:ring-blue-500 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="flex justify-center items-center w-12 h-12 bg-indigo-800 rounded-full">
                    <span className="text-lg font-bold">{quiz.totalItems}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{quiz.title}</h3>
                    <p className="text-sm">
                      Students Taken: {quiz.studentsTaken}/{students.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-white text-indigo-900 px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition"
                    onClick={() => openEditQuizModal(quiz)}
                  >
                    Edit
                  </button>
                  <div className="relative">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-400 transition"
                      onClick={() => setActiveDropdown(activeDropdown === quiz.title ? null : quiz.title)}
                    >
                      Download Report
                    </button>
                    {activeDropdown === quiz.title && (
                      <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg w-40 z-10">
                        <button
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left w-full"
                          onClick={() => downloadScores(quiz.title, 'csv')}
                        >
                          Download as CSV
                        </button>
                        <button
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left w-full"
                          onClick={() => downloadScores(quiz.title, 'pdf')}
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
      ) : activeTab === 'students' ? (
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
                            {getInitials(student.name)}
                          </div>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-b">{student.studentNumber}</td>
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
      ) : null}

      {showCreateQuizModal && (
        <CreateQuizModal
          isOpen={showCreateQuizModal}
          onSave={handleCreateQuiz}
          onClose={() => setShowCreateQuizModal(false)}
        />
      )}

      {showEditQuizModal && selectedQuiz && (
        <EditQuizModal
          isOpen={showEditQuizModal}
          onClose={closeEditQuizModal}
          quiz={selectedQuiz}
        />
      )}

      {showStudentScoresModal && selectedStudent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-md relative">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selectedStudent.name}'s Scores</h2>
            <div className="max-h-[300px] overflow-y-auto">
              <ul className="space-y-2">
                {selectedStudent.scores.map((score, index) => {
                  const quiz = quizzes.find(q => q.title === score.quiz);
                  return (
                    <li key={index} className="flex justify-between items-center">
                      <span>{score.quiz}</span>
                      <span className="font-semibold">{score.score} / {quiz?.totalItems}</span>
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
