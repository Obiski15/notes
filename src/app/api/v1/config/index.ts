interface IConfig {
  DB: {
    uri: string
    name: string
  }
  nodeEnv: "development" | "production"
}

if (!process.env.MONGO_URI || !process.env.MONGO_PASSWORD) {
  throw new Error("Missing connection string or Password")
}

const config: IConfig = {
  DB: {
    uri: process.env.MONGO_URI.replace(
      "%PASSWORD%",
      process.env.MONGO_PASSWORD!
    ),
    name: "notes",
  },
  nodeEnv: process.env.NODE_ENV as "development" | "production",
}

export default config
