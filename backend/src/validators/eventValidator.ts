import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import validate from "../helpers/validator";

const eventSchema = Joi.object({
  title: Joi.string().min(5).max(150).required(),
  description: Joi.string().max(500).optional().allow(""),
  start_time: Joi.date().required(),
  end_time: Joi.date().required().greater(Joi.ref("start_time")),
  time_zone: Joi.string().required(),
  location: Joi.string().optional().allow(""),
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
