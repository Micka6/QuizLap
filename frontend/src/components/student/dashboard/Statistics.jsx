import React from "react";

const Statistics = () => (
  <div>
    <h3 className="text-base font-semibold">Statistics</h3>
    <div className="min-h-28 grid grid-cols-3 gap-2 mt-3">
      {[
        { value: 2, label: "Quiz Completed" },
        { value: 3, label: "Upcoming Quiz" },
        { value: 1, label: "Past Due" },
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
