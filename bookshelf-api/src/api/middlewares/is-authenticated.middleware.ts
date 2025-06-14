import { Request, Response, NextFunction } from 'express'
import { config } from 'infra/config'
import { UnauthorizedException } from 'infra/exceptions/http.exception'
import { JWTPayload, jwtVerify } from 'jose'
import { Result } from 'utils/result'

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const accessToken = request.signedCookies['bookshelf']
  if (!accessToken) {
    throw new UnauthorizedException()
  }

  const result = await Result.fromAsync(() =>
    jwtVerify(accessToken, config.ACCESS_SECRET, {
      algorithms: ['HS256'],
      issuer: 'bookshelf',
      audience: 'bookshelf',
    })
  )
  if (!result.ok) {
    throw new UnauthorizedException('Token inválido ou malformado.')
  }

  const { payload } = result.value
  request.payload = payload as JWTPayload & { id: string }
  next()
}
