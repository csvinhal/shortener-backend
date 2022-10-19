import { left, right } from '../../core/either'
import { ShortUrl } from '../../entities/short-url'
import { Slug } from '../../entities/slug'
import { Url } from '../../entities/url'
import { IShortUrlRepository } from '../../repositories/ishort-url-repository'
import { CreateShortUrlResponse } from './create-short-url-response'
import { SlugAlreadyExistsError } from './errors/slug-already-exists'
import { ICreateShortUrl } from './icreate-short-url'
import { ICreateShortUrlDto } from './icreate-short-url-dto'

export class CreateShortUrl implements ICreateShortUrl {
  constructor(private readonly shortUrlRepository: IShortUrlRepository) {}

  async execute({
    slug,
    url,
  }: ICreateShortUrlDto): Promise<CreateShortUrlResponse> {
    const slugOrError = Slug.create(slug)
    const urlOrError = Url.create(url)

    if (slugOrError.isLeft()) {
      return left(slugOrError.value)
    }

    if (urlOrError.isLeft()) {
      return left(urlOrError.value)
    }

    const shortUrlOrError = ShortUrl.create({
      slug: slugOrError.value,
      url: urlOrError.value,
    })

    if (shortUrlOrError.isLeft()) {
      return left(shortUrlOrError.value)
    }

    const slugAlreadyExists = await this.shortUrlRepository.slugExists(slug)

    if (slugAlreadyExists) {
      return left(new SlugAlreadyExistsError(shortUrlOrError.value.slug))
    }

    const newShortUrl = await this.shortUrlRepository.create(
      shortUrlOrError.value,
    )
    return right(newShortUrl)
  }
}
