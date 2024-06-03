class ApiError extends Error {
  constructor(status, message, errors) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = status;
    this.success = false;
    this.message = message;
    // this.errors = errors;

    Error.captureStackTrace(this);
  }
}

module.exports = ApiError;
