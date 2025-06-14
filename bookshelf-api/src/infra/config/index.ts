import dotenv from 'dotenv'

dotenv.config()

type Config = {
  DATABASE_URL: string
  ACCESS_SECRET: Uint8Array<ArrayBufferLike>
  COOKIE_SECRET: string
}

const encoder = new TextEncoder()

export const config: Config = {
  DATABASE_URL:
    process.env.DATABASE_URL ??
    'postgres://username:password@localhost:5432/dbname',
  ACCESS_SECRET: encoder.encode(process.env.ACCESS_SECRET ?? 'SECRET'),
  COOKIE_SECRET: process.env.COOKIE_SECRET ?? 'COOKIE_SECRET',
}
