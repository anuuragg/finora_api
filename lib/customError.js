class CustomError extends Error {
  error;
  status;
  constructor(err, status) {
    super(err);
    this.status = status;
  }
}

module.exports = CustomError;