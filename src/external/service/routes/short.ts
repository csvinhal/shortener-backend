import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeCreateShortUrlController } from '../factories/create-short-url-controller-factory'
import { makeGetShortUrlController } from '../factories/get-short-url-controller-factory'
import { makeRedirectShortUrlController } from '../factories/redirect-short-url-controller-factory'

export default (app: Router): void => {
  app.get('/short/:slug', () => adaptRoute(makeCreateShortUrlController()))

  app.get('/short/redirect/:slug', () =>
    adaptRoute(makeGetShortUrlController()),
  )

  app.post('/short', () => adaptRoute(makeRedirectShortUrlController()))
}
