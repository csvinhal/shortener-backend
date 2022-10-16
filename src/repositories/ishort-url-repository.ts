import { ShortUrl } from "../entities/short-url";

export interface IShortUrlRepository {
    slugExists(slug: string): Promise<boolean>
    create(shortUrl: ShortUrl): Promise<ShortUrl>
    findBySlug(slug: string): Promise<ShortUrl | null>
}