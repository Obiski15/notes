import { NextRequest } from "next/server"
import User from "@/models/user.model"

import catchAsync from "@/lib/api/helpers/catchAsync"
import AppError from "@/lib/api/utils/AppError"
import { signSendResponse } from "@/lib/api/utils/auth"

export const POST = catchAsync(async (request: NextRequest) => {
  const body = await request.json()
  const email = body.email
  const password = body.password

  if (!email || !password) throw new AppError("Missing email or password", 400)

  const user = await User.findOne({ email }).select("+password")

  if (!user) throw new AppError("User doesn't Exist", 404)

  const verifyPassword = await user.comparePassword(password)

  user.password = undefined

  if (!verifyPassword) throw new AppError("Invalid Email or password", 400)

  return signSendResponse({
    payload: { userId: user._id.toString() },
    data: user,
    statusCode: 200,
  })
})
