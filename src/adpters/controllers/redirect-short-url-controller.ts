import { Request, Response } from 'express'
import { GetShortUrl } from '../../use-cases/get-short-url/get-short-url'

export class RedirectShortUrlController {
  constructor(private readonly getShortUrl: GetShortUrl) {}

  async handle(request: Request, response: Response): Promise<void> {
    const { slug } = request.params
    try {
      const getShortUrlResponse = await this.getShortUrl.execute(slug)

      if (getShortUrlResponse.isLeft()) {
        response
          .status(404)
          .json({
            message: getShortUrlResponse.value.message,
          })
          .send()
        return
      }

      return response.redirect(getShortUrlResponse.value.url)
    } catch (error) {
      response.status(404).send()
    }
  }
}
