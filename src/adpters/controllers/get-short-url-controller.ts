import { Request, Response } from 'express'
import { GetShortUrl } from '../../use-cases/get-short-url/get-short-url'

export class GetShortUrlController {
  constructor(private readonly getShortUrl: GetShortUrl) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { slug } = request.params
    try {
      const getShortUrlResponse = await this.getShortUrl.execute(slug)

      if (getShortUrlResponse.isLeft()) {
        return response
          .status(404)
          .json({
            message: getShortUrlResponse.value.message,
          })
          .send()
      }

      return response.status(200).json({ ...getShortUrlResponse.value })
    } catch (error) {
      return response.status(404).send()
    }
  }
}