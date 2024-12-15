import React from "react";

const UpcomingQuizzes = () => (
  <div className="mt-6 bg-white px-4 py-4 rounded-lg shadow">
    <h3 className="text-base font-semibold mb-1">Upcoming Quizzes</h3>
    <div className="flex flex-col gap-2">
      {["Subject 1", "Subject 2", "Subject 3"].map((subject, index) => (
        <div key={index} className="flex justify-between">
          <p>{subject}</p>
          <span>Oct 21, 2024</span>
        </div>
      ))}
    </div>
  </div>
);

export default UpcomingQuizzes;
