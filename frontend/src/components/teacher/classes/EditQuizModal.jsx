import React, { useState, useRef, useEffect } from 'react';

const EditQuizModal = ({ isOpen, onClose, quiz }) => {
  const [title, setTitle] = useState('');
  const [quizName, setQuizName] = useState('');
  const [timer, setTimer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [viewableAnswers, setViewableAnswers] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showDatabankModal, setShowDatabankModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const questionRefs = useRef([]); // To scroll to questions

  const sampleDatabank = [
    { id: 1, type: 'TrueFalse', content: 'Is the earth round?', correctAnswer: 'True' },
    { id: 2, type: 'Multiple Choice', content: 'What is 2 + 2?', choices: ['3', '4', '5', '6'], correctAnswer: '4' },
    { id: 3, type: 'Short Answer', content: 'Define gravity.', correctAnswer: 'A force of attraction.' },
  ];

  useEffect(() => {
    if (isOpen && quiz) {
      setQuizName(quiz.title || '');
      setTimer(quiz.timer || '');
      setStartDate(quiz.startDate || '');
      setStartTime(quiz.startTime || '');
      setEndDate(quiz.endDate || '');
      setEndTime(quiz.endTime || '');
      setInstructions(quiz.instructions || '');
      setViewableAnswers(quiz.viewableAnswers || false);
      setQuestions(quiz.questions || []);
    }
  }, [isOpen, quiz]);

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
    const updatedQuiz = {
      title: quizName,
      timer,
      startDate,
      startTime,
      endDate,
      endTime,
      instructions,
      viewableAnswers,
      questions,
    };
    console.log('Quiz Updated:', updatedQuiz); // Debugging line
    onClose(); // Close the modal after saving
  };

  const handleAddFromDatabank = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  const handleCancel = () => {
    setQuizName('');
    setTimer('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setInstructions('');
    setViewableAnswers(false);
    setQuestions([]);
    onClose();
  };

  const filteredDatabank = sampleDatabank.filter((question) =>
    question.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null; // Don't render modal if it's closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Edit Quiz</h1>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">X</button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4 items-center">
            {/* Quiz Name Input */}
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

            {/* Timer Input */}
            <div className="flex-1 flex items-center space-x-2">
              <label className="text-sm font-medium w-36">Timer (mins):</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Enter quiz timer"
                min="1"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault(); // Prevent any non-numeric input
                  }
                }}
              />
            </div>
          </div>

          {/* Start Date and Time Inputs */}
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

          {/* End Date and Time Inputs */}
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

            {/* Checkbox for viewable answers */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="viewableAnswers"
                checked={viewableAnswers}
                onChange={(e) => setViewableAnswers(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="viewableAnswers" className="text-sm">
                Make answers viewable to students after quiz submission
              </label>
            </div>
          </div>
        </div>


        {/* Questions Section */}
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

          {/* Sidebar for quick navigation */}
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
                onClick={() => setShowDatabankModal(true)}
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

      {/* Databank Modal */}
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
                <div
                  key={question.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-md"
                >
                  <p className="text-sm font-medium">
                    {question.type}: {question.content}
                  </p>
                  <button
                    onClick={() => {
                      handleAddFromDatabank(question);
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