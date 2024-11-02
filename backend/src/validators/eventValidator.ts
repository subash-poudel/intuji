import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import validate from "../helpers/validator";
import { Day, RecurrenceType, RsvpStatus } from "../models/eventModels";

export const recurrenceSchema = Joi.object({
  freq: Joi.string()
    .valid(RecurrenceType.DAILY, RecurrenceType.WEEKLY, RecurrenceType.MONTHLY)
    .required(),
  bymonthday: Joi.array()
    .min(1)
    .items(Joi.number().integer().min(1).max(31))
    .when("freq", {
      is: RecurrenceType.MONTHLY,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  byweekday: Joi.array()
    .min(1)
    .items(
      Joi.string().valid(
        Day.Monday,
        Day.Tuesday,
        Day.Wednesday,
        Day.Thursday,
        Day.Friday,
        Day.Saturday,
        Day.Sunday
      )
    )
    .when("freq", {
      is: RecurrenceType.WEEKLY,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
});

export const participantsSchema = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  email: Joi.string().email().min(2).max(150).required(),
  rsvp_status: Joi.string()
    .valid(RsvpStatus.accepted, RsvpStatus.declined, RsvpStatus.pending)
    .required(),
});

export const eventSchema = Joi.object({
  title: Joi.string().min(5).max(150).required(),
  description: Joi.string().max(500).optional().allow(""),
  duration: Joi.number()
    .min(15)
    .max(12 * 60)
    .required(),
  start_date: Joi.string()
    .pattern(/^202[0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)
    .required(),
  end_date: Joi.string()
    .pattern(/^202[0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)
    .required(),
  start_time: Joi.string()
    .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .message("Time should be provided in 24 hour format like 13:00"),
  time_zone: Joi.string().required(),
  location: Joi.string().optional().allow(""),
  recurrence: recurrenceSchema.optional(),
  participants: Joi.array().min(1).items(participantsSchema).required(),
});

export function eventValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return validate(req.body, eventSchema)
    .then(() => next())
    .catch((err) => next(err));
}
