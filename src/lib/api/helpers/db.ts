import config from "@/config"
import mongoose from "mongoose"

const connection: { isConnected?: number } = {}

async function db() {
  if (connection.isConnected) {
    return
  }

  try {
    const db = await mongoose.connect(config.DB.uri, {
      dbName: config.DB.name,
    })
    connection.isConnected = db.connections[0].readyState

    console.info("connection successful")
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export default db
