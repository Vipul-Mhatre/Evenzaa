import React, { useState } from "react";
import ReactModal from "react-modal";

const EventModal = ({ isOpen, onClose, onSave, existingEvent }) => {
  const [eventDetails, setEventDetails] = useState(existingEvent || { name: "", startTime: "", endTime: "", description: "" });

  const handleSave = () => {
    onSave(eventDetails);
    setEventDetails({ name: "", startTime: "", endTime: "", description: "" });
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{existingEvent ? "Edit Event" : "Add Event"}</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={eventDetails.name}
        onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
      />
      <input
        type="time"
        value={eventDetails.startTime}
        onChange={(e) => setEventDetails({ ...eventDetails, startTime: e.target.value })}
      />
      <input
        type="time"
        value={eventDetails.endTime}
        onChange={(e) => setEventDetails({ ...eventDetails, endTime: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={eventDetails.description}
        onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
    </ReactModal>
  );
};

export default EventModal;