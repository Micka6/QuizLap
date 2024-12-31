import React, { useState, useRef, useEffect } from 'react';
import api from '../../../api';
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

const EditQuizModal = ({ isOpen, onClose, quiz, selectedClass, onQuizSaved }) => {
  const [quizName, setQuizName] = useState('');
  const [timer, setTimer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isViewable, setIsViewable] = useState(quiz.is_viewable);
  const [questions, setQuestions] = useState([]);
  const [showDatabankModal, setShowDatabankModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [databankQuestions, setDatabankQuestions] = useState([]);
  const questionRefs = useRef([]);
  const toast = useRef(null);

  const sampleDatabank = [
    { id: 1, type: 'TrueFalse', content: 'Is the earth round?', correctAnswer: 'True' },
    { id: 2, type: 'Multiple Choice', content: 'What is 2 + 2?', choices: ['3', '4', '5', '6'], correctAnswer: '4' },
    { id: 3, type: 'Short Answer', content: 'Define gravity.', correctAnswer: 'A force of attraction.' },
  ];

  useEffect(() => {
    if (isOpen && quiz) {
      setQuizName(quiz.quiz_name || '');
      setTimer(quiz.duration || '');
      setStartDate(new Date(quiz.start_date).toISOString().split('T')[0]);
      setStartTime(new Date(quiz.start_date).toTimeString().split(' ')[0].slice(0, 5));
      setEndDate(new Date(quiz.end_date).toISOString().split('T')[0]);
      setEndTime(new Date(quiz.end_date).toTimeString().split(' ')[0].slice(0, 5));
      setInstructions(quiz.quiz_instruction || '');
      fetchQuizQuestions(quiz.id);
    }
  }, [isOpen, quiz]);


  const fetchQuizQuestions = async (quizId) => {
    try {
      const response = await api.get(`/api/classcode/${selectedClass.class_code}/quizzes/${quizId}/questions/`);
      setQuestions(response.data.map(q => ({
        ...q,
        content: q.quiz_question,
        correctAnswer: q.quiz_answer,
        choices: q.quiz_choices || [],
        type: q.quiz_choices ? 'Multiple Choice' : (q.quiz_answer === 'True' || q.quiz_answer === 'False' ? 'TrueFalse' : 'Short Answer')
      })));
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };
  
  const fetchDatabankQuestions = async () => {
    try {
      const response = await api.get('/api/questionbank/');
      if (response.status === 200) {
        setDatabankQuestions(response.data);
        console.log('DATABANK QUESTIONS',response.data)
      }
    } catch (error) {
      console.error('Error fetching question bank:', error);
    }
  };

  const handleUseDatabank = async () => {
    setShowDatabankModal(true);
    fetchDatabankQuestions()
  };

  const handleAddFromDatabank = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  const filteredDatabank = databankQuestions.filter((question) =>
    question.quiz_question.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleAddQuestion = (type) => {
    const newQuestion = {
      type,
      content: '',
      correctAnswer: '',
      choices: type === 'Multiple Choice' ? ['', '', '', ''] : [],
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, content) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].content = content;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = answer;
    setQuestions(updatedQuestions);
  };

  const handleScrollToQuestion = (index) => {
    questionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveQuiz = () => {
    confirmDialog({
      message: "Are you sure you want to save this quiz?",
      header: "Save Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "custom-accept-button custom-yes-button",
      accept: async () => {
        const updatedQuiz = {
          quiz_name: quizName,
          duration: parseInt(timer),
          start_date: `${startDate}T${startTime}:00Z`,
          end_date: `${endDate}T${endTime}:00Z`,
          quiz_instruction: instructions,
          total_items: questions.length,
          class_code: selectedClass.class_code,
          is_viewable: isViewable,
        };

        try {
          if (quiz.id) {
            await api.put(`/api/classcode/${selectedClass.class_code}/quizzes/${quiz.id}/`, updatedQuiz);
          } else {
            const response = await api.post(`/api/classcode/${selectedClass.class_code}/quizzes/`, updatedQuiz);
            quiz.id = response.data.id;
          }

          // Save or update questions
          for (const question of questions) {
            const questionData = {
              quiz: quiz.id,
              quiz_question: question.content,
              quiz_choices: question.type === 'Multiple Choice' ? question.choices : null,
              quiz_answer: question.correctAnswer,
            };

            if (question.id) {
              await api.put(`/api/classcode/${selectedClass.class_code}/quizzes/${quiz.id}/questions/${question.id}/`, questionData);
            } else {
              await api.post(`/api/classcode/${selectedClass.class_code}/quizzes/${quiz.id}/questions/`, questionData);
            }
          }

          toast.current.show({ severity: "success", summary: "Quiz Saved", detail: "Your quiz has been successfully saved", life: 3000 });
          setTimeout(() => {
            onClose(window.location.reload());
        }, 1500);


        } catch (error) {
          console.error('Error saving quiz:', error);
          toast.current.show({ severity: "error", summary: "Error", detail: "There was an error saving your quiz", life: 3000 });
          // ... (keep the existing error logging)
        }
      },
      reject: () => {
        toast.current.show({ severity: "info", summary: "Cancelled", detail: "Quiz save cancelled", life: 3000 });
      }
    });
  };


  const handleCancel = () => {
    setQuizName('');
    setTimer('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setInstructions('');
    setIsViewable(quiz.is_viewable);
    setQuestions([]);
    onClose(window);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toast ref={toast} />
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Edit Quiz</h1>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">X</button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4 items-center">
            <div className="flex-1 flex items-center space-x-2">
              <label className="text-sm font-medium w-36">Name:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Enter Quiz Name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />
            </div>

            <div className="flex-1 flex items-center space-x-2">
              <label className="text-sm font-medium w-36">Timer (mins):</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Enter quiz timer"
                min="1"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-4 items-center">
            <div className="flex-1 flex items-center space-x-2">
              <label className="text-sm font-medium w-36">Start Date:</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center space-x-2">
              <label className="text-sm font-medium w-36">Opens at:</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-4 items-center mt-4">
            <div className="flex-1 flex items-center space-x-2">
              <label className="text-sm font-medium w-36">End Date:</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center space-x-2">
              <label className="text-sm font-medium w-36">Closes at:</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Teacher Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isViewable"
                checked={isViewable}
                onChange={(e) => setIsViewable(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="isViewable" className="text-sm">
                Make answers viewable to students after quiz submission
              </label>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-4xl mt-6">
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 space-y-4 overflow-y-auto max-h-[500px]">
            {questions.map((question, index) => (
              <div
                key={index}
                ref={(el) => (questionRefs.current[index] = el)}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <p className="text-sm font-medium mb-2">{index + 1}. {question.type} question</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2"
                  placeholder={`Enter ${question.type} question here`}
                  value={question.content}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                {question.type === 'Multiple Choice' && (
                  <div className="space-y-2">
                    {question.choices.map((choice, choiceIndex) => (
                      <input
                        key={choiceIndex}
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                        placeholder={`Choice ${choiceIndex + 1}`}
                        value={choice}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].choices[choiceIndex] = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                    ))}
                    <div className="mt-2">
                      <select
                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                        value={question.correctAnswer}
                        onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                      >
                        <option value="">Select Correct Answer</option>
                        {question.choices.map((choice, choiceIndex) => (
                          <option key={choiceIndex} value={choice}>{choice}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {question.type === 'TrueFalse' && (
                  <div className="mt-2">
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      value={question.correctAnswer}
                      onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                    >
                      <option value="">Select Correct Answer</option>
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </div>
                )}
                {question.type === 'Short Answer' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      placeholder="Enter the correct answer for Short Answer question here"
                      value={question.correctAnswer || ''}
                      onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                    />
                  </div>
                )}
                <button
                  onClick={() => handleDeleteQuestion(index)}
                  className="mt-2 w-full bg-red-500 text-white rounded-md py-2 text-sm"
                >
                  Delete Question
                </button>
              </div>
            ))}
          </div>

          <div className="w-1/3 ml-4 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-medium mb-4">Jump to Question</h2>
            <div className="space-y-2 max-h-[150px] overflow-y-auto">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleScrollToQuestion(index)}
                  className="w-full bg-gray-200 text-gray-800 rounded-md py-1 text-sm"
                >
                  Question {index + 1}
                </button>
              ))}
            </div>

            <h2 className="text-lg font-medium mt-6 mb-4">Question Types</h2>
            <div className="space-y-3">
              <button
                onClick={() => handleAddQuestion('Short Answer')}
                className="w-full bg-blue-500 text-white rounded-md py-2 text-sm"
              >
                Add Short Answer
              </button>
              <button
                onClick={() => handleAddQuestion('TrueFalse')}
                className="w-full bg-blue-500 text-white rounded-md py-2 text-sm"
              >
                Add True/False
              </button>
              <button
                onClick={() => handleAddQuestion('Multiple Choice')}
                className="w-full bg-blue-500 text-white rounded-md py-2 text-sm"
              >
                Add Multiple Choice
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => handleUseDatabank()}
                className="w-full bg-purple-500 text-white rounded-md py-2 text-sm"
              >
                Use Databank
              </button>
              <button
                onClick={handleSaveQuiz}
                className="w-full bg-green-500 text-white rounded-md py-2 text-sm"
              >
                Save Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDatabankModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Question Databank</h1>
                <button
                  onClick={() => setShowDatabankModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  X
                </button>
              </div>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm mb-4"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

<div className="space-y-4 max-h-[60vh] overflow-y-auto">
  {filteredDatabank.map((question) => (
    <div key={question.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
      {/* Question */}
      <p className="text-sm font-medium">
        Question: {question.quiz_question}
      </p>

      {/* Choices (if applicable) */}
      {question.quiz_choices && (
        <ul className="list-disc list-inside mt-2">
          {question.quiz_choices.map((choice, index) => (
            <li key={index} className="text-sm">
              {choice}
            </li>
          ))}
        </ul>
      )}

      {/* Correct Answer */}
      <p className="mt-2 text-sm font-medium text-green-600">
        Correct Answer: {question.quiz_answer}
      </p>

      {/* Add Question Button */}
      <button
        onClick={() => {
          handleAddFromDatabank({
            content: question.quiz_question,
            type: question.quiz_choices ? 'Multiple Choice' : 'Short Answer',
            choices: question.quiz_choices || [],
            correctAnswer: question.quiz_answer,
          });
          setShowDatabankModal(false);
        }}
        className="mt-2 w-full bg-blue-500 text-white rounded-md py-2 text-sm"
      >
        Add Question
      </button>
    </div>
  ))}
</div>

            </div>
          </div>
        )}
    </div>
  );
};

export default EditQuizModal;

