import { Either, left, right } from '../shared/either'
import { IShortUrlData } from './ishort-url-data'

export class ShortUrl {
  private static message: string
  public readonly slug: string
  public readonly url: string

  constructor(slug: string, url: string) {
    this.slug = slug
    this.url = url
    Object.freeze(this)
  }

  static validate(url: string): boolean | string {
    if (!url) {
      try {
        return !!new URL(url)
      } catch (e) {
        ShortUrl.message = 'Url is not valid!'
        return false
      }
    }
    return true
  }

  static create(urlData: IShortUrlData): Either<Error, ShortUrl> {
    const { slug, url } = urlData

    if (!ShortUrl.validate(url)) {
      return left(new Error(ShortUrl.message))
    }

    return right(new ShortUrl(slug, url))
  }
}
