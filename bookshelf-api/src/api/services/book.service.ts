import { Book } from 'infra/models/book.model'
import { Op } from 'sequelize'
import { Result } from 'utils/result'

type ExecuteInsertParams = {
  isbn_10: string
  isbn_13: string
  title: string
  authors: string[]
  thumbnails: string[]
  categories: string[]
  publisher: string
  publishedAt: string
  description: string
}

async function executeInsert(params: ExecuteInsertParams) {
  const result = await Result.fromAsync(() =>
    Book.create({
      isbn_10: params.isbn_10,
      isbn_13: params.isbn_13,
      title: params.title,
      authors: params.authors,
      thumbnails: params.thumbnails,
      categories: params.categories,
      publisher: params.publisher,
      publishedAt: params.publishedAt,
      description: params.description,
    })
  )
  if (!result.ok) throw result.error

  return result.value
}

type ExecuteSelectListParams = {
  query?: string
  limit?: number
  offset?: number
}

async function executeSelectList(params: ExecuteSelectListParams) {
  const where = params.query
    ? {
        title: {
          [Op.iLike]: `%${params.query}%`,
        },
      }
    : undefined

  return Book.findAll({
    where,
    limit: params.limit,
    offset: params.offset,
  })
}

type ExecuteUpdateParams = Partial<ExecuteInsertParams> & {
  id: string
}

async function executeUpdate(params: ExecuteUpdateParams) {
  const { id, ...data } = params

  return Book.update(data, {
    where: {
      id,
    },
    returning: true,
  })
}

export default Object.freeze({
  executeInsert,
  executeSelectList,
  executeUpdate,
})
