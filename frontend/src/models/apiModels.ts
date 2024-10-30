export interface ApiEvent {
  id: number;
  title: string;
  description: string;
  participants: string;
  cron: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  id: number;
  apiEvent: ApiEvent;
}
