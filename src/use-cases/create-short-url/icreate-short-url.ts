import { CreateShortUrlResponse } from './create-short-url-response'
import { ICreateShortUrlDto } from './icreate-short-url-dto'

export interface ICreateShortUrl {
  execute: (data: ICreateShortUrlDto) => Promise<CreateShortUrlResponse>
}
