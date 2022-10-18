import express from 'express'
import env from '../../config/envs'
import setupMiddleware from './middlewares/middleware'
import MongoConnection from '../mongoDB/mongo-connection'
import { router } from './routes'

async function startServer(): Promise<void> {
  const app = express()
  setupMiddleware(app)
  app.use(router)

  await MongoConnection().connect()

  app
    .listen(env.port, () => {
      console.log(`[SERVER] Running at http://localhost:${env.port}`)
    })
    .on('error', err => {
      console.error(err)
      process.exit(1)
    })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startServer()
