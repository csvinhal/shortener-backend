import { Either } from '../../core/either'
import { IShortUrlData } from '../../entities/ishort-url-data'
import { UrlNotFoundError } from './errors/url-not-found'

export type GetShortUrlResponse = Either<UrlNotFoundError, IShortUrlData>
