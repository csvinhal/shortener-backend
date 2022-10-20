import { Request, Response } from 'express'
import { Controller } from '../../../core/controller'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest = {
      ...request.body,
      ...request.params,
      ...request.query,
    }
    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response
        .status(httpResponse.statusCode)
        .json(httpResponse.body)
        .send()
    }
    if (httpResponse.statusCode === 302) {
      return response.redirect(302, httpResponse.url as string)
    } else {
      return response
        .status(httpResponse.statusCode)
        .json({
          error: httpResponse.body.error,
        })
        .send()
    }
  }
}
