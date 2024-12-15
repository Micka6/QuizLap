import React, { useState } from "react";
import CreateClassModal from "../classes/CreateClassModal";
import SuccessModal from "./SuccessModal";
import Statistics from "./Statistics";
import UpcomingQuizzes from "./UpcomingQuizzes";
import Calendar from "./Calendar";
import SubjectCard from "./SubjectCard"; // Import the separated card component

const Dashboard = ({ setCurrentPage }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isJoinClassOpen, setJoinClassOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [classCode, setClassCode] = useState("");

  const changePage = () => {
    setCurrentPage("Classes");
  };

  const handleJoinClass = () => {
    const dummyCode = "12345";
    if (classCode === dummyCode) {
      setJoinClassOpen(false);
      setSuccessOpen(true);
    } else {
      alert("Wrong class code! Please try again.");
    }
  };

  const closeModal = () => setJoinClassOpen(false);

  return (
    <div className="p-8 h-full">
      {/* Header Section */}
      <div className="bg-indigo-900 text-white p-10 rounded-lg flex justify-between">
        <div className="w-1/2">
          <h2 className="text-lg mb-2">
            Hello Teacher <span className="font-semibold">Justine!</span>
          </h2>
          <p className="text-4xl font-medium mb-6">
            You have Scheduled <br />3 Quizzes this week!
          </p>
          <div className="flex">
            <button
              onClick={() => setJoinClassOpen(true)}
              className="bg-purple-500 px-4 py-1 text-sm rounded-full mr-4"
            >
              CREATE A CLASS
            </button>
            <button
              className="bg-white text-indigo-900 px-8 py-1 text-sm rounded-full"
              onClick={changePage}
            >
              VIEW ALL
            </button>
          </div>
        </div>
        {/* Dummy Subjects Section */}
        <div className="w-1/2 flex gap-6">
           <SubjectCard/>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex mt-4">
        <div className="w-1/2 pr-4">
          <Statistics />
          <UpcomingQuizzes />
        </div>
        <div className="w-1/2 pl-4">
          <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        </div>
      </div>

      {/* Modals */}
      {isJoinClassOpen && (
        <CreateClassModal
          classCode={classCode}
          setClassCode={setClassCode}
          onJoin={handleJoinClass}
          onClose={closeModal}
        />
      )}
      {isSuccessOpen && <SuccessModal onClose={() => setSuccessOpen(false)} />}
    </div>
  );
};

export default Dashboard;
