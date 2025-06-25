export default class AppError extends Error {
  isOperational: boolean
  statusCode: number
  status: string

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error"

    Error.captureStackTrace(this, this.constructor)
  }
}
