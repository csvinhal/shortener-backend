import { Either, left, right } from '../core/either'
import { InvalidSlugError } from './errors/invalid-slug-error'

export class Slug {
  private readonly slug: string

  constructor(slug: string) {
    this.slug = slug
  }

  get value(): string {
    return this.slug
  }

  static validate(slug: string): boolean {
    if (!slug) {
      return false
    }

    return true
  }

  static create(slug: string): Either<InvalidSlugError, Slug> {
    if (!this.validate(slug)) {
      return left(new InvalidSlugError(slug))
    }

    return right(new Slug(slug))
  }
}
