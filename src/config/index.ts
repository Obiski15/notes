interface IConfig {
  DB: {
    uri: string
    name: string
  }
  nodeEnv: "development" | "production"
  JWT: {
    secret: string
    accessTokenExpiresIn: string
    refreshTokenExpiresIn: string
  }
  saltRounds: number
}

const config: IConfig = {
  DB: {
    uri: process.env.MONGO_URI!.replace(
      "%PASSWORD%",
      process.env.MONGO_PASSWORD!
    ),
    name: "notes",
  },
  nodeEnv: process.env.NODE_ENV as "development" | "production",
  JWT: {
    secret: process.env.JWT_SECRET!,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN ?? "0",
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? "0",
  },
  saltRounds: 10,
}

export default config
