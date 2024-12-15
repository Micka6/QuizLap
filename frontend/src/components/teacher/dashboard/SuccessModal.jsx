import React from "react";

const SuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-4">
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="mx-auto"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#CCCCCC"
              stroke-width="0.36"
            >
              {" "}
              <path
                fill="#2b2d47"
                fill-rule="evenodd"
                d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"
              />{" "}
            </g>

            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill="#2b2d47"
                fill-rule="evenodd"
                d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"
              />{" "}
            </g>
          </svg>
        </div>
        <h3 className="text-xl font-normal mb-2">Class joined successfully</h3>
        <p className="text-lg font-bold mb-4">Subject 1</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-indigo-900 text-white rounded-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
