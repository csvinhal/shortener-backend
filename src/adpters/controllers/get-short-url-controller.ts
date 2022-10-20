import { Controller } from '../../core/controller'
import { fail, HttpResponse, notFound, ok } from '../../core/http-response'
import { IShortUrlData } from '../../entities/ishort-url-data'
import { GetShortUrl } from '../../use-cases/get-short-url/get-short-url'

interface IGetShortUrlControllerRequest {
  slug: string
}

export class GetShortUrlController implements Controller {
  constructor(private readonly getShortUrl: GetShortUrl) {}

  async handle(request: IGetShortUrlControllerRequest): Promise<HttpResponse> {
    try {
      const { slug } = request
      const getShortUrlResponse = await this.getShortUrl.execute(slug)

      if (getShortUrlResponse.isLeft()) {
        return notFound(getShortUrlResponse.value)
      }

      return ok<IShortUrlData>(getShortUrlResponse.value)
    } catch (error) {
      return fail(error as Error)
    }
  }
}
