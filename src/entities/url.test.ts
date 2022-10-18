import { Url } from './url'

describe('ShortUrl url value object', () => {
  test('Should accept valid url)', () => {
    const urlOrError = Url.create('http://www.example.com')
    expect(urlOrError.isRight()).toBeTruthy()
  })

  test('Should accept valid urls', () => {
    expect(Url.validate('https://www.example.com')).toBe(true)
    expect(Url.validate('http://www.example.com')).toBe(true)
    expect(Url.validate('www.example.com')).toBe(true)
    expect(Url.validate('example.com')).toBe(true)
    expect(Url.validate('http://www.example.com/products?id=1&page=2')).toBe(
      true,
    )
    expect(Url.validate('http://www.site.com:8008')).toBe(true)
  })

  test('Should not accept invalid url', () => {
    expect(Url.validate('http://invalid.com/perl.cgi?key= |')).toBe(false)
    expect(Url.validate('http://web-site.com/perl.cgi?key1=value1&key2^')).toBe(
      false,
    )
    expect(Url.validate('ttp://invalid.com/perl.cgi?key=')).toBe(false)
    expect(Url.validate('://invalid.com/perl.cgi?key=')).toBe(false)
    expect(Url.validate('ftp://invalid.com/perl.cgi?key=')).toBe(false)
  })
})
