import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Calender from "./components/Calender"; 
import EventModal from "./components/EventModal";
import EventList from "./components/EventList";
import { getFormattedDate } from "./utils/date";
import { saveToLocalStorage, loadFromLocalStorage } from "./utils/storage";
import { format, addMonths, subMonths } from "date-fns"; 

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    ReactModal.setAppElement("#root");
    const loadedEvents = loadFromLocalStorage("events");
    setEvents(loadedEvents || {});
  }, []);

  useEffect(() => {
    saveToLocalStorage("events", events);
  }, [events]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowModal(true); // Open the modal only when a date is selected
  };

  const handleSaveEvent = (eventDetails) => {
    const dateKey = getFormattedDate(selectedDate);
    const eventList = events[dateKey] || [];
    const isOverlap = eventList.some(
      (event) =>
        event.startTime < eventDetails.endTime &&
        eventDetails.startTime < event.endTime
    );

    if (isOverlap) {
      alert("Event time overlaps with an existing event!");
      return;
    }

    setEvents({
      ...events,
      [dateKey]: [...eventList, eventDetails],
    });
    setShowModal(false); 
  };

  const handleDeleteEvent = (dateKey, index) => {
    const eventList = [...(events[dateKey] || [])];
    eventList.splice(index, 1);
    setEvents({ ...events, [dateKey]: eventList });
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth((prevMonth) =>
      direction === "next" ? addMonths(prevMonth, 1) : subMonths(prevMonth, 1)
    );
  };

  const exportEvents = (formatType) => {
    const monthEvents = Object.entries(events)
      .filter(([date]) =>
        format(currentMonth, "yyyy-MM") === date.substring(0, 7)
      )
      .map(([date, eventList]) => ({ date, events: eventList }));

    const data =
      formatType === "csv" ? convertToCSV(monthEvents) : JSON.stringify(monthEvents, null, 2);

    const blob = new Blob([data], {
      type: formatType === "csv" ? "text/csv" : "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `events.${formatType}`; // Fixed template literal error 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    const headers = ["Date", "Event Name", "Start Time", "End Time", "Description"];
    const rows = data.flatMap(({ date, events }) =>
      events.map((event) => [
        date,
        event.name,
        event.startTime,
        event.endTime,
        event.description,
      ])
    );

    return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Search events"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded w-full p-2 mb-4"
      />

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange("prev")}
          className="bg-gray-200 text-gray-700 p-2 rounded"
        >
          Previous
        </button>
        <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          onClick={() => handleMonthChange("next")}
          className="bg-gray-200 text-gray-700 p-2 rounded"
        >
          Next
        </button>
      </div>

      <Calender
        currentMonth={currentMonth}
        onDayClick={handleDayClick} 
        selectedDate={selectedDate}
        events={events}
      />

      {selectedDate && (
        <EventList
          events={events[getFormattedDate(selectedDate)] || []}
          onDelete={(index) =>
            handleDeleteEvent(getFormattedDate(selectedDate), index)
          }
        />
      )}

      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => exportEvents("json")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export JSON
        </button>
        <button
          onClick={() => exportEvents("csv")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export CSV
        </button>
      </div>

      {showModal && (
        <EventModal
          isOpen={showModal}
          onClose={() => setShowModal(false)} 
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default App;