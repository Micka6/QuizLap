import React, { useState } from "react";
import QuizTaking from "./QuizTaking";
import CompletedQuiz from "./CompletedQuiz";
import quizzesData from "./quizzesData";

const Quizzes = ({ subject, goBack }) => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date

  const categorizedQuizzes = quizzesData[subject]?.reduce(
    (categories, quiz) => {
      const dueDate = new Date(quiz.dueDate);
      dueDate.setHours(0, 0, 0, 0); // Normalize due date

      if (quiz.submitted) {
        categories.Completed.push(quiz);
      } else if (dueDate < today) {
        categories.PastDue.push(quiz);
      } else {
        categories.Upcoming.push(quiz);
      }
      return categories;
    },
    { Upcoming: [], PastDue: [], Completed: [] }
  ) || { Upcoming: [], PastDue: [], Completed: [] };

  const handleQuizClick = (quiz) => {
    if (activeTab === "Past Due") {
      displayToast("This quiz is past due and cannot be taken.");
      return;
    }
    setSelectedQuiz(quiz);
  };

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  const renderQuizzes = (quizzes) => {
    if (!quizzes || quizzes.length === 0) {
      return <p className="text-gray-500">No quizzes in this category.</p>;
    }

    return quizzes.map((quiz, index) => (
      <div
        key={index}
        className={`p-4 mb-3 rounded-md shadow-md cursor-pointer ${
          activeTab === "Past Due" ? "bg-red-100" : "bg-white"
        }`}
        onClick={() => handleQuizClick(quiz)}
      >
        <h3 className="font-semibold">{quiz.title}</h3>
        <p>
          {activeTab === "Completed"
            ? `Submitted: ${quiz.submitted}`
            : `Due: ${quiz.dueDate}`}
        </p>
        {activeTab === "Past Due" && (
          <p className="text-red-600 font-semibold">
            The due date has passed. You can no longer take this quiz.
          </p>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {showToast && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      {!selectedQuiz ? (
        <>
          {/* Header */}
          <div className="w-full h-8 items-center">
            <button
              className="flex text-xl font-bold items-center text-secondary"
              onClick={goBack}
            >
              <span className="text-4xl font-medium"> &lt; </span> {subject}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-4 border-b border-gray-300">
            {["Upcoming", "Past Due", "Completed"].map((tab) => (
              <button
                key={tab}
                className={`p-2 rounded-md ${
                  activeTab === tab
                    ? "underline text-blue-900"
                    : "bg-none text-gray-500 hover:text-secondary"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quizzes */}
          <div>
            {activeTab === "Upcoming" && renderQuizzes(categorizedQuizzes.Upcoming)}
            {activeTab === "Past Due" && renderQuizzes(categorizedQuizzes.PastDue)}
            {activeTab === "Completed" &&
              renderQuizzes(categorizedQuizzes.Completed)}
          </div>
        </>
      ) : (
        selectedQuiz.submitted ? (
          <CompletedQuiz
            quiz={selectedQuiz}
            goBack={() => setSelectedQuiz(null)}
          />
        ) : (
          <QuizTaking quiz={selectedQuiz} goBack={() => setSelectedQuiz(null)} />
        )
      )}
    </div>
  );
};

export default Quizzes;
