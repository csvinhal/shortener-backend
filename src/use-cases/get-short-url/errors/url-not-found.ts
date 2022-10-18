import { UseCaseError } from '../../../core/use-case-error'

export class UrlNotFoundError extends Error implements UseCaseError {
  constructor(url: string) {
    super(`The url "${url}" was not found.`)
    this.name = 'UrlNotFoundErrors'
  }
}
