import { SignJWT } from 'jose'
import { compare, genSalt, hash } from 'bcrypt'
import {
  ConflictException,
  UnauthorizedException,
} from 'infra/exceptions/http.exception'
import { User } from 'infra/models/user.model'
import { UniqueConstraintError } from 'sequelize'
import { Result } from 'utils/result'
import { config } from 'infra/config'

type Params = {
  username: string
  password: string
}

export async function executeSignUp(params: Params) {
  const password_salt = await genSalt(12)
  const password_hash = await hash(params.password, password_salt)

  const result = await Result.fromAsync(async () =>
    User.create({
      username: params.username,
      password: password_hash,
    })
  )
  if (result.ok) return

  const error = result.error
  if (error instanceof UniqueConstraintError) {
    throw new ConflictException(
      'Já existe um usuário cadastrado com este nome.'
    )
  }

  throw error
}

export async function executeSignIn(params: Params) {
  const user = await User.findOne({
    where: {
      username: params.username,
    },
  })
  if (!user) {
    throw new UnauthorizedException('Credenciais Inválidas.')
  }

  const { id, password } = user.dataValues

  const isPassword = await compare(params.password, password)
  if (!isPassword) {
    throw new UnauthorizedException('Credenciais Inválidas.')
  }

  const token = await new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('bookshelf')
    .setAudience('bookshelf')
    .setExpirationTime('2h')
    .sign(config.SECRET)

  return token
}
