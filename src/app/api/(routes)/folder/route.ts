import { NextRequest } from "next/server"
import Folder from "@/models/folder.model"

import catchAsync from "@/lib/api/helpers/catchAsync"
import sendResponse from "@/lib/api/helpers/sendResponse"
import AppError from "@/lib/api/utils/AppError"

export const GET = catchAsync(async (request: NextRequest) => {
  const userId = request.headers.get("x-userid")

  const folders = await Folder.find({ userId })

  return sendResponse({ status: "success", statusCode: 200, data: { folders } })
})

export const POST = catchAsync(async (request: NextRequest) => {
  const name = (await request.json()).folder
  const userId = request.headers.get("x-userid")

  if (!name) {
    throw new AppError("Missing folder name", 400)
  }

  const folder = await Folder.create({ name, userId })

  return sendResponse({ status: "success", statusCode: 201, data: { folder } })
})
