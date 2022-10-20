import mongoose from 'mongoose'
import request from 'supertest'
import ShorUrlModel from '../../external/mongoDB/models/short-url'
import { app } from '../../external/service/app'
import { SlugNotFoundError } from '../../use-cases/get-short-url/errors/slug-not-found'

describe('Get short url controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL as string)
    await ShorUrlModel.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('should be able to get a short url', async () => {
    await ShorUrlModel.create({ slug: '23sa5', url: 'www.example.com' })
    const response = await request(app).get('/short/23sa5')

    expect(response.status).toBe(200)
  })

  it('should return error if not found', async () => {
    const response = await request(app).get('/short/41dh8')

    expect(response.status).toBe(404)
    expect(response.body.error).toBe(new SlugNotFoundError('41dh8').message)
  })
})
