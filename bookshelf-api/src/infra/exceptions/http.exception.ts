import { HttpStatus } from 'infra/enums/http-status'

export class HttpException extends Error {
  code: HttpStatus

  constructor(code: HttpStatus, message?: string) {
    super(message ?? 'Não disponível')

    this.code = code
    this.name = 'HttpException'
  }

  getSchema() {
    return {
      type: 'object',
      properties: {
        code: {
          type: 'number',
          example: this.code,
        },
        name: {
          type: 'string',
          example: this.name,
        },
        message: {
          type: 'string',
          example: this.message,
        },
      },
    }
  }
}

export class BadRequestException extends HttpException {
  constructor(message?: string, cause?: unknown) {
    super(
      HttpStatus.BAD_REQUEST,
      message ?? 'A solicitação está malformada ou contém parâmetros inválidos.'
    )

    this.name = 'BadRequest'
    this.cause = cause
  }

  getSchema() {
    const { type, properties } = super.getSchema()

    return {
      type,
      properties: {
        ...properties,
        details: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'O ISBN10 é obrigatório.' },
              path: {
                type: 'array',
                items: { type: 'string' },
                example: ['isbn_10'],
              },
              type: { type: 'string', example: 'any.required' },
              context: {
                type: 'object',
                additionalProperties: true,
                example: { label: 'isbn_10', key: 'isbn_10' },
              },
            },
            required: ['message'],
          },
          example: [
            {
              message: 'O ISBN10 é obrigatório.',
              path: ['isbn_10'],
              type: 'any.required',
              context: {
                label: 'isbn_10',
                key: 'isbn_10',
              },
            },
          ],
        },
      },
    }
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message?: string, cause?: unknown) {
    super(
      HttpStatus.UNAUTHORIZED,
      message ?? 'Autenticação necessária para acessar este recurso.'
    )

    this.name = 'Unauthorized'
    this.cause = cause
  }
}

export class ForbiddenException extends HttpException {
  constructor(message?: string, cause?: unknown) {
    super(
      HttpStatus.FORBIDDEN,
      message ?? 'Você não tem permissão para acessar este recurso.'
    )

    this.name = 'Forbidden'
    this.cause = cause
  }
}

export class NotFoundException extends HttpException {
  constructor(message?: string, cause?: unknown) {
    super(
      HttpStatus.NOT_FOUND,
      message ?? 'O recurso solicitado não foi encontrado.'
    )

    this.name = 'NotFound'
    this.cause = cause
  }
}

export class ConflictException extends HttpException {
  constructor(message?: string, cause?: unknown) {
    super(
      HttpStatus.CONFLICT,
      message ??
        'Conflito ao processar a solicitação. Verifique os dados enviados.'
    )

    this.name = 'Conflict'
    this.cause = cause
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message?: string, cause?: unknown) {
    super(
      HttpStatus.TOO_MANY_REQUESTS,
      message ??
        'Muitas requisições em um curto período. Tente novamente mais tarde.'
    )

    this.name = 'TooManyRequests'
    this.cause = cause
  }
}

export class InternalServerError extends HttpException {
  timestamp: string

  constructor(message?: string, cause?: unknown) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      message ??
        'O servidor encontrou uma condição inesperada que o impediu de atender a sua solicitação.'
    )

    this.name = 'InternalServerError'
    this.cause = cause
    this.timestamp = new Date().toISOString()
  }

  getSchema() {
    const { type, properties } = super.getSchema()

    return {
      type,
      properties: {
        ...properties,
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '1900-01-01T00:00:00.000Z',
        },
      },
    }
  }
}
