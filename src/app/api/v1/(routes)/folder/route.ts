import { NextRequest } from "next/server"

import Folder from "../../models/folder.model"
import AppError from "../../utils/AppError"
import catchAsync from "../../utils/helpers/catchAsync"
import sendResponse from "../../utils/helpers/sendResponse"

export const GET = catchAsync(async () => {
  const folders = await Folder.find()

  return sendResponse({ status: "success", statusCode: 200, data: { folders } })
})

export const POST = catchAsync(async (request: NextRequest) => {
  const name = (await request.json()).folder
  if (!name) {
    throw new AppError("Missing folder name", 401)
  }

  const folder = await Folder.create({ name })

  return sendResponse({ status: "success", statusCode: 201, data: { folder } })
})
