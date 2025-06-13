import { Router } from 'express'
import { handleSignUp } from 'api/controllers/auth.controller'
import { Validator } from 'api/middlewares/validator.middleware'
import { UserSchema } from 'infra/models/user.model'

export const authRouter = Router()

authRouter.post('/sign-up', Validator(UserSchema), handleSignUp)
