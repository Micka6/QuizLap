import React, { useEffect, useState } from "react";
import api from "../../../api";

const UpcomingQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingQuizzes = async () => {
      try {
        const response = await api.get("/api/upcoming-quizzes/"); // Call the new endpoint
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching upcoming quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingQuizzes();
  }, []);

  return (
    <div className="mt-6 bg-white px-4 py-4 rounded-lg shadow">
      <h3 className="text-base font-semibold mb-1">Upcoming Quizzes</h3>
      {loading ? (
        <p>Loading...</p>
      ) : quizzes.length > 0 ? (
        <div className="flex flex-col gap-2">
          {quizzes.map((quiz, index) => (
            <div key={quiz.id} className="flex justify-between">
              <p>{quiz.quiz_name}</p>
              <span>{new Date(quiz.start_date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming quizzes!</p>
      )}
    </div>
  );
};

export default UpcomingQuizzes;
