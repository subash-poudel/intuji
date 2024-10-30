import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/api";
import { ApiEvent, CalendarEvent } from "../models/apiModels";

function mapApiEventToCalendarEvent(apiEvents: ApiEvent[]) {
  return apiEvents.map((event) => {
    const calendarEvent: CalendarEvent = {
      title: event.title,
      end: new Date(event.endDate),
      start: new Date(event.startDate),
      id: event.id,
      apiEvent: event,
    };
    return calendarEvent;
  });
}

export function useGetEvents(): {
  isLoading: boolean;
  error: Error | null;
  calendarEvents: CalendarEvent[] | null;
} {
  const { isLoading, error, data } = useQuery({
    queryKey: ["events"],
    queryFn: () => getData("/event"),
  });
  const events = data ? (data.events as ApiEvent[]) : null;
  const calendarEvents = mapApiEventToCalendarEvent(events ?? []);
  return { isLoading, error, calendarEvents };
}
