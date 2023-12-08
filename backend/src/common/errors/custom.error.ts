class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
  }
}

class InvalidValueError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidValueError';
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
  }
}
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
  }
}

class NoContentError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoContentError';
  }
}

export {
  NotFoundError,
  ConflictError,
  InvalidValueError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError,
  InternalServerError,
  NoContentError,
};
