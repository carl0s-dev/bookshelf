import { genSalt, hash } from 'bcrypt'
import { ConflictException } from 'infra/exceptions/http.exception'
import { User } from 'infra/models/user.model'
import { UniqueConstraintError } from 'sequelize'
import { Result } from 'utils/result'

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
