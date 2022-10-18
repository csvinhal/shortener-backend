import { IShortUrlData } from '../../../entities/ishort-url-data'
import { ShortUrl } from '../../../entities/short-url'
import { IShortUrlRepository } from '../../../repositories/ishort-url-repository'
import ShortUrlModel from '../models/short-url'

export class MongoShortUrlRepository implements IShortUrlRepository {
  async slugExists(slug: string): Promise<boolean> {
    const shortUrl = await ShortUrlModel.findOne({ slug })

    return shortUrl != null
  }

  async create(shortUrl: ShortUrl): Promise<IShortUrlData> {
    const created = await ShortUrlModel.create(shortUrl)
    return {
      slug: created.slug,
      url: created.url,
    }
  }

  async findBySlug(slug: string): Promise<IShortUrlData | null> {
    const shortUrl = await ShortUrlModel.findOne({ slug })

    return shortUrl
      ? {
          slug: shortUrl.slug,
          url: shortUrl.url,
        }
      : null
  }
}
