import env from '../../config/envs'
import MongoConnection from '../mongoDB/mongo-connection'
import { app } from './app'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
MongoConnection()
  .connect()
  .then(() => {
    app
      .listen(env.port, () => {
        console.log(`[SERVER] Running at http://localhost:${env.port}`)
      })
      .on('error', err => {
        console.error(err)
        process.exit(1)
      })
  })
