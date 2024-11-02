export interface RecurrenceRule {
  freq: string;
  bymonthday?: number[];
  byweekday?: string[];
}

export interface Participants {
  name: string;
  email: string;
  rsvp_status: RsvpStatus;
}

export interface EventRequestModel {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  duration: number;
  time_zone: string;
  location: string;
  recurrence: RecurrenceRule;
  participants: Participants[];
}

export enum RecurrenceType {
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
}

export enum Day {
  "Monday" = "Monday",
  "Tuesday" = "Tuesday",
  "Wednesday" = "Wednesday",
  "Thursday" = "Thursday",
  "Friday" = "Friday",
  "Saturday" = "Saturday",
  "Sunday" = "Sunday",
}

export enum RsvpStatus {
  "accepted" = "accepted",
  "declined" = "declined",
  "pending" = "pending",
}
