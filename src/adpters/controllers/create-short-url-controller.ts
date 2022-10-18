import { Request } from 'express'
import { nanoid } from 'nanoid'
import { Controller } from '../../core/controller'
import {
  clientError,
  created,
  fail,
  HttpResponse,
} from '../../core/http-response'
import { CreateShortUrl } from '../../use-cases/create-short-url/create-short-url'

export class CreateShortUrlController implements Controller {
  constructor(private readonly createShortUrl: CreateShortUrl) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { slug, url } = request.body

      if (!url) {
        return clientError(new Error('Missing parameter: url'))
      }

      const createShortUrlResponse = await this.createShortUrl.execute({
        slug: slug || nanoid(5),
        url,
      })

      if (createShortUrlResponse.isLeft()) {
        return clientError(createShortUrlResponse.value)
      }

      return created()
    } catch (e) {
      return fail(e as Error)
    }
  }
}
