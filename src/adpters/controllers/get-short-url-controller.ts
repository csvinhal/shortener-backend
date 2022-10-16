import { Request, Response } from "express";
import { GetShortUrl } from "../../use-cases/get-short-url/get-short-url";

export class GetShortUrlController {
  constructor(private getShortUrl: GetShortUrl) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response | void> {
    const { slug } = request.params;
    try {
      const getShortUrlResponse = await this.getShortUrl.execute(slug);

      if (getShortUrlResponse.isLeft()) {
        return response
          .status(404)
          .json({
            message: getShortUrlResponse.value.message,
          })
          .send();
      }

      response.redirect(getShortUrlResponse.value.url);
    } catch (error) {
      return response.status(404).send();
    }
  }
}
