import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../external/service/app'

describe('Create short url controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('should be able to create a new short url', async () => {
    const response = await request(app)
      .post('/short')
      .set('Accept', 'application/json')
      .send({
        url: 'www.example.com',
      })

    expect(response.status).toBe(200)
  })
})
