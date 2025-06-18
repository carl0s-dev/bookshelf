import { compare, genSalt, hash } from 'bcrypt'
import {
  ConflictException,
  UnauthorizedException,
} from 'infra/exceptions/http.exception'
import { User } from 'infra/models/user.model'
import { UniqueConstraintError } from 'sequelize'
import { Result } from 'utils/result'

import jwt from 'utils/lib/jsonwebtoken'

type Params = {
  username: string
  password: string
}

async function executeSignUp(params: Params) {
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

async function executeSignIn(params: Params) {
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

  return jwt.createToken(id)
}

export default Object.freeze({
  executeSignUp,
  executeSignIn,
})
