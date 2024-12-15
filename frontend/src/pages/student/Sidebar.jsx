import React from "react";
import { AiOutlineDashboard, AiOutlineFileText } from "react-icons/ai";
import { FiSettings, FiLogOut } from "react-icons/fi";
import logo from "../../assets/quizlapWhite.png";
import { useNavigate } from "react-router-dom";  // <-- Add this import

const PAGES = {
  DASHBOARD: "Dashboard",
  CLASSES: "Classes",
  SETTINGS: "Settings",
};

const Sidebar = ({ setCurrentPage, currentPage }) => {
  const handleNavigationClick = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();  // Now you can use navigate

  return (
    <div className="w-1/5 h-full bg-indigo-950 p-5 shadow-md flex flex-col">
      <img className="w-full h-16" src={logo} alt="logo" />
      <div>
        <ul className="space-y-3 mt-9 mx-auto flex-1">
          {/* Sidebar Items */}
          {Object.entries(PAGES).map(([key, page]) => (
            <li
              key={key}
              className={`flex justify-start items-center px-6 py-2 rounded-md cursor-pointer 
                ${currentPage === page ? "bg-white text-secondary font-bold" : "text-white"} 
                hover:bg-blue-100 hover:text-blue-700 transition-all`}
              onClick={() => handleNavigationClick(page)}
            >
              {key === "DASHBOARD" && <AiOutlineDashboard className="mr-2" />}
              {key === "CLASSES" && <AiOutlineFileText className="mr-2" />}
              {key === "SETTINGS" && <FiSettings className="mr-2" />}
              {page}
            </li>
          ))}
        </ul>
      </div>
      {/* Logout Button */}
      <div className="flex justify-center items-center mt-auto cursor-pointer text-white hover:text-red-600 transition-all py-2" onClick={() => navigate("/login")}>
        <FiLogOut className="mr-2" /> Log out
      </div>
    </div>
  );
};

export default Sidebar;
