import HttpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import * as eventService from "../services/eventService";

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req: Request, res: Response, next: NextFunction) {
  eventService
    .getAllEvents()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}
