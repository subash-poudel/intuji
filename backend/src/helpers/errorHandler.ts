import HttpStatus from "http-status-codes";

function buildError(err: any) {
  console.error(err);
  if (err.isJoi) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map((err: any) => {
          return {
            message: err.message,
            param: err.path.join("."),
          };
        }),
    };
  }

  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error,
    };
  }

  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message:
      err.message ?? HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  };
}

export default buildError;
