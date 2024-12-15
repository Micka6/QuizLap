import React from "react";

// Dummy data with scores
const subjects = [
  { name: "Subject 3", cardColor: "bg-lime-400", progressBarColor: "bg-lime-500", score: 70, total: 100 },
  { name: "Subject 1", cardColor: "bg-purple-400", progressBarColor: "bg-purple-600", score: 40, total: 100 },
  { name: "Subject 2", cardColor: "bg-yellow-300", progressBarColor: "bg-yellow-500", score: 30, total: 100 },
  { name: "Subject 4", cardColor: "bg-yellow-300", progressBarColor: "bg-yellow-500", score: 90, total: 100 },
];

// Sort subjects based on score in descending order and limit to the top 3
const limitedSubjects = subjects.sort((a, b) => b.score - a.score).slice(0, 3);

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
          <h3 className="font-bold text-xl mt-9">{subject.name.toUpperCase()}</h3>
          <p className="text-sm mt-2">Score: {subject.score} / {subject.total}</p>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full ${subject.progressBarColor}`}
              style={{ width: `${(subject.score / subject.total) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectCard;
