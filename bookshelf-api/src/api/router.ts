import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { authRouter } from './routes/auth.routes'
import { bookRouter } from './routes/book.routes'
import {
  BadRequestException,
  UnauthorizedException,
  InternalServerError,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  TooManyRequestsException,
} from 'infra/exceptions/http.exception'

export const router = Router()

router.use('/auth', authRouter)
router.use('/books', bookRouter)

const swaggerSpec = swaggerJSDoc({
  definition: {
    failOnErrors: true,
    openapi: '3.0.0',
    info: {
      title: 'Bookshelf API',
      version: '0.1.0',
      description: 'Documentation of Bookshelf API',
    },
    components: {
      schemas: {
        BadRequest: new BadRequestException().getSchema(),
        Unauthorized: new UnauthorizedException().getSchema(),
        Forbidden: new ForbiddenException().getSchema(),
        NotFound: new NotFoundException().getSchema(),
        Conflict: new ConflictException().getSchema(),
        TooManyRequests: new TooManyRequestsException().getSchema(),
        InternalServerError: new InternalServerError().getSchema(),
      },
    },
  },
  apis: ['./src/api/routes/*.routes.ts'],
})

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
