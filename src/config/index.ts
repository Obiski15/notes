interface IConfig {
  DB: {
    uri: string
    name: string
  }
  CLIENT_URL: string
  AUTH: {
    passwordResetTokenExpiresIn: number
  }
  JWT: {
    secret: string
    accessTokenExpiresIn: string
    refreshTokenExpiresIn: string
  }
  COOKIES: {
    accessTokenExpiresIn: number
    refreshTokenExpiresIn: number
  }
  MAILTRAP: {
    user: string
    pass: string
    default: {
      email: string
    }
  }
  GOOGLE: {
    clientId: string
    clientSecret: string
    pass: string
    user: string
  }
  nodeEnv: "development" | "production"
  saltRounds: number
}

const ENV = process.env

const config: IConfig = {
  DB: {
    uri: ENV["MONGO_URI"]!.replace("%PASSWORD%", ENV["MONGO_PASSWORD"]!),
    name: "notes",
  },
  nodeEnv: ENV["NODE_ENV"] as "development" | "production",
  CLIENT_URL: ENV["CLIENT_URL"]!,
  JWT: {
    secret: ENV["JWT_SECRET"]!,
    accessTokenExpiresIn: ENV["ACCESS_TOKEN_EXPIRES_IN"] ?? "0",
    refreshTokenExpiresIn: ENV["REFRESH_TOKEN_EXPIRES_IN"] ?? "0",
  },
  COOKIES: {
    accessTokenExpiresIn: parseInt(ENV["ACCESS_TOKEN_EXPIRES_IN"]!) * 60 * 1000, // minutes to milliseconds
    refreshTokenExpiresIn:
      parseInt(ENV["REFRESH_TOKEN_EXPIRES_IN"]!) * 7 * 24 * 60 * 60 * 1000, // weeks to milliseconds
  },
  AUTH: {
    passwordResetTokenExpiresIn: 5 * 60 * 1000,
  },
  MAILTRAP: {
    user: ENV["MAILTRAP_USER"]!,
    pass: ENV["MAILTRAP_PASS"]!,
    default: {
      email: ENV["GOOGLE_MAIL"]!,
    },
  },
  GOOGLE: {
    clientId: ENV["GOOGLE_CLIENT_ID"]!,
    clientSecret: ENV["GOOGLE_CLIENT_SECRET"]!,
    pass: ENV["GOOGLE_PASS"]!,
    user: ENV["GOOGLE_MAIL"]!,
  },
  saltRounds: 10,
}

export default config
