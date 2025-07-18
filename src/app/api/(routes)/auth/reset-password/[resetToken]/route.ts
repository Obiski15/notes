import { NextRequest } from "next/server"
import User from "@/models/user.model"

import catchAsync from "@/lib/api/helpers/catchAsync"
import createHash from "@/lib/api/helpers/createHash"
import sendResponse from "@/lib/api/helpers/sendResponse"
import AppError from "@/lib/api/utils/AppError"

export const POST = catchAsync(
  async (request: NextRequest, context?: { params: Promise<unknown> }) => {
    const { password, confirm_password } = await request.json()

    const params = (await context?.params) as { resetToken: string }

    if (!params.resetToken) throw new AppError("Missing reset token", 403)

    if (!password || !confirm_password)
      throw new AppError("Missing password or password confirmation", 400)

    if (password !== confirm_password)
      throw new AppError("Password doesn't match", 400)

    const resetToken = createHash(params.resetToken)

    const user = await User.findOne({ passwordResetToken: resetToken }).select(
      "+passwordResetTokenExpiresIn"
    )

    if (!user) throw new AppError("User not found", 404)

    // validate reset token
    const isTokenValid = await user.validateResetToken()

    if (!isTokenValid) throw new AppError("Invalid or expired reset token", 403)

    user.passwordResetToken = undefined
    user.passwordResetTokenExpiresIn = undefined
    user.password = password
    user.confirm_password = confirm_password
    user.passwordUpdatedAt = Date.now()
    await user.save({ validateBeforeSave: false })

    const response = sendResponse({ status: "success", statusCode: 200 })

    // invalidate auth cookies
    response.cookies.set("refreshToken", "", { maxAge: 0 })
    response.cookies.set("accessToken", "", { maxAge: 0 })

    return response
  }
)
