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
  token: "refreshToken" | "accessToken"
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

  response.cookies.set("accessToken", accessToken, {
    ...cookieOptions({
      expires: config.COOKIES.accessTokenExpiresIn,
    }),
  })

  response.cookies.set("refreshToken", refreshToken, {
    ...cookieOptions({
      expires: config.COOKIES.refreshTokenExpiresIn,
    }),
  })

  return response
}

export {
  getAuthToken,
  signAccessToken,
  signRefreshToken,
  signSendResponse,
  signToken,
  verifyToken,
}
