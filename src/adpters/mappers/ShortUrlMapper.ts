import { IShortUrlData } from '../../entities/ishort-url-data'
import { ShortUrl } from '../../entities/short-url'
import { Slug } from '../../entities/slug'
import { Url } from '../../entities/url'
import { IShortUrlModel } from '../../external/mongoDB/models/short-url'

interface IShortUrlMapper {
  toDomain: (shortUrlModel: IShortUrlModel) => ShortUrl | null
  toPersistence: (shortUrl: ShortUrl) => Promise<IShortUrlData>
}

function shortUrlMapper(): IShortUrlMapper {
  const toDomain = ({ _id, slug, url }: IShortUrlModel): ShortUrl | null => {
    const slugOrError = Slug.create(slug)
    const urlOrError = Url.create(url)

    if (slugOrError.isLeft()) {
      return null
    }

    if (urlOrError.isLeft()) {
      return null
    }

    const shortUrlOrError = ShortUrl.create(
      {
        slug: slugOrError.value,
        url: urlOrError.value,
      },
      _id,
    )

    if (shortUrlOrError.isRight()) {
      return shortUrlOrError.value
    }

    return null
  }

  const toPersistence = async (shortUrl: ShortUrl): Promise<IShortUrlData> => {
    return {
      id: shortUrl.id,
      slug: shortUrl.slug,
      url: shortUrl.url,
    }
  }

  return {
    toDomain,
    toPersistence,
  }
}
export const ShortUrlMapper = shortUrlMapper()
