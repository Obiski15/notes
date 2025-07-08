import { NextRequest } from "next/server"

import catchAsync from "@/lib/api/helpers/catchAsync"
import sendResponse from "@/lib/api/helpers/sendResponse"

export const POST = catchAsync(async (_request: NextRequest) => {
  const authCookies = ["refresh_token", "access_token"]

  const response = sendResponse({ statusCode: 200, status: "success" })

  authCookies.map(cookie => response.cookies.delete(cookie))

  return response
})
