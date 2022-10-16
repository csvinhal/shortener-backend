import { MongoShortUrlRepository } from "../../framework/database/mongoDB/repository/mongo-short-url-repository";
import { GetShortUrl } from "./get-short-url";
import { GetShortUrlController } from "./get-short-url-controller";

const shortUrlRepository = new MongoShortUrlRepository();

const getShortUrlUseCase = new GetShortUrl(shortUrlRepository);
const getShortUrlController = new GetShortUrlController(getShortUrlUseCase);

export { getShortUrlController };
