import React from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";

const Calendar = ({ currentMonth, onDayClick, selectedDate }) => {
  const start = startOfWeek(startOfMonth(currentMonth));
  const end = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="calendar-grid">
      {days.map((day) => (
        <div
          key={day}
          className={`day ${selectedDate === day ? "selected" : ""}`}
          onClick={() => onDayClick(day)}
        >
          {format(day, "d")}
        </div>
      ))}
    </div>
  );
};

export default Calendar;