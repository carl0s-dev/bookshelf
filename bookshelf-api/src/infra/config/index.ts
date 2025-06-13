import dotenv from 'dotenv'

dotenv.config()

type Config = {
  DATABASE_URL: string
}

export const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL ?? 'postgres://username:password@localhost:5432/dbname'
}