import React from "react";

const EventList = ({ events, onDelete }) => (
  <div className="event-list">
    <h3>Events</h3>
    {events.map((event, index) => (
      <div key={index} className="event-item">
        <h4>{event.name}</h4>
        <p>{`${event.startTime} - ${event.endTime}`}</p>
        <p>{event.description}</p>
        <button onClick={() => onDelete(index)}>Delete</button>
      </div>
    ))}
  </div>
);

export default EventList;