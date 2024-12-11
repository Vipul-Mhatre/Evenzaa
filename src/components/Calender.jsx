import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Calendar = ({ currentMonth, onDayClick, selectedDate, events, onEventReorder }) => {
  const start = startOfWeek(startOfMonth(currentMonth));
  const end = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start, end });

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceDate = source.droppableId;
    const destDate = destination.droppableId;
    const sourceIndex = source.index;
    const destIndex = destination.index;

    onEventReorder(sourceDate, destDate, sourceIndex, destIndex);
  };

  const eventColors = {
    work: "bg-green-300",
    personal: "bg-blue-300",
    others: "bg-yellow-300",
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-7 gap-2 p-4 bg-white rounded-lg shadow">
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          return (
            <div
              key={day}
              className={`cursor-pointer text-center p-2 rounded ${
                selectedDate === day ? "bg-blue-500 text-white" : "bg-gray-100"
              } hover:bg-blue-300`}
              onClick={() => onDayClick(day)}
            >
              <div>{format(day, "d")}</div>
              <Droppable droppableId={dateKey}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mt-2"
                  >
                    {events[dateKey]?.map((event, index) => (
                      <Draggable
                        key={`${dateKey}-${index}`}
                        draggableId={`${dateKey}-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-1 rounded mb-1 text-sm ${
                              eventColors[event.type] || "bg-gray-200"
                            }`}
                          >
                            {event.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Calendar;