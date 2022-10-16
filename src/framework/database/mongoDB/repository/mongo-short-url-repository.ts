import { ShortUrl } from "../../../../entities/short-url";
import { ShortUrlData } from "../../../../entities/short-url-data";
import { IShortUrlRepository } from "../../../../repositories/ishort-url-repository";
import ShortUrlModel from "../models/short-url";

export class MongoShortUrlRepository implements IShortUrlRepository {
  async slugExists(slug: string): Promise<boolean> {
    const shortUrl = await ShortUrlModel.findOne({ slug });

    return shortUrl ? true : false;
  }

  async create(shortUrl: ShortUrlData): Promise<ShortUrl> {
    const created = await ShortUrlModel.create(shortUrl);
    return {
      slug: created.slug,
      url: created.url,
    };
  }

  async findBySlug(slug: string): Promise<ShortUrl | null> {
    const shortUrl = await ShortUrlModel.findOne({ slug });

    if (shortUrl) {
      return {
        slug: shortUrl.slug,
        url: shortUrl.url,
      };
    }
    return null;
  }
}
