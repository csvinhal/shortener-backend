import req from "supertest";
import url from "./url";
import express from "express";
import mongoose from "mongoose";
import config from "../config";

const app = express();
app.use(express.json());
url(app);

describe("Test the addLike method", () => {
  beforeAll(async () => {
    await mongoose.connect(config.databaseURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  test("[POST] /", async (done) => {
    const res = await req(app)
      .post("/")
      .send({
        url: "www.teste.com",
        slug: "testing",
      })
      .set("Accept", "application/json");
    expect(res.status).toBe(201);
    expect(res.body.url).toBe("www.teste.com");
    expect(res.body.slug).toBe("testing");
    done();
  });

  async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
  }

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
