import React from "react";

const Calendar = ({ currentDate, setCurrentDate }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = Array.from({ length: firstDayOfMonth + daysInMonth }, (_, i) =>
    i < firstDayOfMonth ? "" : i - firstDayOfMonth + 1
  );

  const changeMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  // Get the current day to highlight
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  return (
    <div>
      <h3 className="text-base font-semibold">Calendar</h3>
      <div className="bg-white p-4 rounded-lg shadow mt-3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="px-6 py-1 rounded-md text-2xl text-secondary hover:bg-indigo-900 hover:text-white"
          >
            &lt;
          </button>
          <p className="font-bold text-sm">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </p>
          <button
            onClick={() => changeMonth(1)}
            className="px-6 py-1 rounded-md text-2xl text-secondary hover:bg-indigo-900 hover:text-white"
          >
            &gt;
          </button>
        </div>
        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center font-bold text-sm">
          {weekdays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        {/* Days */}
        <div className="grid grid-cols-7 text-center mt-2 gap-2">
          {days.map((day, index) => {
            const isToday =
              day === todayDay &&
              month === todayMonth &&
              year === todayYear;
            return (
              <div
                key={index}
                className={`py-1 text-sm rounded-md ${
                  isToday
                    ? "bg-indigo-900 text-white font-bold" // Active today's date
                    : " hover:bg-gray-300"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
