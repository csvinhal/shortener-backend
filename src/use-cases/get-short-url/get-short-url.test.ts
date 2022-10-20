import { ShortUrlMapper } from '../../adpters/mappers/ShortUrlMapper'
import { ShortUrl } from '../../entities/short-url'
import { InMemoryShortUrlRepository } from '../../repositories/in-memory-short-url-repository'
import { IShortUrlRepository } from '../../repositories/ishort-url-repository'
import { SlugNotFoundError } from './errors/slug-not-found'
import { GetShortUrl } from './get-short-url'

let inMemoryRepository: IShortUrlRepository
let getShortUrl: GetShortUrl

describe('Get short url ', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryShortUrlRepository()
    getShortUrl = new GetShortUrl(inMemoryRepository)
  })

  it('should get a short url', async () => {
    const shortUrl = ShortUrlMapper.toDomain({
      _id: '',
      slug: 's24sd5',
      url: 'www.exaple.com',
    })
    await inMemoryRepository.create(shortUrl as ShortUrl)
    const response = await getShortUrl.execute('s24sd5')

    expect(response.isRight()).toBe(true)
  })

  it('should not be able to get with SlugNotFoundError', async () => {
    const response = await getShortUrl.execute('s24sd5')

    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new SlugNotFoundError('s24sd5'))
  })
})
