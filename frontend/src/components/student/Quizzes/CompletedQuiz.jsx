import React from "react";

const CompletedQuiz = ({ quiz, goBack }) => {
  const { title, questions, studentAnswers, correctAnswers, subject } = quiz;

  // Calculate the score dynamically
  const totalQuestions = questions.length;
  const correctCount = questions.reduce((count, _, index) => {
    const studentAnswer = studentAnswers[`q${index + 1}`];
    const correctAnswer = correctAnswers[`q${index + 1}`];
    return count + (studentAnswer === correctAnswer ? 1 : 0);
  }, 0);
  const points = `${correctCount}/${totalQuestions}`;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-4xl rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gray-900 text-white p-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm mt-2">
            Subject: <span className="font-medium">{subject || "IT101"}</span>
          </p>
          <p className="text-sm mt-2">Total Score: {points}</p>
        </div>

        {/* Quiz Info */}
        <div className="px-6 py-4 border-b border-gray-300 text-sm text-gray-500">
          <div className="flex justify-between">
            <div>
              <p>
                <span className="font-medium">Name:</span> ________________
              </p>
              <p>
                <span className="font-medium">Section:</span> ________________
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Date:</span> ________________
              </p>
              <p>
                <span className="font-medium">Section:</span> ________________
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Questions */}
        <div className="p-6 space-y-6">
          {questions.map((questionData, index) => {
            const studentAnswer = studentAnswers[`q${index + 1}`];
            const correctAnswer = correctAnswers[`q${index + 1}`];
            const isCorrect = studentAnswer === correctAnswer;

            return (
              <div key={index} className="bg-gray-100 p-4 rounded-md">
                {/* Question */}
                <p className="font-semibold text-gray-700">
                  {index + 1}. {questionData.question}
                </p>

                {/* Student's Answer */}
                <div className="mt-2">
                  <p
                    className={`font-medium ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="text-gray-500">Your Answer: </span>
                    {studentAnswer || "No answer provided"}
                  </p>
                </div>

                {/* Correct Answer */}
                <div className="mt-2">
                  <p className="font-medium text-green-600">
                    <span className="text-gray-500">Correct Answer: </span>
                    {correctAnswer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="px-6 py-4 border-t border-gray-300">
          <button
            onClick={goBack}
            className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletedQuiz;
