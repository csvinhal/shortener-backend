import { IShortUrlRepository } from '../../repositories/ishort-url-repository'
import { left, right } from '../../shared/either'
import { GetShortUrlResponse } from './get-short-url-response'
import { IGetShortUrl } from './iget-short-url'

export class GetShortUrl implements IGetShortUrl {
  constructor(private shortUrlRepository: IShortUrlRepository) {}

  async execute(slug: string): Promise<GetShortUrlResponse> {
    const shotUrl = await this.shortUrlRepository.findBySlug(slug)

    if (!shotUrl) {
      return left(new Error('Url not found'))
    }

    return right(shotUrl)
  }
}
