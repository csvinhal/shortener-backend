export interface HttpResponse {
  statusCode: number
  body: any
  url?: string
}

export function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  }
}

export function created(): HttpResponse {
  return {
    statusCode: 201,
    body: undefined,
  }
}

export function redirect(url: string): HttpResponse {
  return {
    statusCode: 302,
    body: undefined,
    url,
  }
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  }
}

export function notFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  }
}

export function fail(error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: {
      error: error.message,
    },
  }
}
