import { Either, right } from '../core/either'
import { Entity } from '../core/entity'
import { InvalidSlugError } from './errors/invalid-slug-error'
import { InvalidUrlError } from './errors/invalid-url-error'
import { Slug } from './slug'
import { Url } from './url'

interface IShortUrlData {
  slug: Slug
  url: Url
}

export class ShortUrl extends Entity<IShortUrlData> {
  constructor(props: IShortUrlData, id?: string) {
    super(props, id)
    Object.freeze(this)
  }

  get slug(): string {
    return this.props.slug.value
  }

  get url(): string {
    return this.props.url.value
  }

  static create(
    shortUrlData: IShortUrlData,
    id?: string,
  ): Either<InvalidSlugError | InvalidUrlError, ShortUrl> {
    return right(new ShortUrl(shortUrlData, id))
  }
}
