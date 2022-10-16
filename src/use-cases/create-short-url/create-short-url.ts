import { ShortUrl } from "../../entities/short-url";
import { IShortUrlRepository } from "../../repositories/ishort-url-repository";
import { left } from "../../shared/either";
import { ICreateShortUrlDto } from "./icreate-short-url-dto";

export class CreateShortUrl {
    constructor(
        private shortUrlRepository: IShortUrlRepository
    ) {}

    async execute(data: ICreateShortUrlDto) {
        const {slug} = data
        const slugAlreadyExists = await this.shortUrlRepository.slugExists(slug);

        if (slugAlreadyExists) {
            throw new Error('Slug already in use.')
        }

        const shortUrlOrError = ShortUrl.create(data)

        if (shortUrlOrError.isLeft()) {
            return left(shortUrlOrError.value)
        }

        const shortUrl: ShortUrl = shortUrlOrError.value
        return this.shortUrlRepository.create(shortUrl)
    }
}