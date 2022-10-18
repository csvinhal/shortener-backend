import { ShortUrl } from './short-url'
import { Slug } from './slug'
import { Url } from './url'

const slug = Slug.create('3sd452').value as Slug
const url = Url.create('http://www.example.com').value as Url

describe('ShortUrl model', () => {
  test('should be able to create a new short url', () => {
    const shortUrlOrError = ShortUrl.create({
      slug,
      url,
    })

    expect(shortUrlOrError.isRight()).toBeTruthy()
  })
})
