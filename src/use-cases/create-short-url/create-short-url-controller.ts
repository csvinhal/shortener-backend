import { nanoid } from "nanoid";
import { CreateShortUrl } from "./create-short-url";
import { Request, Response } from "express";

export class CreateShortUrlController {
  constructor(private createShort: CreateShortUrl) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      console.log('caiu aqui', request.body)
      const { slug, url } = request.body;
      console.log(url, slug)
      await this.createShort.execute({
        slug: slug || nanoid(5),
        url,
      });

      return response.status(201).send();
    } catch (e) {
      return response.status(400).json({
        message: (e as Error).message || "Unexpected error.",
      }).send();
    }
  }
}
