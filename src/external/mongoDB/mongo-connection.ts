import mongoose from 'mongoose'
import config from '../../config/envs'

export default function MongoConnection(): { connect: () => Promise<void> } {
  const connect = async (): Promise<void> => {
    try {
      await mongoose.connect(config.databaseURL)
      console.info('Connected to MongoDB!')
    } catch (e) {
      console.error(`Error in MongoDb connection`)
      await mongoose.disconnect()
    }
  }

  return {
    connect,
  }
}
