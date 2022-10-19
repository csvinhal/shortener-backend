import express from 'express'
import setupMiddleware from './middlewares/middleware'
import { router } from './routes'

const app = express()
setupMiddleware(app)
app.use(router)

export { app }
