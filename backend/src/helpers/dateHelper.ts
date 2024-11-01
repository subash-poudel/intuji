import { parse } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export function convertToUtcDate(date: string, time: string, timeZone: string) {
  const dateTimeString = `${date}T${time}`;
  return toZonedTime(dateTimeString, timeZone);
}
