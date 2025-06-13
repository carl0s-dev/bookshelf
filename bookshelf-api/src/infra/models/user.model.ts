import { DataTypes } from 'sequelize'
import { sequelize } from '../database'
import Joi from 'joi'

export const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  }
)

export const UserSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(32)
    .required()
    .lowercase()
    .messages({
      'string.base': 'Nome de usuário inválido.',
      'string.alphanum': 'O nome de usuário deve ser alfanúmerico.',
      'string.min': 'O nome de usuário deve ter entre 3 a 32 caracteres.',
      'string.max': 'O nome de usuário deve ter entre 3 a 32 caracteres.',
      'any.required': 'Digite o nome de usuário.',
    }),
  password: Joi.string().min(8).max(256).required().messages({
    'string.base': 'Senha inválida.',
    'string.min': 'A senha deve ter de 8 a 256 caracteres.',
    'string.max': 'A senha deve ter de 8 a 256 caracteres.',
    'any.required': 'Digite sua senha.',
  }),
})
