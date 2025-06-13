import cors from 'cors'
import express from 'express'
import { router } from './api/router'
import { errorHandler } from 'api/middlewares/error-handler.middleware'
import { sequelize } from 'infra/database'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
)
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

await sequelize.sync({
  alter: true,
})

app.listen(1818, () => {
  console.log('Server Running on http://localhost:1818')
})
