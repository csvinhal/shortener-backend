import { left, right } from '../../core/either'
import { IShortUrlRepository } from '../../repositories/ishort-url-repository'
import { SlugNotFoundError } from './errors/slug-not-found'
import { GetShortUrlResponse } from './get-short-url-response'
import { IGetShortUrl } from './iget-short-url'

export class GetShortUrl implements IGetShortUrl {
  constructor(private readonly shortUrlRepository: IShortUrlRepository) {}

  async execute(slug: string): Promise<GetShortUrlResponse> {
    const shotUrl = await this.shortUrlRepository.findBySlug(slug)

    if (shotUrl == null) {
      return left(new SlugNotFoundError(slug))
    }

    return right(shotUrl)
  }
}
