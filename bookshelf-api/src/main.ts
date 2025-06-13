import cors from 'cors'
import express from 'express'
import { router } from './api/router'

const app = express()

app.use(cors({
  origin: [
    'http://localhost:3000'
  ],
  credentials: true
}))
app.use(express.json())
app.use(router)

app.listen(1818, () => {
  console.log('Server Running on http://localhost:1818')
})