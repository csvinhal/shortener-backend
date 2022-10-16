import { Request, Response, Router } from "express";
import { createShortUrlController } from "../use-cases/create-short-url";
import { getShortUrlController } from "../use-cases/get-short-url";

export default (app: Router) => {
  app.get("/short/:slug", async (req: Request, res: Response) => {
    getShortUrlController.handle(req, res);
  });

  app.post("/short", async (req: Request, res: Response) => {
    createShortUrlController.handle(req, res);
  });
};
