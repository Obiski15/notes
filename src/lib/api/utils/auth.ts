import { NextRequest } from "next/server"
import config from "@/config"
import * as jose from "jose"

import sendResponse from "../helpers/sendResponse"
import AppError from "./AppError"
import { cookieOptions } from "./cookieOptions"

const secret = new TextEncoder().encode(config.JWT.secret)
const alg = "HS256"

export interface IPayload extends jose.JWTPayload {
  userId: string
}

type IJwtPayload = jose.JWTVerifyResult<IPayload>

const getAuthToken = (
  request: NextRequest,
  token: "refresh_token" | "access_token"
) => {
  const authToken = request.cookies.get(token)?.value

  return authToken ?? ""
}

const signToken = async ({
  payload,
  options,
}: {
  payload: IPayload
  options: { expiresIn: string | number; alg: string }
}) => {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: options.alg })
    .setIssuedAt()
    .setExpirationTime(options.expiresIn)
    .sign(secret)

  return jwt
}

const signRefreshToken = async (payload: IPayload) => {
  return await signToken({
    payload,
    options: {
      alg,
      expiresIn: config.JWT.refreshTokenExpiresIn,
    },
  })
}

const signAccessToken = async (payload: IPayload) => {
  return await signToken({
    payload,
    options: {
      alg,
      expiresIn: config.JWT.accessTokenExpiresIn,
    },
  })
}

const verifyToken = async (token: string) => {
  if (!token.length) throw new AppError("Invalid or Missing Auth token", 401)

  const { payload } = (await jose.jwtVerify(token, secret)) as IJwtPayload

  return payload
}

const signSendResponse = async ({
  payload,
  data,
  statusCode,
}: {
  payload: IPayload
  data?: unknown
  statusCode: number
}) => {
  const accessToken = await signAccessToken(payload)
  const refreshToken = await signRefreshToken(payload)

  const response = sendResponse({
    status: "success",
    statusCode: statusCode,
    data: { data },
  })

  response.cookies.set("access_token", accessToken, {
    ...cookieOptions({
      // minutes to milliseconds
      expires: parseInt(config.JWT.accessTokenExpiresIn) * 60 * 1000,
    }),
  })

  response.cookies.set("refresh_token", refreshToken, {
    ...cookieOptions({
      expires:
        // weeks to milliseconds
        parseInt(config.JWT.refreshTokenExpiresIn) * 7 * 24 * 60 * 60 * 1000,
    }),
  })

  return response
}

export {
  getAuthToken,
  signAccessToken,
  signSendResponse,
  signToken,
  verifyToken,
}
