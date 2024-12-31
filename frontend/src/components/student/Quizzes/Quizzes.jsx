import React, { useState, useEffect } from 'react';
import QuizTaking from './QuizTaking';
import CompletedQuiz from './CompletedQuiz';
import api from '../../../api';

const Quizzes = ({ subject, goBack }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, [subject]);

  const fetchQuizzes = async () => {
    try {
      const response = await api.get(`/api/classcode/${subject.class_code}/quizzes/`);
      console.log(response.data);
      setQuizzes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setLoading(false);
    }
  };
  const fetchQuizDetails = async (quizId) => {
    try {
      const response = await api.get(`/api/quizzes/${quizId}/`);
      console.log('Fetched Quiz Details:', response.data);
      setSelectedQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz details:', error);
      displayToast('Failed to load quiz details. Please try again.');
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const categorizedQuizzes = quizzes.reduce(
    (categories, quiz) => {
      const startDate = new Date(quiz.start_date);
      const dueDate = new Date(quiz.end_date);
      dueDate.setHours(0, 0, 0, 0);

      if (quiz.is_completed) {
        categories.Completed.push(quiz);
      } else if (dueDate < today) {
        categories.PastDue.push(quiz);
      } else {
        categories.Upcoming.push(quiz);
      }
      return categories;
    },
    { Upcoming: [], PastDue: [], Completed: [] }
  );

  const handleQuizClick = (quiz) => {
    if (activeTab === 'Past Due') {
      displayToast('This quiz is past due and cannot be taken.');
      return;
    }

    const now = new Date();
    const startDate = new Date(quiz.start_date);

    if (now < startDate) {
      displayToast("CANT TAKE QUIZ YET!");
      return;
    }

    fetchQuizDetails(quiz.id);
  };

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderQuizzes = (quizzes) => {
    if (!quizzes || quizzes.length === 0) {
      return <p className="text-gray-500">No quizzes in this category.</p>;
    }

    return quizzes.map((quiz) => (
      <div
        key={quiz.id}
        className={`p-4 mb-3 rounded-md shadow-md cursor-pointer ${
          activeTab === 'Past Due' 
            ? 'bg-red-100' 
            : activeTab === 'Completed' 
              ? 'bg-green-100' 
              : 'bg-white'
        }`}
        onClick={() => handleQuizClick(quiz)}
      >
        <h3 className="font-semibold">{quiz.quiz_name}</h3>
        <p>
          {activeTab === 'Completed' 
            ? `Submitted: ${quiz.answered_at 
                ? new Date(quiz.answered_at).toLocaleString() 
                : 'N/A'}`
            : `Start: ${new Date(quiz.start_date).toLocaleString()}`}
        </p>
        <p>Due: {new Date(quiz.end_date).toLocaleString()}</p>
        {activeTab === 'Past Due' && (
          <p className="text-red-600 font-semibold">
            The due date has passed. You can no longer take this quiz.
          </p>
        )}
        {activeTab === 'Upcoming' && new Date() < new Date(quiz.start_date) && (
          <p className="text-yellow-600 font-semibold">
            This quiz is not yet available.
          </p>
        )}
      </div>
    ));
  };

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <div className="flex flex-col gap-6 relative">
      {showToast && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      {!selectedQuiz ? (
        <>
          <div className="w-full h-8 items-center">
            <button
              className="flex text-xl font-bold items-center text-secondary"
              onClick={goBack}
            >
              <span className="text-4xl font-medium"> &lt; </span> {subject.subject_name}
            </button>
          </div>

          <div className="flex gap-4 mb-4 border-b border-gray-300">
            {['Upcoming', 'Past Due', 'Completed'].map((tab) => (
              <button
                key={tab}
                className={`p-2 rounded-md ${
                  activeTab === tab
                    ? 'underline text-blue-900'
                    : 'bg-none text-gray-500 hover:text-secondary'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            {activeTab === 'Upcoming' && renderQuizzes(categorizedQuizzes.Upcoming)}
            {activeTab === 'Past Due' && renderQuizzes(categorizedQuizzes.PastDue)}
            {activeTab === 'Completed' && renderQuizzes(categorizedQuizzes.Completed)}
          </div>
        </>
      ) : selectedQuiz.answered_at && activeTab === 'Completed' ? (
        <CompletedQuiz quiz={selectedQuiz} goBack={() => setSelectedQuiz(null)} />
      ) : (
        <QuizTaking quiz={selectedQuiz} goBack={() => setSelectedQuiz(null)} />
      )}
    </div>
  );
};

export default Quizzes;

