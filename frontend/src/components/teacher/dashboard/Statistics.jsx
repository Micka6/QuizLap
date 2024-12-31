import React from "react";

const Statistics = () => (
  <div>
    <h3 className="text-base font-semibold">Statistics</h3>
    <div className="min-h-28 grid grid-cols-3 gap-2 mt-3">
      {[
        { value: 2, label: "Total Classes" },
        { value: 3, label: "Total Student" },
        { value: 1, label: "Total Quizzes" },
      ].map((stat, index) => (
        <div key={index} className="flex flex-col justify-evenly bg-white p-4 rounded-lg shadow ">
          <p className="text-xl font-bold">{stat.value}</p>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Statistics;
