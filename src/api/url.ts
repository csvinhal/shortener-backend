import { NextFunction, Request, Response, Router } from "express";
import { nanoid } from "nanoid";
import Url from "../models/url";

export default (app: Router) => {
  app.get("/:id", async (req: Request, res: Response) => {
    const { id: slug } = req.params;
    try {
      const url = await Url.findOne({ slug });
      if (url) {
        return res.redirect(url.url);
      }
      return res.status(404);
    } catch (error) {
      return res.status(404);
    }
  });

  app.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { slug, url } = req.body;
      if (!slug) {
        slug = nanoid(5);
      } else {
        const existing = await Url.findOne({ slug });
        if (existing) {
          throw new Error("Slug in use. 🍔");
        }
      }

      slug = slug.toLowerCase();
      const newUrl = {
        url,
        slug,
      };
      const created = await Url.create(newUrl);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  });

  app.use((error: any, req: Request, res: Response) => {
    if (error.status) {
      res.status(error.status);
    } else {
      res.status(500);
    }
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    });
  });
};
