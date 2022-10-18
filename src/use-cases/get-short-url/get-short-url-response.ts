import { Either } from '../../core/either'
import { IShortUrlData } from '../../entities/ishort-url-data'
import { SlugNotFoundError } from './errors/slug-not-found'

export type GetShortUrlResponse = Either<SlugNotFoundError, IShortUrlData>
