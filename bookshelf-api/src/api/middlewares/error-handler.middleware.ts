import { Request, Response } from 'express'
import {
  HttpException,
  InternalServerError,
} from 'infra/exceptions/http.exception'

export function errorHandler(
  err: unknown,
  request: Request,
  response: Response
) {
  if (err instanceof HttpException) {
    response.status(err.code).json({
      code: err.code,
      name: err.name,
      message: err.message,
    })
    return
  }

  const timestamp = new Date().toISOString()

  console.error(
    `[${timestamp}] [${request.method} ${request.url}] Unhandled Error:`,
    err instanceof Error ? err.stack : err
  )

  const internalServerError = new InternalServerError()

  response.status(internalServerError.code).json({
    code: internalServerError.code,
    name: internalServerError.name,
    message: internalServerError.message,
    timestamp: timestamp,
  })
}
