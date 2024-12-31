import React, { useEffect, useState } from "react";
import api from '../../../api';

// Dummy data with scores
const SubjectCard = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchSubjects = async () => {
      try {
        const response = await api.get("/api/student/classes/");
        const data = response.data.map((item) => ({
          name: item.subject_name,
          classCode: item.class_code,
          cardColor: "bg-lime-400", // default color
          progressBarColor: "bg-lime-500", // default color
          total: 100, // placeholder for total
        }));
        setSubjects(data.sort((a, b) => b.score - a.score).slice(0, 3));
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="w-full flex gap-4">
      {subjects.map((subject, index) => (
        <div
          key={index}
          className={`relative p-6 rounded-lg shadow-lg flex-1 ${subject.cardColor}`}
        >
          <span className="absolute top-4 left-4 text-2xl font-bold opacity-50">
            0{index + 1}
          </span>
          <h3 className="font-bold text-xl mt-9">{subject.name.toUpperCase()}</h3>
          <p className="text-sm mt-2">Class Code: {subject.classCode}</p>
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