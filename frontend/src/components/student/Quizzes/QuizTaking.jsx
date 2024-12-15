import React, { useState, useEffect, useCallback } from "react";

const QuizTaking = ({ quiz, goBack }) => {
  const { title, questions, teacherInstructions } = quiz; // Get the teacher's instructions
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // Example: 10 minutes for the quiz
  const [answers, setAnswers] = useState(() => {
    const initialAnswers = {};
    questions.forEach((_, index) => {
      initialAnswers[`q${index + 1}`] = "";
    });
    return initialAnswers;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [alerted, setAlerted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true); // Track if instructions are shown

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
    console.log("Quiz Submitted:", { name, section, answers });
  }, [name, section, answers]);

  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }

    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, handleSubmit]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (questionKey, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: value,
    }));
  };

  const allQuestionsAnswered = Object.values(answers).every(
    (answer) => answer !== ""
  );

  const isDisabled = isSubmitted || timeLeft === 0;

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      setTabSwitchCount((prev) => prev + 1);

      if (!alerted && tabSwitchCount >= 1) {
        alert(
          "Warning: Switching tabs or minimizing the window again will submit your quiz."
        );
        setAlerted(true);
      }

      if (tabSwitchCount >= 2) {
        handleSubmit();
      }
    }
  }, [alerted, tabSwitchCount, handleSubmit]);

  const handleBeforeUnload = useCallback((e) => {
    if (!isSubmitted) {
      const message = "If you leave or refresh, your quiz will be submitted.";
      e.returnValue = message;
      return message;
    }
  }, [isSubmitted]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleVisibilityChange, handleBeforeUnload]);

  // Instructions Screen
  // Instructions Screen
if (showInstructions) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-4xl rounded-lg shadow-xl overflow-hidden p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Quiz Instructions</h1>
        
        <div className="mb-6">
          <p className="text-lg text-gray-800 font-medium mb-4">
            Please read the following instructions carefully before starting the quiz:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-700">
            <li className="text-md">Ensure you have a stable internet connection during the quiz.</li>
            <li className="text-md">Do not switch tabs or minimize the window. The quiz will auto-submit if you do.</li>
            <li className="text-md">Answer all questions before the timer runs out to avoid submission errors.</li>
            <li className="text-md">Click "Start Quiz" only when you are ready to begin. You will not be able to pause the quiz once started.</li>
            <li className="text-md">Make sure to review your answers before submission, as changes cannot be made after you submit.</li>
          </ul>
        </div>

        {teacherInstructions && (
          <div className="bg-blue-100 p-4 rounded-md mb-6 shadow-sm">
            <strong className="text-lg text-blue-600">Teacher's Note:</strong>
            <p className="text-gray-700 mt-2">{teacherInstructions}</p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => setShowInstructions(false)}
            className="bg-blue-900 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-4xl rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-900 text-white p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-sm">Time Left: {formatTime(timeLeft)}</p>
          </div>
          <div className="flex justify-between mt-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-gray-800 text-white placeholder-gray-400 border-b border-gray-700 focus:outline-none focus:border-indigo-400 w-[45%]"
              disabled={isDisabled}
            />
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              placeholder="Enter your section"
              className="bg-gray-800 text-white placeholder-gray-400 border-b border-gray-700 focus:outline-none focus:border-indigo-400 w-[45%]"
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* Body Section */}
        <div className="p-6 space-y-6">
          {questions.map((questionData, index) => (
            <div key={index} className="space-y-2">
              <p className="font-semibold">{index + 1}. {questionData.question}</p>

              {questionData.type === 'text' && (
                <input
                  type="text"
                  placeholder="Input your answer here"
                  value={answers[`q${index + 1}`]}
                  onChange={(e) => handleInputChange(`q${index + 1}`, e.target.value)}
                  className="border p-2 w-full rounded-md"
                  disabled={isDisabled}
                />
              )}

              {questionData.type === 'truefalse' && (
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      value="True"
                      checked={answers[`q${index + 1}`] === "True"}
                      onChange={(e) => handleInputChange(`q${index + 1}`, e.target.value)}
                      disabled={isDisabled}
                    />
                    True
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="False"
                      checked={answers[`q${index + 1}`] === "False"}
                      onChange={(e) => handleInputChange(`q${index + 1}`, e.target.value)}
                      disabled={isDisabled}
                    />
                    False
                  </label>
                </div>
              )}

              {questionData.type === 'multiple' && (
                <div className="space-y-2">
                  {questionData.options.map((option, idx) => (
                    <label key={idx} className="block">
                      <input
                        type="radio"
                        value={option}
                        checked={answers[`q${index + 1}`] === option}
                        onChange={(e) => handleInputChange(`q${index + 1}`, e.target.value)}
                        disabled={isDisabled}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          {!isSubmitted && (
            <button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered || isDisabled}
              className={`w-full p-3 rounded-lg text-white ${
                allQuestionsAnswered && !isDisabled
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          )}

          {isSubmitted && <p className="text-center text-green-600">Quiz Submitted Successfully!</p>}
        </div>
      </div>
    </div>
  );
};


export default QuizTaking;
