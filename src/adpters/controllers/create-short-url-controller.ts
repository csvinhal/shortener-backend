import { Request, Response } from 'express'
import { nanoid } from 'nanoid'
import { CreateShortUrl } from '../../use-cases/create-short-url/create-short-url'

export class CreateShortUrlController {
  constructor(private readonly createShortUrl: CreateShortUrl) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { slug, url } = request.body

      if (!url) {
        return response
          .status(400)
          .json({
            message: 'Missing parameter: url',
          })
          .send()
      }

      const createShortUrlResponse = await this.createShortUrl.execute({
        slug: slug || nanoid(5),
        url,
      })

      if (createShortUrlResponse.isLeft()) {
        return response
          .status(400)
          .json({
            message: createShortUrlResponse.value.message,
          })
          .send()
      }

      return response.status(201).send()
    } catch (e) {
      return response
        .status(400)
        .json({
          message: (e as Error).message || 'Unexpected error.',
        })
        .send()
    }
  }
}
