import bookService from 'api/services/book.service'
import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from 'infra/enums/http-status'
import { BadRequestException } from 'infra/exceptions/http.exception'
import Joi from 'joi'
import { Result } from 'utils/result'

async function handleInsert(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body

    const data = await bookService.executeInsert(body)
    res.status(HttpStatus.OK).json(data)
  } catch (err) {
    next(err)
  }
}

async function handleSelectList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let limit = Number(req.query.limit)
    let offset = Number(req.query.offset)

    if (Number.isNaN(limit) || limit < 1) limit = 10
    if (Number.isNaN(offset) || offset < 0) offset = 0

    const query =
      typeof req.query.query === 'string' ? req.query.query : undefined

    const data = await bookService.executeSelectList({
      query,
      limit,
      offset,
    })
    res.status(HttpStatus.OK).json(data)
  } catch (err) {
    next(err)
  }
}

async function handleUpdate(req: Request, res: Response, next: NextFunction) {
  try {
    const validator = Joi.string().uuid({ version: 'uuidv4' })

    const result = await Result.fromAsync(() =>
      validator.validateAsync(req.params.id)
    )
    if (!result.ok) {
      throw new BadRequestException('Use um identificador válido.')
    }

    const id = result.value

    const data = await bookService.executeUpdate({
      id,
      ...req.body,
    })
    res.status(HttpStatus.OK).json(data)
  } catch (err) {
    next(err)
  }
}

export default Object.freeze({
  handleInsert,
  handleSelectList,
  handleUpdate,
})
