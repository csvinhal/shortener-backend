import { GetShortUrlResponse } from "./get-short-url-response";

export interface IGetShortUrl {
  execute: (slug: string) => Promise<GetShortUrlResponse>;
}
