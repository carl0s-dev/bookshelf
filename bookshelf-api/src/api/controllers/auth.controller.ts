import { executeSignIn, executeSignUp } from 'api/services/auth.service'
import type { Request, Response, NextFunction } from 'express'

export async function handleSignUp(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { username, password } = request.body

    await executeSignUp({
      username,
      password,
    })

    response.status(201).send()
  } catch (err) {
    next(err)
  }
}

export async function handleSignIn(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { username, password } = request.body

    const token = await executeSignIn({
      username,
      password,
    })

    response.cookie('bookshelf', token, {
      signed: true,
      secure: false,
      maxAge: 7200,
      httpOnly: true,
      sameSite: 'lax',
    })

    response.status(200).send()
  } catch (err) {
    next(err)
  }
}
