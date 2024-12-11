import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Calendar from "./components/Calender";
import EventModal from "./components/EventModal";
import EventList from "./components/EventList";
import { getFormattedDate } from "./utils/date";
import { saveToLocalStorage, loadFromLocalStorage } from "./utils/storage";
import { format, addMonths, subMonths } from "date-fns";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);  // Currently selected date
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());  // Current month state

  // Load events from local storage on component mount
  useEffect(() => {
    ReactModal.setAppElement('#root');
    const loadedEvents = loadFromLocalStorage("events");
    setEvents(loadedEvents || {});
  }, []);

  // Save events to local storage whenever they change
  useEffect(() => {
    saveToLocalStorage("events", events);
  }, [events]);

  // Save new event for the selected date
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

    // Save the event
    setEvents({
      ...events,
      [dateKey]: [...eventList, eventDetails],
    });
    setShowModal(false);  // Close modal after saving event
  };

  // Filter events based on search input
  const filteredEvents = Object.entries(events).filter(([date, eventList]) =>
    eventList.some((event) =>
      event.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Change the current month (next or previous month)
  const handleMonthChange = (direction) => {
    setCurrentMonth((prevMonth) =>
      direction === "next" ? addMonths(prevMonth, 1) : subMonths(prevMonth, 1)
    );
  };

  // Handle day click
  const handleDayClick = (day) => {
    setSelectedDate(day);
    setShowModal(true);  // Show modal when a day is clicked
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search events"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded w-full p-2 mb-4"
      />

      {/* Filtered Events Display */}
      {filteredEvents.map(([date, eventList]) => (
        <div key={date} className="mb-4">
          <h4 className="font-semibold text-lg">{date}</h4>
          {eventList.map((event, index) => (
            <p key={index} className="text-sm text-gray-700">
              {event.name}
            </p>
          ))}
        </div>
      ))}

      {/* Month Navigation */}
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

      {/* Calendar component */}
      <Calendar
        currentMonth={currentMonth}  // Pass current month to calendar
        onDayClick={handleDayClick}  // Handle day click
        selectedDate={selectedDate}  // Highlight selected date
        events={events}  // Pass events to Calendar
      />

      {/* Event Modal */}
      <EventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveEvent}
        existingEvent={null}  // Existing event is null since we're adding a new one
      />
    </div>
  );
};

export default App;