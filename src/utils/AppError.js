export class GLobalError extends Error {
  constructor(message) {
    super(message);
    this.name = "Global Error";
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized Error";
  }
}
