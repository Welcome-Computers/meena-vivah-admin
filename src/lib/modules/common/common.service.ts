export class UnauthorizedError extends Error {
  statusCode = 401;

  constructor(message = "Authentication required") {
    super(message);
    this.name = "UnauthorizedError";
  }
}