import React, { useState } from "react";
import { format } from "date-fns";

const EventList = ({ events, onDelete }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    const filtered = events.filter(
      (event) => event.date === formattedDate
    );
    setFilteredEvents(filtered);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-4">
      <div className="mb-4">
        <label
          htmlFor="date-picker"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Date
        </label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border rounded w-full"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">Events</h3>
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event, index) => (
          <div
            key={index}
            className="p-2 mb-2 bg-gray-50 rounded flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium">{event.name}</h4>
              <p className="text-sm text-gray-600">
                {`${event.startTime} - ${event.endTime}`}
              </p>
              <p className="text-sm">{event.description}</p>
            </div>
            <button
              onClick={() => onDelete(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No events found for the selected date.</p>
      )}
    </div>
  );
};

export default EventList;