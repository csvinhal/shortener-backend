import { IShortUrlRepository } from '../../repositories/ishort-url-repository'
import { left, right } from '../../core/either'
import { GetShortUrlResponse } from './get-short-url-response'
import { IGetShortUrl } from './iget-short-url'

export class GetShortUrl implements IGetShortUrl {
  constructor(private readonly shortUrlRepository: IShortUrlRepository) {}

  async execute(slug: string): Promise<GetShortUrlResponse> {
    const shotUrl = await this.shortUrlRepository.findBySlug(slug)

    if (shotUrl == null) {
      return left(new Error('Url not found'))
    }

    return right(shotUrl)
  }
}
