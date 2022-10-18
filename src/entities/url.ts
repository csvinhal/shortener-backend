import { Either, left, right } from '../core/either'
import { InvalidUrlError } from './errors/invalid-url-error'

const VALID_URL_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/
export class Url {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  get value(): string {
    return this.url
  }

  static validate(url: string): boolean {
    if (!url) {
      return false
    }
    if (!url.match(VALID_URL_REGEX)) {
      return false
    }

    return true
  }

  static create(url: string): Either<InvalidUrlError, Url> {
    if (!this.validate(url)) {
      return left(new InvalidUrlError(url))
    }

    return right(new Url(url))
  }
}
