import { Either, left, right } from "../shared/either"
import { IShortUrlData } from "./ishort-url-data"

export class ShortUrl {
    public readonly slug: string
    public readonly url: string

    constructor(slug: string, url: string) {
        this.slug = slug
        this.url = url
        Object.freeze(this)
    }

    static create(urlData: IShortUrlData): Either<Error, ShortUrl> {
        const {slug, url} = urlData

        if (!url) {
            try {
                new URL(url);
            } catch (e) {
                left('Url is not valid!')
            }
        }
        
        return right(new ShortUrl(slug, url))
    }
}