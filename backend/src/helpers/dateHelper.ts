import { addMinutes, isAfter, isBefore, parse } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import {
  Day,
  EventRequestModel,
  RecurrenceRule,
  RecurrenceType,
} from "../models/eventModels";
import { ByWeekday, Frequency, RRule, RRuleSet, Weekday } from "rrule";

export function convertToUtcDate(date: string, time: string, timeZone: string) {
  const dateTimeString = `${date}T${time}`;
  return toZonedTime(dateTimeString, timeZone);
}

function getFrequency(type: RecurrenceType): Frequency {
  switch (type) {
    case RecurrenceType.DAILY:
      return Frequency.DAILY;
    case RecurrenceType.MONTHLY:
      return Frequency.MONTHLY;
    case RecurrenceType.WEEKLY:
      return Frequency.WEEKLY;
  }
}

function getByWeekDay(recurrence: RecurrenceRule): string[] | undefined {
  const { byweekday, freq } = recurrence;
  if (freq !== RecurrenceType.WEEKLY) {
    return;
  }
  if (byweekday === null || byweekday === undefined) {
    return;
  }
  const days = [];
  for (const day of byweekday) {
    switch (day) {
      case Day.Monday:
        days.push("MO");
        break;
      case Day.Tuesday:
        days.push("TU");
        break;
      case Day.Wednesday:
        days.push("WE");
        break;
      case Day.Thursday:
        days.push("TH");
        break;
      case Day.Friday:
        days.push("FR");
        break;
      case Day.Saturday:
        days.push("SA");
        break;
      case Day.Sunday:
        days.push("SU");
        break;
    }
  }
  return days;
}

export function getRRuleFromEventRequestModel(
  model: EventRequestModel
): RRule | undefined {
  if (!model.recurrence) {
    return;
  }
  const { freq, bymonthday } = model.recurrence;
  const startDate = convertToUtcDate(
    model.start_date,
    model.start_time,
    model.time_zone
  );
  const endDateTemp = convertToUtcDate(
    model.end_date,
    model.start_time,
    model.time_zone
  );
  const endDate = addMinutes(endDateTemp, model.duration);
  const rrule = new RRule({
    freq: getFrequency(freq as RecurrenceType),
    byweekday: getByWeekDay(model.recurrence) as ByWeekday[],
    bymonthday: bymonthday,
    dtstart: startDate,
    until: endDate,
  });
  return rrule;
}

export function checkIfthereIsOverlapForDates(
  date1Start: Date,
  date1End: Date,
  date2Start: Date,
  date2End: Date
) {
  if (doDatesOverlap(date1Start, date1End, date2Start, date2End)) {
    return true;
  }
  return false;
}

export function checkIfThereIsOverlapForRecurrenceWithSingleDate(
  recurrence: RecurrenceRule,
  startDate: Date,
  endDate: Date,
  durationInMinutes: number,
  dateToTestStart: Date,
  dateToTestEnd: Date
) {
  const rrule = new RRule({
    freq: getFrequency(recurrence.freq as RecurrenceType),
    byweekday: getByWeekDay(recurrence) as ByWeekday[],
    bymonthday: recurrence.bymonthday,
    dtstart: startDate,
    until: endDate,
  });
  const allRecurenceDates = rrule.all();
  for (const recurrenceStart of allRecurenceDates) {
    const recurrenceEnd = addMinutes(recurrenceStart, durationInMinutes);
    if (
      doDatesOverlap(
        dateToTestStart,
        dateToTestEnd,
        recurrenceStart,
        recurrenceEnd
      )
    ) {
      return true;
    }
  }
  return false;
}

function doDatesOverlap(start1: Date, end1: Date, start2: Date, end2: Date) {
  const startDate1 = new Date(start1);
  const endDate1 = new Date(end1);
  const startDate2 = new Date(start2);
  const endDate2 = new Date(end2);

  // Check if the date ranges overlap
  return startDate1 < endDate2 && endDate1 > startDate2;
}

export function checkIfThereIsOverlapForRecurrenceRules(
  model1: EventRequestModel,
  model2: EventRequestModel
) {
  const rrule1 = getRRuleFromEventRequestModel(model1);
  const rrule2 = getRRuleFromEventRequestModel(model2);
  if (!rrule1 || !rrule2) {
    return false;
  }
  // This is for optimization we are only interested in dates that overlap(venn-diagram) this way we don't have to loop entire occurrences
  // new Date() is okay here if we ensure that a rule is always created with endDate in mind
  const allRecurrenceForRule1 = rrule1.between(
    rrule2.options.dtstart,
    rrule2.options.until ?? new Date(),
    true
  );
  const allRecurenceDatesForRule2 = rrule2.between(
    rrule1.options.dtstart,
    rrule1.options.until ?? new Date(),
    true
  );
  // console.log({ allRecurrenceForRule1, allRecurenceDatesForRule2 });
  for (const date1Start of allRecurrenceForRule1) {
    const date1End = addMinutes(date1Start, model1.duration);
    for (const date2Start of allRecurenceDatesForRule2) {
      const date2End = addMinutes(date2Start, model2.duration);
      if (doDatesOverlap(date1Start, date1End, date2Start, date2End)) {
        return true;
      }
    }
  }
  return false;
}
