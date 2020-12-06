import { Router } from "express";
import url from "./url";

export default () => {
  const app = Router();

  url(app);

  return app;
};
