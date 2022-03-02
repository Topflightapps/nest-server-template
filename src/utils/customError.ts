export default class CustomError extends Error {
  statusCode: null | number;

  constructor(message: string, statusCode: number) {
    super()
    this.message = message;
    this.statusCode = statusCode
  }
}