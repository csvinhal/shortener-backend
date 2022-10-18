import { UseCaseError } from '../../../core/use-case-error'

export class SlugNotFoundError extends Error implements UseCaseError {
  constructor(slug: string) {
    super(`The slug "${slug}" was not found.`)
    this.name = 'SlugNotFoundError'
  }
}
