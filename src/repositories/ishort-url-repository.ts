import { IShortUrlData } from "../entities/ishort-url-data";
import { ShortUrl } from "../entities/short-url";

export interface IShortUrlRepository {
    slugExists(slug: string): Promise<boolean>
    create(shortUrl: ShortUrl): Promise<IShortUrlData>
    findBySlug(slug: string): Promise<IShortUrlData | null>
}