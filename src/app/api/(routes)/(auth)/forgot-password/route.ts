import { NextRequest } from "next/server"
import config from "@/config"
import ResetPasswordEmail from "@/emails/ResetPassword"
import User from "@/models/user.model"
import { render } from "@react-email/components"

import catchAsync from "@/lib/api/helpers/catchAsync"
import sendResponse from "@/lib/api/helpers/sendResponse"
import AppError from "@/lib/api/utils/AppError"
import sendMail from "@/lib/api/utils/sendMail"

export const POST = catchAsync(async (request: NextRequest) => {
  const email = (await request.json()).email

  if (!email) throw new AppError("Missing email address", 400)

  const user = await User.findOne({ email })

  if (!user) throw new AppError("User not found", 404)

  // generate resetToken
  const resetToken = await user.createResetToken()
  const resetLink = `${request.nextUrl.origin}/reset-password/${resetToken}`

  // send email
  await sendMail({
    from: config.MAILTRAP.default.email,
    to: user.email,
    html: await render(ResetPasswordEmail({ email: user.email, resetLink })),
    subject: "Action Required: Password Reset Request",
  })

  await user.save({ validateBeforeSave: false })

  return sendResponse({
    status: "success",
    statusCode: 200,
    data: { ...(config.nodeEnv === "development" && { resetToken }) },
  })
})
