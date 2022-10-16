import { Router } from "express";
import url from "./url";
// import status from "./status";

export default () => {
  const router = Router();
  url(router);
  // status(app);
  return router;
};
