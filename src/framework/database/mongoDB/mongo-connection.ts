import mongoose from "mongoose";
import config from "../../../config/envs";

export class MongoConnection {
  static connect = async () => {
    try {
      const connection = await mongoose.connect(config.databaseURL);
      console.info("Connected to MongoDB!");
      return connection.connection.db;
    } catch (e) {
      console.error(`Error in MongoDb connection: ${e}`);
      return mongoose.disconnect();
    }
  };
}
