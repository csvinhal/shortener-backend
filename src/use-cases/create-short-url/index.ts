import { MongoShortUrlRepository } from "../../framework/database/mongoDB/repository/mongo-short-url-repository";
import { CreateShortUrl } from "./create-short-url";
import { CreateShortUrlController } from "./create-short-url-controller";

const shortUrlRepository = new MongoShortUrlRepository();

const createShortUrlUseCase = new CreateShortUrl(shortUrlRepository);
const createShortUrlController = new CreateShortUrlController(
  createShortUrlUseCase
);

export { createShortUrlUseCase, createShortUrlController };
