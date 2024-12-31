import React from "react";

const CompletedQuiz = ({ quiz, goBack }) => {
  const { quiz_name, completed_questions = [], answered_at, is_viewable, is_visible } = quiz;

  const totalQuestions = completed_questions.length;
  const correctCount = completed_questions.reduce(
    (count, question) => count + (question.student_answer === question.correct_answer ? 1 : 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-4xl rounded-lg shadow-lg flex flex-col ">
        {/* Quiz Header */}
        <div className="bg-gray-900 text-white p-6">
          <h1 className="text-xl font-bold">{quiz_name}</h1>
          <p>Date Submitted: {new Date(answered_at).toLocaleString()}</p>
          <p>Total Score: {correctCount}/{totalQuestions}</p>
        </div>

        {/* Questions Section */}
        <div className="p-6 space-y-6">
          {completed_questions.map((question, idx) => (
            <div key={question.id} className="bg-gray-100 p-4 rounded-md">
              <p>{idx + 1}. {question.question}</p>
              
              {/* Student Answer (Always shown) */}
              <p>
                Your Answer: &nbsp;  
                {is_viewable ? (
                  <span className={
                    question.student_answer === question.correct_answer
                      ? "text-green-600"
                      : "text-red-600"
                  }>
                    {question.student_answer || "No Answer"}
                  </span>
                ) : (
                  <span>{question.student_answer || "No Answer"}</span>
                )}
              </p>

              {/* Correct Answer (visible only when is_visible is true) */}
              {is_viewable && (
                <p>
                  Correct Answer: {question.correct_answer || "N/A"}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button 
          onClick={goBack} 
          className="bg-indigo-600 text-white py-2 px-4 rounded-md"
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
};

export default CompletedQuiz;
