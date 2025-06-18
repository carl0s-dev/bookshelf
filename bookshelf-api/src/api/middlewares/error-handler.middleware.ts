import { Request, Response, NextFunction } from 'express'
import {
  HttpException,
  InternalServerError,
} from 'infra/exceptions/http.exception'

export function errorHandler(
  err: unknown,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (err instanceof HttpException) {
    response.status(err.code).json({
      code: err.code,
      name: err.name,
      message: err.message,
    })
    return
  }

  const internalServerError = new InternalServerError()

  console.error(
    `[${internalServerError.timestamp}] [${request.method} ${request.url}] Unhandled Error:`,
    err
  )

  response.status(internalServerError.code).json({
    code: internalServerError.code,
    name: internalServerError.name,
    message: internalServerError.message,
    timestamp: internalServerError.timestamp,
  })
}
