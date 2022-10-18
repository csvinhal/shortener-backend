import { UseCaseError } from '../../../core/use-case-error'

export class SlugAlreadyExistsError extends Error implements UseCaseError {
  constructor(slug: string) {
    super(`The slug "${slug}" is already in use.`)
    this.name = 'SlugAlreadyExistsError'
  }
}
