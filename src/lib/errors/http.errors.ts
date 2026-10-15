
export class UnauthorizedError extends Error {
  statusCode = 401;

  constructor(message = "Authentication required") {
    super(message);
    this.name = "UnauthorizedError";
  }
}


export class ForbiddenError extends Error {
  statusCode = 403;

  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}