import { Request, Response, Router } from "express";
import ShortUrl from "../framework/database/mongoDB/models/short-url";
import {createShortUrlController } from "../use-cases/create-short-url"

export default (app: Router) => {
  app.get("/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
      const url = await ShortUrl.findOne({ slug });
      if (url) {
        return res.redirect(url.url);
      }
      return res.status(404).send();
    } catch (error) {
      console.log('hahaha')
      return res.status(404).send();
    }
  });

  app.post("/", async (req: Request, res: Response) => {
    createShortUrlController.handle(req, res);
  });
};
