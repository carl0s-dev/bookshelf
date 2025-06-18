import jwt from 'utils/lib/jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UnauthorizedException } from 'infra/exceptions/http.exception'

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const accessToken = request.cookies['authToken']
  if (!accessToken) {
    throw new UnauthorizedException()
  }

  const verifyResult = await jwt.verifyToken(accessToken)
  if (!verifyResult) {
    throw new UnauthorizedException('Token inválido ou malformado.')
  }

  const payload = verifyResult.payload
  request.payload = payload

  next()
}
