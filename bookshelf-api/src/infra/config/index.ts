import dotenv from 'dotenv'

dotenv.config()

type Config = {
  DATABASE_URL: string
  SECRET: Uint8Array<ArrayBufferLike>
  COOKIE_SECRET: string
}

const encoder = new TextEncoder()

export const config: Config = {
  DATABASE_URL:
    process.env.DATABASE_URL ??
    'postgres://username:password@localhost:5432/dbname',
  SECRET: encoder.encode(process.env.SECRET ?? 'SECRET'),
  COOKIE_SECRET: process.env.COOKIE_SECRET ?? 'COOKIE_SECRET',
}
