//We have to import at least all the events once so they can be triggered
import express from "express";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";

export default async ({ app }: { app: express.Application }) => {
  await mongooseLoader();
  await expressLoader({ app });
};
