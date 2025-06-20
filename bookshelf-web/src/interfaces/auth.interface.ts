import { httpClient } from "@/lib/http-client"
import { FormState, UserSchema } from "@/lib/schemas/user.schema"
import { AxiosError } from "axios"

async function signUp(state: FormState, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const result = await UserSchema.safeParseAsync({
    username: username,
    password: password,
  })
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      data: {
        username: username,
        password: password
      }
    }
  }

  try {
    const resp = await httpClient.post('/auth/sign-up', result.data)
    if (resp.status === 201) {
      return {
        ok: true,
        message: 'Cadastrado com sucesso!',
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        error: err.response?.data.name,
        message: err.response?.data.message,
        data: result.data
      }
    }

    return {
      error: 'UnknownError',
      message: 'Uma condição inesperada nos impediu de atender sua solicitação.'
    }
  }
}

async function signIn(state: FormState, formData: FormData) {

  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const result = await UserSchema.safeParseAsync({
    username: username,
    password: password,
  })
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      data: {
        username: username,
        password: password
      }
    }
  }

  try {
    const resp = await httpClient.post('/auth/sign-in', result.data)
    if (resp.status === 200) {
      return {
        ok: true,
        message: 'Autenticado com sucesso.'
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        error: err.response?.data.name,
        message: err.response?.data.message,
        data: result.data
      }
    }
    return {
      error: 'UnknownError',
      message: 'Uma condição inesperada nos impediu de atender sua solicitação.',
    }
  }
}

export {
  signUp,
  signIn
}