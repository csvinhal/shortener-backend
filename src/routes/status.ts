import { Router } from 'express'

export default (app: Router): void => {
  app.get('/status', (_, res) => {
    res.status(200).end()
  })

  app.head('/status', (_, res) => {
    res.status(200).end()
  })
}
