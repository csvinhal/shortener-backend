import express from "express";
import env from "./config/envs";
import setupMiddleware from "./config/middleware";
import setupRoutes from "./config/routes";
import { MongoConnection } from "./framework/database/mongoDB/mongo-connection";

async function startServer() {
  const app = express();
  setupMiddleware(app);
  setupRoutes(app);

  await MongoConnection.connect();

  app
    .listen(env.port, () => {
      console.log(`[SERVER] Running at http://localhost:${env.port}`);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
