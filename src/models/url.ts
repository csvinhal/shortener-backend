import { IUrl } from "../interfaces/iurl";
import mongoose from "mongoose";

const Url = new mongoose.Schema(
  {
    slug: {
      type: String,
      index: true,
      unique: true,
    },
    url: {
      type: String,
      required: [true, "Insira a URL"],
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUrl & mongoose.Document>("Url", Url);
