import { CreateShortUrlController } from '../../../adpters/controllers/create-short-url-controller'
import { Controller } from '../../../core/controller'
import { CreateShortUrl } from '../../../use-cases/create-short-url/create-short-url'
import { MongoShortUrlRepository } from '../../mongoDB/repository/mongo-short-url-repository'

export function makeCreateShortUrlController(): Controller {
  const shortUrlRepository = new MongoShortUrlRepository()
  const createShortUrlUseCase = new CreateShortUrl(shortUrlRepository)
  const createShortUrlController = new CreateShortUrlController(
    createShortUrlUseCase,
  )

  return createShortUrlController
}
