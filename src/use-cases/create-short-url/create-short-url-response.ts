import { Either } from '../../core/either'
import { InvalidSlugError } from '../../entities/errors/invalid-slug-error'
import { InvalidUrlError } from '../../entities/errors/invalid-url-error'
import { IShortUrlData } from '../../entities/ishort-url-data'
import { SlugAlreadyExistsError } from './errors/slug-already-exists'

export type CreateShortUrlResponse = Either<
  SlugAlreadyExistsError | InvalidSlugError | InvalidUrlError,
  IShortUrlData
>
