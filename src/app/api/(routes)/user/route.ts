import { NextRequest } from "next/server"
import User from "@/models/user.model"

import catchAsync from "../../../../lib/api/helpers/catchAsync"
import sendResponse from "../../../../lib/api/helpers/sendResponse"

export const GET = catchAsync(async (request: NextRequest) => {
  const userId = request.headers.get("x-userid")

  const user = await User.findById(userId)

  return sendResponse({ status: "success", statusCode: 200, data: { user } })
})
