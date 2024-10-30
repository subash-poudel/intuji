import HttpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import * as eventService from "../services/eventService";

export function fetchAll(req: Request, res: Response, next: NextFunction) {
  eventService
    .getAllEvents()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

export function createEvent(req: Request, res: Response, next: NextFunction) {
  eventService
    .createEvent(req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}
