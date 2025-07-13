import { NextRequest } from "next/server"
import config from "@/config"
import User from "@/models/user.model"

import catchAsync from "@/lib/api/helpers/catchAsync"
import sendResponse from "@/lib/api/helpers/sendResponse"
import AppError from "@/lib/api/utils/AppError"
import {
  getAuthToken,
  signAccessToken,
  verifyToken,
} from "@/lib/api/utils/auth"
import { cookieOptions } from "@/lib/api/utils/cookieOptions"

export const POST = catchAsync(async (request: NextRequest) => {
  const refreshToken = getAuthToken(request, "refresh_token")

  const { userId, iat } = await verifyToken(refreshToken)

  const user = await User.findById(userId)

  if (!user) throw new AppError("User does not exist", 404)

  const passwordChangedSinceLastLogin =
    await user.confirmLastPasswordChange(iat)

  if (passwordChangedSinceLastLogin)
    throw new AppError("Password has changed", 401)

  const accessToken = await signAccessToken({ userId })

  const response = sendResponse({
    status: "success",
    statusCode: 200,
  })

  response.cookies.set("access_token", accessToken, {
    ...cookieOptions({
      // minutes to milliseconds
      expires: parseInt(config.JWT.accessTokenExpiresIn) * 60 * 1000,
    }),
  })

  return response
})
