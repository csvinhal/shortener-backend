import { Router } from 'express'
import short from './short'
import status from './status'

const router = Router()

status(router)
short(router)

export { router }
