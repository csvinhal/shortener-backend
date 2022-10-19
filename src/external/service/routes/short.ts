import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeCreateShortUrlController } from '../factories/create-short-url-controller-factory'
import { makeGetShortUrlController } from '../factories/get-short-url-controller-factory'
import { makeRedirectShortUrlController } from '../factories/redirect-short-url-controller-factory'

export default (app: Router): void => {
  app.get('/short/:slug', adaptRoute(makeGetShortUrlController()))

  app.get('/short/redirect/:slug', adaptRoute(makeRedirectShortUrlController()))

  app.post('/short', adaptRoute(makeCreateShortUrlController()))
}
