import React, { useState } from 'react';

const sampleBankQuestions = [
  { id: 1, content: 'What is the capital of France?', type: 'Multiple Choice', choices: ['Paris', 'London', 'Berlin', 'Madrid'], correctAnswer: 'Paris' },
  { id: 2, content: 'Is the earth flat?', type: 'True/False', correctAnswer: 'False' },
  { id: 3, content: 'Explain the theory of relativity.', type: 'Short Answer', correctAnswer: 'Relativity theory explanation' },
];

export const QuizBank = () => {
  const [bankQuestions, setBankQuestions] = useState(sampleBankQuestions);
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    content: '',
    type: 'Multiple Choice',
    choices: ['', '', '', ''],
    correctAnswer: ''
  });

  // Toggle Modal and Reset Form if Modal is Closed
  const toggleModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      resetForm(); // Reset form when closing the modal
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setNewQuestion({
      content: '',
      type: 'Multiple Choice',
      choices: ['', '', '', ''],
      correctAnswer: ''
    });
  };

  // Add New Question
  const addNewQuestion = () => {
    setBankQuestions([...bankQuestions, { ...newQuestion, id: bankQuestions.length + 1 }]);
    toggleModal(); // Close modal after adding
  };

  // Handle Input Changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Multiple Choice Inputs
  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...newQuestion.choices];
    updatedChoices[index] = value;
    setNewQuestion((prev) => ({ ...prev, choices: updatedChoices }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quiz Question Bank</h1>
        {/* Button to open modal to add questions */}
        <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Add Question to Bank
        </button>
      </div>

      {/* Section for showing all banked questions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Stored Questions</h2>
        {bankQuestions.length > 0 ? (
          <div className="space-y-4">
            {bankQuestions.map((question) => (
              <div key={question.id} className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-sm font-medium">{question.content}</p>
                {question.type === 'Multiple Choice' && (
                  <ul className="list-disc list-inside mt-2">
                    {question.choices.map((choice, index) => (
                      <li key={index} className="text-sm">{choice}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-2 text-sm text-gray-500">Type: {question.type}</p>
                <p className="mt-1 text-sm text-green-600">Correct Answer: {question.correctAnswer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No questions available in the bank yet.</p>
        )}
      </div>

      {/* Modal for adding new question */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Question</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Question Content</label>
              <input
                type="text"
                name="content"
                value={newQuestion.content}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter the question content"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Question Type</label>
              <select
                name="type"
                value={newQuestion.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
                <option value="Short Answer">Short Answer</option>
              </select>
            </div>

            {newQuestion.type === 'Multiple Choice' && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Choices</label>
                {newQuestion.choices.map((choice, index) => (
                  <input
                    key={index}
                    type="text"
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    placeholder={`Choice ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Correct Answer</label>
              {newQuestion.type === 'Multiple Choice' && (
                <select
                  name="correctAnswer"
                  value={newQuestion.correctAnswer}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Select the correct answer</option>
                  {newQuestion.choices.map((choice, index) => (
                    <option key={index} value={choice}>{choice}</option>
                  ))}
                </select>
              )}
              {newQuestion.type === 'True/False' && (
                <select
                  name="correctAnswer"
                  value={newQuestion.correctAnswer}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Select the correct answer</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              )}
              {newQuestion.type === 'Short Answer' && (
                <input
                  type="text"
                  name="correctAnswer"
                  value={newQuestion.correctAnswer}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter the correct answer"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={toggleModal} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                Cancel
              </button>
              <button onClick={addNewQuestion} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizBank;
