import { Router } from 'express'
import short from './short'
import status from './status'

export default (): Router => {
  const router = Router()
  status(router)
  short(router)
  return router
}
