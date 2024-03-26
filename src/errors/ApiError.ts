export class ApiError extends Error {
  constructor(readonly message: string, readonly statusCode: number) {
    super();
  }
}

export class NotFoundError extends ApiError {
  constructor(readonly message: string = "Not found") {
    super(message, 404);
  }
}
export class ForbiddenError extends ApiError {
  constructor(readonly message: string = "Action not allowed") {
    super(message, 403);
  }
}
export class UnauthorizedError extends ApiError {
  constructor(readonly message: string = "Unauthorized request") {
    super(message, 401);
  }
}
export class InternalServerError extends ApiError {
  constructor(readonly message: string = "Internal server error") {
    super(message, 500);
  }
}
export class BadRequestError extends ApiError {
  constructor(readonly message: string = "Bad request") {
    super(message, 400);
  }
}
