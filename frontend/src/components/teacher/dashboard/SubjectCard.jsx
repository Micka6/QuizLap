import React from "react";

// Dummy data with the number of students who have taken the quiz
const subjects = [
  { subcode: "IT 301", cardColor: "bg-lime-400", progressBarColor: "bg-lime-500", taken: 30, total: 33 },
  { subcode: "IT 302", cardColor: "bg-purple-400", progressBarColor: "bg-purple-600", taken: 25, total: 33 },
  { subcode: "CS 302", cardColor: "bg-yellow-300", progressBarColor: "bg-yellow-500", taken: 20, total: 33 },
  { subcode: "CS 401", cardColor: "bg-yellow-300", progressBarColor: "bg-yellow-500", taken: 15, total: 33 },
];

// Sort subjects based on the number of students who have taken the quiz in descending order and limit to the top 3
const limitedSubjects = subjects.sort((a, b) => b.taken - a.taken).slice(0, 3);

// SubjectCard Component
const SubjectCard = () => {
  return (
    <div className="w-full flex gap-4">
      {limitedSubjects.map((subject, index) => (
        <div
          key={index}
          className={`relative p-6 rounded-lg shadow-lg flex-1 ${subject.cardColor}`}
        >
          {/* Number above the subject */}
          <span className="absolute top-4 left-4 text-2xl font-bold opacity-50">
            0{index + 1}
          </span>
          <h3 className="font-bold text-xl mt-9">{subject.subcode.toUpperCase()}</h3>
          <p className="text-sm mt-2">
            Students Taken: {subject.taken} / {subject.total}
          </p>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full ${subject.progressBarColor}`}
              style={{ width: `${(subject.taken / subject.total) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectCard;