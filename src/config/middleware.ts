import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

export default (app: Express): void => {
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(cors())
  app.use(helmet())
  app.use(morgan('common'))
}
