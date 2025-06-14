import Joi from 'joi'
import { sequelize } from 'infra/database'
import { DataTypes } from 'sequelize'

export const Book = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    isbn_10: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isbn_13: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    thumbnails: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  },
  { tableName: 'books' }
)

function isISBN10(value: string): boolean {
  const cleaned = value.replace(/[^0-9X]/gi, '').toUpperCase()
  if (cleaned.length !== 10) return false

  let sum = 0

  for (let i = 0; i < 10; i++) {
    let digit: number

    if (i === 9 && cleaned[i] === 'X') {
      digit = 10
    } else if (/\d/.test(cleaned[i])) {
      digit = parseInt(cleaned[i], 10)
    } else {
      return false
    }

    sum += digit * (10 - i)
  }

  return sum % 11 === 0
}

function isISBN13(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  if (digits.length !== 13) return false

  let sum = 0

  for (let i = 0; i < 13; i++) {
    const digit = parseInt(digits[i], 10)
    if (isNaN(digit)) return false

    sum += digit * (i % 2 === 0 ? 1 : 3)
  }

  return sum % 10 === 0
}

function validateISBN10(value: string, helpers: Joi.CustomHelpers) {
  if (!isISBN10(value)) {
    return helpers.error('string.isbn10invalid')
  }
  const digits = value.replace(/[^0-9X]/gi, '').toUpperCase()

  return digits.replace(/^(\d{1})(\d{3})(\d{5})([0-9X])$/, '$1-$2-$3-$4')
}

function validateISBN13(value: string, helpers: Joi.CustomHelpers) {
  if (!isISBN13(value)) {
    return helpers.error('string.isbn13invalid')
  }

  const digits = value.replace(/\D/g, '')

  return digits.replace(
    /^(\d{3})(\d{1})(\d{2})(\d{6})(\d{1})$/,
    '$1-$2-$3-$4-$5'
  )
}

export const BookSchema = Joi.object({
  isbn_10: Joi.string()
    .custom(validateISBN10, 'is-isbn10')
    .required()
    .messages({
      'any.required': 'O ISBN10 é obrigatório.',
      'string.base': 'O ISBN10 deve ser uma string.',
      'string.isbnInvalid': 'Este valor não é um ISBN10 válido.',
    }),

  isbn_13: Joi.string()
    .custom(validateISBN13, 'is-isbn13')
    .required()
    .messages({
      'any.required': 'O ISBN13 é obrigatório.',
      'string.base': 'O ISBN13 deve ser uma string.',
      'string.isbnInvalid': 'Este valor não é um ISBN13 válido.',
    }),

  title: Joi.string().trim().min(3).max(128).required().messages({
    'string.base': 'O título deve ser uma string.',
    'string.empty': 'O título não pode estar vazio.',
    'string.min': 'O título deve ter pelo menos 3 caracteres.',
    'string.max': 'O título deve ter no máximo 128 caracteres.',
    'any.required': 'O título é obrigatório.',
  }),

  authors: Joi.array()
    .items(
      Joi.string()
        .trim()
        .min(3)
        .max(48)
        .pattern(/^[\p{L}\p{M}\p{N}\s.'-]+$/u)
        .messages({
          'string.pattern.base': 'Nome de autor inválido.',
          'string.min': 'Nome de autor muito curto.',
          'string.max': 'Nome de autor muito longo.',
        })
    )
    .min(1)
    .max(12)
    .messages({
      'array.base': 'Autores deve ser uma lista.',
      'array.min': 'Deve haver ao menos um autor.',
      'array.max': 'Não é possível informar mais de doze autores.',
    }),

  thumbnails: Joi.array()
    .items(
      Joi.string()
        .trim()
        .uri({ scheme: ['https'] })
        .messages({
          'string.uri': 'O link da imagem não é válido.',
        })
    )
    .max(10)
    .messages({
      'array.max': 'Você pode enviar no máximo 10 thumbnails.',
    }),

  categories: Joi.array()
    .items(
      Joi.string().trim().min(3).max(48).messages({
        'string.min': 'Categoria muito curta.',
        'string.max': 'Categoria muito longa.',
      })
    )
    .min(1)
    .messages({
      'array.min': 'Informe ao menos uma categoria.',
    }),

  publisher: Joi.string().trim().min(3).max(128).required().messages({
    'string.base': 'Editora deve ser uma string.',
    'string.empty': 'Editora não pode estar vazia.',
    'string.min': 'Editora muito curta.',
    'string.max': 'Editora muito longa.',
    'any.required': 'A editora é obrigatória.',
  }),

  publishedAt: Joi.string().isoDate().required().messages({
    'date.base': 'A data de publicação deve ser válida.',
    'date.format': 'A data deve estar no formato ISO (YYYY-MM-DD).',
    'any.required': 'A data de publicação é obrigatória.',
  }),

  description: Joi.string().trim().min(10).required().messages({
    'string.empty': 'A descrição não pode estar vazia.',
    'string.min': 'A descrição deve ter pelo menos 10 caracteres.',
    'any.required': 'A descrição é obrigatória.',
  }),
})

export const PartialBookSchema = BookSchema.fork(
  Object.keys(BookSchema.describe().keys),
  (schema) => schema.optional()
)
