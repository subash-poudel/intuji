import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import validate from "../helpers/validator";
import { RecurrenceType } from "../models/eventModels";

export const recurrenceSchema = Joi.object({
  freq: Joi.string()
    .valid(RecurrenceType.DAILY, RecurrenceType.WEEKLY, RecurrenceType.MONTHLY)
    .required(),
  bymonthday: Joi.array()
    .items(Joi.number().integer().min(1).max(31))
    .when("freq", {
      is: RecurrenceType.MONTHLY,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  byweekday: Joi.array()
    .items(
      Joi.string().valid(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      )
    )
    .when("freq", {
      is: RecurrenceType.WEEKLY,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
});

export const eventSchema = Joi.object({
  title: Joi.string().min(5).max(150).required(),
  description: Joi.string().max(500).optional().allow(""),
  start_time: Joi.string().isoDate().required(),
  end_time: Joi.string().isoDate().required(),
  time_zone: Joi.string().required(),
  location: Joi.string().optional().allow(""),
  recurrence: recurrenceSchema.optional(),
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
