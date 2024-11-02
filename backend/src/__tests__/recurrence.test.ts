import {
  checkIfthereIsOverlapForDates,
  checkIfThereIsOverlapForRecurrenceRules,
} from "../helpers/dateHelper";
import {
  EventRequestModel,
  RecurrenceType,
  RsvpStatus,
} from "../models/eventModels";

describe("Recurrence test", () => {
  it("Test that two dates overlap", () => {
    const date1Start = new Date(2024, 1, 1, 4, 0);
    const date1End = new Date(2024, 1, 1, 5, 0);

    const date2Start = new Date(2024, 1, 1, 4, 30);
    const date2End = new Date(2024, 1, 1, 5, 30);

    const actual = checkIfthereIsOverlapForDates(
      date1Start,
      date1End,
      date2Start,
      date2End
    );
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it("Test that two dates dont overlap", () => {
    const date1Start = new Date(2024, 1, 1, 4, 0);
    const date1End = new Date(2024, 1, 1, 5, 0);

    const date2Start = new Date(2024, 1, 1, 5, 30);
    const date2End = new Date(2024, 1, 1, 6, 30);

    const actual = checkIfthereIsOverlapForDates(
      date1Start,
      date1End,
      date2Start,
      date2End
    );
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it("Test that two recurrences overlap", () => {
    const event1: EventRequestModel = {
      description: "",
      duration: 30,
      start_date: "2024-01-01",
      end_date: "2024-01-30",
      location: "",
      start_time: "04:00:00",
      time_zone: "Asia/Kathmandu",
      title: "Event1",
      recurrence: {
        freq: RecurrenceType.DAILY,
      },
      participants: [
        {
          email: "a@a.com",
          name: "aaaaaaaaa",
          rsvp_status: RsvpStatus.pending,
        },
      ],
    };
    // 15 mins overlap
    const event2: EventRequestModel = {
      description: "",
      duration: 30,
      start_date: "2024-01-15",
      end_date: "2024-01-30",
      location: "",
      start_time: "03:45:00",
      time_zone: "Asia/Kathmandu",
      title: "Event2",
      recurrence: {
        freq: RecurrenceType.DAILY,
      },
      participants: [
        {
          email: "a@a.com",
          name: "aaaaaaaaa",
          rsvp_status: RsvpStatus.pending,
        },
      ],
    };

    const actual = checkIfThereIsOverlapForRecurrenceRules(event1, event2);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it("Test that two recurrences dont overlap", () => {
    const event1: EventRequestModel = {
      description: "",
      duration: 30,
      start_date: "2024-01-01",
      end_date: "2024-01-30",
      location: "",
      start_time: "04:00:00",
      time_zone: "Asia/Kathmandu",
      title: "Event1",
      recurrence: {
        freq: RecurrenceType.DAILY,
      },
      participants: [
        {
          email: "a@a.com",
          name: "aaaaaaaaa",
          rsvp_status: RsvpStatus.pending,
        },
      ],
    };
    const event2: EventRequestModel = {
      description: "",
      duration: 30,
      start_date: "2024-01-15",
      end_date: "2024-01-30",
      location: "",
      start_time: "01:45:00",
      time_zone: "Asia/Kathmandu",
      title: "Event2",
      recurrence: {
        freq: RecurrenceType.DAILY,
      },
      participants: [
        {
          email: "a@a.com",
          name: "aaaaaaaaa",
          rsvp_status: RsvpStatus.pending,
        },
      ],
    };

    const actual = checkIfThereIsOverlapForRecurrenceRules(event1, event2);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it("Test that copy of an event overlaps", () => {
    const event1: EventRequestModel = {
      title: "recurrence daily 1",
      description: "Testing testing abc",
      duration: 60,
      start_time: "04:00",
      start_date: "2024-01-01",
      end_date: "2024-01-01",
      time_zone: "America/New_York",
      location: "Central Park, NY",
      recurrence: { freq: "DAILY" },
      participants: [
        {
          name: "aaaaaaaaaaa",
          email: "a@a.com",
          rsvp_status: RsvpStatus.pending,
        },
      ],
    };
    const event2: EventRequestModel = { ...event1 };

    const actual = checkIfThereIsOverlapForRecurrenceRules(event1, event2);
    const expected = true;
    expect(actual).toEqual(expected);
  });
});
