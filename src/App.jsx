import React, { useState, useEffect } from "react";
import Calender from "./components/Calender";

import EventModal from "./components/EventModal";
import EventList from "./components/EventList";
import { getFormattedDate } from "./utils/date";
import { saveToLocalStorage, loadFromLocalStorage } from "./utils/storage";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Load events from local storage when the app first loads
  useEffect(() => {
    const loadedEvents = loadFromLocalStorage("events");
    setEvents(loadedEvents);
  }, []);

  useEffect(() => {
    saveToLocalStorage("events", events);
  }, [events]);

  const handleSaveEvent = (eventDetails) => {
    const dateKey = getFormattedDate(selectedDate); 
    const eventList = events[dateKey] || []; 
    const isOverlap = eventList.some(
      (event) =>
        event.startTime < eventDetails.endTime && eventDetails.startTime < event.endTime
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

  return (
    <div>
      <Calender
        onDayClick={setSelectedDate} 
        selectedDate={selectedDate} 
      />
      
      {selectedDate && (
        <EventList
          events={events[getFormattedDate(selectedDate)] || []} 
          onDelete={(index) => {
            const dateKey = getFormattedDate(selectedDate);
            const updatedEvents = [...(events[dateKey] || [])];
            updatedEvents.splice(index, 1);
            setEvents({ ...events, [dateKey]: updatedEvents }); 
          }}
        />
      )}
      
      <button onClick={() => setShowModal(true)}>Add Event</button>

      <EventModal
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSave={handleSaveEvent} 
      />
    </div>
  );
};

export default App;