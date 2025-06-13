import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { authRouter } from './routes/auth.routes'

export const router = Router()

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookshelf API',
      version: '0.1.0',
      description: 'Documentation of Bookshelf API',
    },
  },
  apis: ['src/api/routes/*.route.ts'],
})

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
router.use('/auth', authRouter)
