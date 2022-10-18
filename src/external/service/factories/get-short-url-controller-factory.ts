import { GetShortUrlController } from '../../../adpters/controllers/get-short-url-controller'
import { Controller } from '../../../core/controller'
import { GetShortUrl } from '../../../use-cases/get-short-url/get-short-url'
import { MongoShortUrlRepository } from '../../mongoDB/repository/mongo-short-url-repository'

export function makeGetShortUrlController(): Controller {
  const shortUrlRepository = new MongoShortUrlRepository()
  const getShortUrlUseCase = new GetShortUrl(shortUrlRepository)
  const getShortUrlController = new GetShortUrlController(getShortUrlUseCase)

  return getShortUrlController
}
