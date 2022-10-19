import { IShortUrlData } from '../entities/ishort-url-data'
import { ShortUrl } from '../entities/short-url'
import { IShortUrlRepository } from './ishort-url-repository'

export class InMemoryShortUrlRepository implements IShortUrlRepository {
  constructor(public shortUrls: ShortUrl[] = []) {}

  async slugExists(slug: string): Promise<boolean> {
    return this.shortUrls.some(shortUrl => shortUrl.slug === slug)
  }

  async create(shortUrl: ShortUrl): Promise<IShortUrlData> {
    this.shortUrls.push(shortUrl)
    return shortUrl
  }

  async findBySlug(slug: string): Promise<IShortUrlData | null> {
    return this.shortUrls.find(shortUrl => shortUrl.slug === slug) ?? null
  }
}
