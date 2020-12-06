import express from "express";
import config from "./config";

async function startServer() {
  const app = express();

  await require("./loaders").default({ app });

  app
    .listen(config.port, () => {
      console.log(`[SERVER] Running at http://localhost:${config.port}`);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
