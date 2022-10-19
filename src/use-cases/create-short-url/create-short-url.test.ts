import { InMemoryShortUrlRepository } from '../../repositories/in-memory-short-url-repository'
import { IShortUrlRepository } from '../../repositories/ishort-url-repository'
import { CreateShortUrl } from './create-short-url'
import { SlugAlreadyExistsError } from './errors/slug-already-exists'

let inMemoryRepository: IShortUrlRepository
let createShortUrl: CreateShortUrl

describe('Create short url ', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryShortUrlRepository()
    createShortUrl = new CreateShortUrl(inMemoryRepository)
  })

  it('should create a new short url', async () => {
    const response = await createShortUrl.execute({
      slug: 's24sd5',
      url: 'www.exaple.com',
    })

    expect(await inMemoryRepository.slugExists('s24sd5')).toBe(true)
    expect(response.isRight()).toBe(true)
  })

  it('should not be able to create with SlugAlreadyExistsError', async () => {
    const shotUrl = {
      slug: 's24sd5',
      url: 'www.exaple.com',
    }
    await createShortUrl.execute(shotUrl)

    const response = await createShortUrl.execute(shotUrl)

    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new SlugAlreadyExistsError('s24sd5'))
  })
})
