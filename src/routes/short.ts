import { Request, Response, Router } from 'express'
import { CreateShortUrlController } from '../adpters/controllers/create-short-url-controller'
import { GetShortUrlController } from '../adpters/controllers/get-short-url-controller'
import { RedirectShortUrlController } from '../adpters/controllers/redirect-short-url-controller'
import { MongoShortUrlRepository } from '../framework/database/mongoDB/repository/mongo-short-url-repository'
import { CreateShortUrl } from '../use-cases/create-short-url/create-short-url'
import { GetShortUrl } from '../use-cases/get-short-url/get-short-url'

export default (app: Router): void => {
  const shortUrlRepository = new MongoShortUrlRepository()

  const createShortUrlUseCase = new CreateShortUrl(shortUrlRepository)
  const createShortUrlController = new CreateShortUrlController(
    createShortUrlUseCase,
  )

  const getShortUrlUseCase = new GetShortUrl(shortUrlRepository)
  const getShortUrlController = new GetShortUrlController(getShortUrlUseCase)

  const redirectShortUrlController = new RedirectShortUrlController(
    getShortUrlUseCase,
  )

  app.get('/short/:slug', async (req: Request, res: Response) => {
    await getShortUrlController.handle(req, res)
  })

  app.get('/short/redirect/:slug', async (req: Request, res: Response) => {
    await redirectShortUrlController.handle(req, res)
  })

  app.post('/short', async (req: Request, res: Response) => {
    await createShortUrlController.handle(req, res)
  })
}
