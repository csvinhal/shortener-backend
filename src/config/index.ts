import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env",
});
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: Number(process.env.PORT || 4000),
  databaseURL: String(process.env.MONGODB_URI),
};
