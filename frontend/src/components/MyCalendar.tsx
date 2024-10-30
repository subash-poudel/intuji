import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "../models/apiModels";
import ViewEventModal from "./ViewEventModal";
import { useGetEvents } from "../hooks/useGetEvents";
import CreateEventModal from "./CreateEventModal";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [showcreateEventModal, setShowCreateEventModal] = useState(false);
  const [showViewEventModal, setShowViewEventModal] = useState(false);
  const [eventTime, setEventTime] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  //   const { isLoading, error, calendarEvents } = useGetEvents();

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   }
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable
        onSelectSlot={(slotInfo) => {
          const { start, end } = slotInfo;
          setEventTime({ startDate: start, endDate: end });
          setShowCreateEventModal(!showcreateEventModal);
        }}
        onSelectEvent={(event, e) => {
          setSelectedEvent(event);
          setShowViewEventModal(true);
        }}
      />
      <CreateEventModal
        key={showcreateEventModal ? 1 : 0}
        isOpen={showcreateEventModal}
        closeModal={() => setShowCreateEventModal(false)}
        startDate={eventTime?.startDate}
        endDate={eventTime?.endDate}
      />
      <ViewEventModal
        key={showViewEventModal ? -1 : -2}
        isOpen={showViewEventModal}
        closeModal={() => setShowViewEventModal(false)}
        calendarEvent={selectedEvent}
      />
    </div>
  );
};

export default MyCalendar;
