import { Router } from 'express'
import bookController from 'api/controllers/book.controller'
import { Validator } from 'api/middlewares/validator.middleware'
import { BookSchema, PartialBookSchema } from 'infra/models/book.model'
import { isAuthenticated } from 'api/middlewares/is-authenticated.middleware'

export const bookRouter = Router()

bookRouter.post(
  '/',
  [isAuthenticated, Validator(BookSchema)],
  bookController.handleInsert
)
bookRouter.get('/list', bookController.handleSelectList)
bookRouter.put(
  '/:id',
  [isAuthenticated, Validator(PartialBookSchema)],
  bookController.handleUpdate
)
