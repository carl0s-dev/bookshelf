import Joi, { Schema } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { Result } from 'utils/result'
import { BadRequestException } from 'infra/exceptions/http.exception'

export function Validator(schema: Schema) {
  const middleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const result = await Result.fromAsync(() =>
      schema.validateAsync(request.body)
    )
    if (result.ok) {
      next()
      return
    }

    const error = result.error
    if (Joi.isError(error)) {
      const badRequest = new BadRequestException()

      response.status(badRequest.code).json({
        code: badRequest.code,
        name: badRequest.name,
        message: badRequest.message,
        details: error.details,
      })
      return
    }

    next(error)
  }

  return middleware
}
