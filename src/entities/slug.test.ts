import { Slug } from './slug'

describe('ShortUrl slug value object', () => {
  test('Should accept valid slug)', () => {
    const slugOrError = Slug.create('s4g35x')
    expect(slugOrError.isRight()).toBeTruthy()
  })

  test('Should not accept empty slug', () => {
    const slug = Slug.create('')
    expect(slug.isLeft()).toBeTruthy()
  })
})
