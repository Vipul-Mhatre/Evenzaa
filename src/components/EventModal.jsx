import React, { useState } from "react";

const EventModal = ({ onSave, onClose }) => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    startTime: "",
    endTime: "",
    type: "others",
  });

  const handleSave = () => {
    onSave(eventDetails);
    setEventDetails({
      name: "",
      startTime: "",
      endTime: "",
      type: "others",
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Event</h2>
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
        <select
          value={eventDetails.type}
          onChange={(e) =>
            setEventDetails({ ...eventDetails, type: e.target.value })
          }
          className="border rounded w-full p-2 mb-2"
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="others">Others</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;