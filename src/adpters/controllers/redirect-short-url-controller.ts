import { Controller } from '../../core/controller'
import {
  fail,
  HttpResponse,
  notFound,
  redirect,
} from '../../core/http-response'
import { GetShortUrl } from '../../use-cases/get-short-url/get-short-url'

interface RedirectShortUrlControllerRequest {
  slug: string
}
export class RedirectShortUrlController implements Controller {
  constructor(private readonly getShortUrl: GetShortUrl) {}

  async handle(
    request: RedirectShortUrlControllerRequest,
  ): Promise<HttpResponse> {
    const { slug } = request
    try {
      const getShortUrlResponse = await this.getShortUrl.execute(slug)

      if (getShortUrlResponse.isLeft()) {
        return notFound(getShortUrlResponse.value)
      }

      return redirect(getShortUrlResponse.value.url)
    } catch (error) {
      return fail(error as Error)
    }
  }
}
