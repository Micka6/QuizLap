import React from "react";

const JoinClassModal = ({ classCode, setClassCode, onJoin, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Join a Class</h2>
        <p className="text-center mb-6">Input the code below to join the class</p>
        <div className="flex items-center mb-6">
          <label className="bg-indigo-900 px-4 py-2 rounded-l-lg text-white">Code</label>
          <input
            type="text"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            className="border border-gray-300 p-2 flex-1 rounded-r-lg"
            placeholder="Enter class code"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={onJoin} className="px-4 py-2 bg-indigo-900 text-white rounded-full">
            Confirm
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinClassModal;
