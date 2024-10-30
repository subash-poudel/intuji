import HttpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import buildError from "../helpers/errorHandler";

export function notFound(req: Request, res: Response) {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    },
  });
}

export function methodNotAllowed(req: Request, res: Response) {
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
    error: {
      code: HttpStatus.METHOD_NOT_ALLOWED,
      message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
    },
  });
}

export function bodyParser(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = buildError(err);

  res.status(error.code).json({
    error,
  });
}

export function genericErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  const error = buildError(err);

  res.status(error.code).json({ error });
}
