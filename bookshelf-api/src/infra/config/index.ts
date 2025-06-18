import dotenv from 'dotenv'

dotenv.config()

type Config = {
  ENVIRONMENT: string
  isProduction: boolean

  JWT_TTL: number
  JWT_SECRET: string
  JWT_ISSUER: string
  JWT_AUDIENCE: string

  DATABASE_URL: string
}

function getEnv(key: keyof Config) {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

function getEnvNum(key: keyof Config) {
  const value = getEnv(key)
  const number = Number(value)
  if (Number.isNaN(number)) {
    throw new Error(
      `This environment variable is not a number: ${key}-${value}`
    )
  }

  return number
}

const environment = getEnv('ENVIRONMENT')

export const config: Config = {
  ENVIRONMENT: environment,
  isProduction: environment === 'production',

  JWT_TTL: getEnvNum('JWT_TTL'),
  JWT_SECRET: getEnv('JWT_SECRET'),
  JWT_ISSUER: getEnv('JWT_ISSUER'),
  JWT_AUDIENCE: getEnv('JWT_AUDIENCE'),

  DATABASE_URL: getEnv('DATABASE_URL'),
}
