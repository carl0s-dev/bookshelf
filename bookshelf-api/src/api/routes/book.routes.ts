import { Router } from 'express'
import bookController from 'api/controllers/book.controller'
import { Validator } from 'api/middlewares/validator.middleware'
import { isAuthenticated } from 'api/middlewares/is-authenticated.middleware'
import { BookSchema, PartialBookSchema } from 'utils/schemas/book.schemas'

export const bookRouter = Router()

bookRouter.post(
  '/',
  [isAuthenticated, Validator(BookSchema)],
  bookController.handleInsert
)

bookRouter.patch(
  '/:id',
  [isAuthenticated, Validator(PartialBookSchema)],
  bookController.handleUpdate
)

bookRouter.get('/:id', bookController.handleSelectOne)
bookRouter.get('/', bookController.handleSelectAll)
