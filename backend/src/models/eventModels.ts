export interface RecurrenceRule {
  freq: string;
  bymonthday?: number[];
  byweekday?: string[];
}

export interface EventRequestModel {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  time_zone: string;
  location: string;
  recurrence?: RecurrenceRule;
}

export enum RecurrenceType {
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
}
