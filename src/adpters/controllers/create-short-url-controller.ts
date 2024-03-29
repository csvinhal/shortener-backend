import { nanoid } from 'nanoid'
import { Controller } from '../../core/controller'
import { clientError, fail, HttpResponse, ok } from '../../core/http-response'
import { IShortUrlData } from '../../entities/ishort-url-data'
import { CreateShortUrl } from '../../use-cases/create-short-url/create-short-url'

interface ICreateShortUrlControllerRequest {
  slug: string
  url: string
}

export class CreateShortUrlController implements Controller {
  constructor(private readonly createShortUrl: CreateShortUrl) {}

  async handle(
    request: ICreateShortUrlControllerRequest,
  ): Promise<HttpResponse> {
    try {
      const { slug, url } = request

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

      return ok<IShortUrlData>(createShortUrlResponse.value)
    } catch (e) {
      return fail(e as Error)
    }
  }
}
