import { RedirectShortUrlController } from '../../../adpters/controllers/redirect-short-url-controller'
import { Controller } from '../../../core/controller'
import { GetShortUrl } from '../../../use-cases/get-short-url/get-short-url'
import { MongoShortUrlRepository } from '../../mongoDB/repository/mongo-short-url-repository'

export function makeRedirectShortUrlController(): Controller {
  const shortUrlRepository = new MongoShortUrlRepository()
  const getShortUrlUseCase = new GetShortUrl(shortUrlRepository)
  const redirectShortUrlController = new RedirectShortUrlController(
    getShortUrlUseCase,
  )

  return redirectShortUrlController
}
