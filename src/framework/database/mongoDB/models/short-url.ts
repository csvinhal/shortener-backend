import { Document, model, Schema } from "mongoose";

export interface IShortUrl {
  _id: string;
  slug: string;
  url: string;
}

const ShortUrl = new Schema(
  {
    slug: {
      type: String,
      index: true,
      unique: true,
    },
    url: {
      type: String,
      required: [true, "Url not informed."],
      index: true,
    },
  },
  { timestamps: true }
);

export default model<IShortUrl & Document>("ShortUrl", ShortUrl);
