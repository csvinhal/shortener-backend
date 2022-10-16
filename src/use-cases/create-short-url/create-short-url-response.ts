import { IShortUrlData } from '../../entities/ishort-url-data'
import { Either } from '../../shared/either'

export type CreateShortUrlResponse = Either<Error, IShortUrlData>
