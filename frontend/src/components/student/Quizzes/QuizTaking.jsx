import React, { useState, useEffect, useCallback, useRef } from "react";
import api from '../../../api';

const QuizTaking = ({ quiz, goBack }) => {
  const { quiz_name, quiz_instruction, questions, duration } = quiz;

  const [answers, setAnswers] = useState(() => {
    const initialAnswers = {};
    questions.forEach((question) => {
      initialAnswers[question.id] = "";
    });
    return initialAnswers;
  });

  const [timeLeft, setTimeLeft] = useState(duration);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [cheatingCount, setCheatingCount] = useState(0);

  const timerRef = useRef(null); // Holds the timer instance

  const handleSubmit = useCallback(async () => {
    setIsSubmitted(true);

    // Clear the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Replace empty answers with "no answer"
    const processedAnswers = {};
    for (const [key, value] of Object.entries(answers)) {
      processedAnswers[key] = value.trim() === "" ? "no answer" : value;
    }

    try {
      const response = await api.post(`/api/quizzes/${quiz.id}/submit/`, {
        answers: processedAnswers,
      });

      if (response.status === 200) {
        console.log("Submission Success:", response.data);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("There was an error submitting your quiz. Please try again.");
    }
  }, [answers, quiz.id]);

  useEffect(() => {
    // Timer logic
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }

    if (!isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isSubmitted, handleSubmit]);

  useEffect(() => {
    const enforceFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      }
    };

    const handleFocusLoss = () => {
      setCheatingCount((prev) => prev + 1);
    };

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You exited full-screen mode. The quiz will now submit automatically.");
        handleSubmit();
      }
    };

    window.addEventListener("blur", handleFocusLoss);
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    enforceFullScreen();

    return () => {
      window.removeEventListener("blur", handleFocusLoss);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [handleSubmit]);

  useEffect(() => {
    if (cheatingCount >= 3 && !isSubmitted) {
      alert("You switched windows or exited full-screen multiple times. The quiz is now auto-submitted.");
      handleSubmit();
    }
  }, [cheatingCount, isSubmitted, handleSubmit]);

  const handleInputChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const renderQuestion = (questionData, index) => {
    const { quiz_question, quiz_choices, quiz_answer } = questionData;

    if (quiz_choices && Array.isArray(quiz_choices) && quiz_choices.length > 0) {
      return (
        <div key={questionData.id} className="space-y-2">
          <p className="font-semibold">{index + 1}. {quiz_question}</p>
          <div className="space-y-2">
            {quiz_choices.map((choice, idx) => (
              <label key={idx} className="block">
                <input
                  type="radio"
                  name={`question-${questionData.id}`}
                  value={choice}
                  checked={answers[questionData.id] === choice}
                  onChange={(e) => handleInputChange(questionData.id, e.target.value)}
                  disabled={isSubmitted}
                />
                {choice}
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (quiz_answer === "True" || quiz_answer === "False") {
      return (
        <div key={questionData.id} className="space-y-2">
          <p className="font-semibold">{index + 1}. {quiz_question}</p>
          <select
            className="border p-2 w-full rounded-md"
            value={answers[questionData.id]}
            onChange={(e) => handleInputChange(questionData.id, e.target.value)}
            disabled={isSubmitted}
          >
            <option value="">Select Answer</option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </div>
      );
    }

    return (
      <div key={questionData.id} className="space-y-2">
        <p className="font-semibold">{index + 1}. {quiz_question}</p>
        <input
          type="text"
          className="border p-2 w-full rounded-md"
          placeholder="Enter your answer here"
          value={answers[questionData.id]}
          onChange={(e) => handleInputChange(questionData.id, e.target.value)}
          disabled={isSubmitted}
        />
      </div>
    );
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white w-[90%] max-w-4xl rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Quiz Instructions</h1>
          <div className="mb-6">
            <p className="text-lg text-gray-800 font-medium mb-4">
              Please read the following instructions carefully before starting the quiz:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-gray-700">
              <li>Ensure you have a stable internet connection during the quiz.</li>
              <li>Do not switch tabs or minimize the window. The quiz will auto-submit if you do.</li>
              <li>Answer all questions before the timer runs out to avoid submission errors.</li>
              <li>Click "Start Quiz" only when you are ready to begin. You will not be able to pause the quiz once started.</li>
              <li>Make sure to review your answers before submission, as changes cannot be made after you submit.</li>
            </ul>
          </div>
          {quiz_instruction && (
            <div className="bg-blue-100 p-4 rounded-md mb-6 shadow-sm">
              <strong className="text-lg text-blue-600">Teacher's Instructions:</strong>
              <p className="text-gray-700 mt-2">{quiz_instruction}</p>
            </div>
              )}
          <div className="text-center">
            <button
              onClick={() => setShowInstructions(false)}
              className="bg-blue-900 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg"
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
      <div className="bg-white w-[90%] max-w-4xl rounded-lg shadow-lg">
        <div className="bg-gray-900 text-white p-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">{quiz_name}</h1>
            <p>Time Left: {formatTime(timeLeft)}</p>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-6">
          {questions.map((questionData, index) => renderQuestion(questionData, index))}
          {!isSubmitted && (
            <button
              onClick={handleSubmit}
              className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTaking;
