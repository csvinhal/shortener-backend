export default {
  port: Number(process.env.PORT ?? 4000),
  databaseURL: String(process.env.MONGO_URL),
}
