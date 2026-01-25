import { NextRequest } from "next/server"
import User from "@/models/user.model"

import catchAsync from "@/lib/api/helpers/catchAsync"
import AppError from "@/lib/api/utils/AppError"
import { signSendResponse } from "@/lib/api/utils/auth"

export const POST = catchAsync(async (request: NextRequest) => {
  const body = await request.json()
  const confirm_password = body.confirm_password
  const password = body.password
  const email = body.email

  if (!email || !password || !confirm_password)
    throw new AppError("Missing email or password", 400)

  const user = await User.create({ email, password, confirm_password })

  user.password = undefined

  return signSendResponse({
    payload: { userId: user._id.toString() },
    data: user,
    statusCode: 201,
  })
})
