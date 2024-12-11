import React, { useState } from "react";
import ReactModal from "react-modal";

const EventModal = ({ isOpen, onClose, onSave, existingEvent }) => {
  const [eventDetails, setEventDetails] = useState(
    existingEvent || { name: "", startTime: "", endTime: "", description: "" }
  );

  const handleSave = () => {
    onSave(eventDetails);  
    setEventDetails({ name: "", startTime: "", endTime: "", description: "" });  
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
    >
      <h2 className="text-xl font-semibold mb-4">
        {existingEvent ? "Edit Event" : "Add Event"}
      </h2>
      <input
        type="text"
        placeholder="Event Name"
        value={eventDetails.name}
        onChange={(e) =>
          setEventDetails({ ...eventDetails, name: e.target.value })
        }
        className="border rounded w-full p-2 mb-2"
      />
      <input
        type="time"
        value={eventDetails.startTime}
        onChange={(e) =>
          setEventDetails({ ...eventDetails, startTime: e.target.value })
        }
        className="border rounded w-full p-2 mb-2"
      />
      <input
        type="time"
        value={eventDetails.endTime}
        onChange={(e) =>
          setEventDetails({ ...eventDetails, endTime: e.target.value })
        }
        className="border rounded w-full p-2 mb-2"
      />
      <textarea
        placeholder="Description"
        value={eventDetails.description}
        onChange={(e) =>
          setEventDetails({ ...eventDetails, description: e.target.value })
        }
        className="border rounded w-full p-2 mb-2"
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save
        </button>
      </div>
    </ReactModal>
  );
};

export default EventModal;