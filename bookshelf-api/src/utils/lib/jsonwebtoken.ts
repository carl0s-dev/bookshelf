import { config } from 'infra/config'
import { Result } from 'utils/result'
import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(config.JWT_SECRET)
const ttl = config.JWT_TTL / 1000

async function createToken(id: string) {
  const token = await new SignJWT()
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(id)
    .setIssuedAt()
    .setIssuer(config.JWT_ISSUER)
    .setAudience(config.JWT_AUDIENCE)
    .setExpirationTime(Math.floor(Date.now() / 1000) + ttl)
    .sign(secret)

  return token
}

async function verifyToken(token: string) {
  const result = await Result.fromAsync(() =>
    jwtVerify(token, secret, {
      algorithms: ['HS256'],
      issuer: 'bookshelf',
      audience: 'bookshelf',
    })
  )
  if (!result.ok) {
    return undefined
  }

  return result.value
}

export default Object.freeze({
  createToken,
  verifyToken,
})
