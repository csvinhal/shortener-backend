import { ShortUrl } from '../../entities/short-url'
import { IShortUrlRepository } from '../../repositories/ishort-url-repository'
import { left, right } from '../../shared/either'
import { CreateShortUrlResponse } from './create-short-url-response'
import { ICreateShortUrl } from './icreate-short-url'
import { ICreateShortUrlDto } from './icreate-short-url-dto'

export class CreateShortUrl implements ICreateShortUrl {
  constructor(private readonly shortUrlRepository: IShortUrlRepository) {}

  async execute(data: ICreateShortUrlDto): Promise<CreateShortUrlResponse> {
    const { slug } = data
    const slugAlreadyExists = await this.shortUrlRepository.slugExists(slug)

    if (slugAlreadyExists) {
      throw new Error('Slug already in use.')
    }

    const shortUrlOrError = ShortUrl.create(data)
    if (shortUrlOrError.isLeft()) {
      return left(shortUrlOrError.value)
    }
    const shortUrl: ShortUrl = shortUrlOrError.value
    const newShortUrl = await this.shortUrlRepository.create(shortUrl)
    return right(newShortUrl)
  }
}
