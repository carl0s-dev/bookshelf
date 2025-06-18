import authService from 'api/services/auth.service'
import type { Request, Response, NextFunction } from 'express'
import { config } from 'infra/config'
import { HttpStatus } from 'infra/enums/http-status'

async function handleSignUp(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { username, password } = request.body

    await authService.executeSignUp({
      username,
      password,
    })

    response.status(HttpStatus.CREATED).send()
  } catch (err) {
    next(err)
  }
}

async function handleSignIn(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { username, password } = request.body

    const token = await authService.executeSignIn({
      username,
      password,
    })

    response.cookie('authToken', token, {
      secure: config.isProduction,
      maxAge: config.JWT_TTL,
      httpOnly: true,
      sameSite: 'lax',
    })

    response.status(HttpStatus.OK).send()
  } catch (err) {
    next(err)
  }
}

export default Object.freeze({
  handleSignUp,
  handleSignIn,
})
