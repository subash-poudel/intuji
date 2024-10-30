import { format, parseISO } from "date-fns";

export enum DateFormat {
  "yyyy-MM-ddThh:mm" = "yyyy-MM-dd$$hh:mm",
  "do MMM yyyy h:mm a" = "do MMM yyyy h:mm a",
}

export function formatDateToString(
  date: Date | null | undefined,
  dateFormat: DateFormat
) {
  if (!date) {
    return "N/A";
  }
  return format(date, dateFormat);
}

export function formatDateUsingISO(input: string | null | undefined) {
  if (!input) {
    return "N/A";
  }
  const parsedDate = parseISO(input);
  const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
  return formattedDate;
}
