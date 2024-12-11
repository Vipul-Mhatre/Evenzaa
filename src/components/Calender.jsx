import React from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";

const Calendar = ({ currentMonth, onDayClick, selectedDate, events }) => {
  const start = startOfWeek(startOfMonth(currentMonth));
  const end = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-white rounded-lg shadow">
      {days.map((day) => (
        <div
          key={day}
          className={`cursor-pointer text-center p-2 rounded ${selectedDate === day ? "bg-blue-500 text-white" : "bg-gray-100"} hover:bg-blue-300`}
          onClick={() => onDayClick(day)}  
        >
          <div>{format(day, "d")}</div>
          {events[format(day, "yyyy-MM-dd")] && (
            <div className="text-xs text-gray-500 mt-1">
              {events[format(day, "yyyy-MM-dd")].length} event(s)
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Calendar;