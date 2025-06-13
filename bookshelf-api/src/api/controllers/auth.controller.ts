import { executeSignUp } from 'api/services/auth.service'
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
