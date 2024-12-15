import React, { useState, useEffect} from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../../components/student/dashboard/Dashboard";
import Quizzes from "../../components/student/Quizzes/Quizzes";
import Classes from "../../components/student/classes/Classes";
import Settings from "../../components/student/settings/Settings";

const PAGES = {
  DASHBOARD: "Dashboard",
  QUIZZES: "Quizzes",
  CLASSES: "Classes",
  SETTINGS: "Settings",
};

const StudentPage = () => {
  const [currentPage, setCurrentPage] = useState(PAGES.DASHBOARD);

  useEffect(() => {
      sessionStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const renderContent = () => {
    switch (currentPage) {
      case PAGES.DASHBOARD:
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case PAGES.QUIZZES:
        return <Quizzes />;
      case PAGES.CLASSES:
        return <Classes />;
      case PAGES.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <Header currentPage={currentPage} />

        {/* Dashboard Content */}
        <div className="h-[91%] overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StudentPage;
