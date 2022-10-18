import { DomainError } from '../../core/domain-error'

export class InvalidSlugError extends Error implements DomainError {
  constructor(slug: string) {
    super(`The slug "${slug}" is invalid.`)
    this.name = 'InvalidSlugError'
  }
}
