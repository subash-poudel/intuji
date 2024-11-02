import HttpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import * as eventService from "../services/eventService";
import { EventRequestModel } from "../models/eventModels";
import {
  checkIfthereIsOverlapForDates,
  checkIfThereIsOverlapForRecurrenceRules,
  checkIfThereIsOverlapForRecurrenceWithSingleDate,
  convertToUtcDate,
} from "../helpers/dateHelper";

export function fetchAll(req: Request, res: Response, next: NextFunction) {
  eventService
    .getAllEvents()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const request: EventRequestModel = req.body;
  const startDate = new Date(request.start_date);
  const endDate = new Date(request.end_date);

  if (endDate < startDate) {
    next(new Error("End date cannot be before the start date."));
    return;
  }
  const allParticipantsEmails = request.participants.map((p) => p.email);
  const existingEventForparticipants =
    await eventService.getAllExistingEventsForParticipants(
      allParticipantsEmails
    );
  const existingEvents: EventRequestModel[] = existingEventForparticipants.map(
    (e: any) => {
      return {
        ...e,
        ...{ recurrence: e.recurrence ? JSON.parse(e.recurrence) : null },
      } as EventRequestModel;
    }
  );
  console.log("existing length", existingEvents.length);
  // check for overlaps
  for (const event of existingEvents) {
    console.log("event", event, "exist", existingEvents.length);
    if (checkIfThereIsOverlapForRecurrenceRules(request, event)) {
      const error = new Error(
        `There is scheduling conflict with for current event ${event.title} with existing event ${event.title}.`
      );
      next(error);
      return;
    }
  }
  // get all existing participant ids
  // console.log("ex", existingEventForparticipants);
  // get all existing events for participants between the dates for this request;

  try {
    const event = await eventService.createEvent(request);
    // insert participants
    const allParticipants = request.participants.map((p) => {
      return { ...p, event_id: event.id };
    });
    await eventService.insertParticipants(allParticipants);
    res.json({ data: event, message: "Event and participants registered." });
  } catch (err) {
    console.error(err);
    next(err);
  }
  eventService
    .createEvent(request)
    .then((data) => res.json({ data }))
    .catch((err) => {});
}
