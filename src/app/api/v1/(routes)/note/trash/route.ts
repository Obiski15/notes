import { NextRequest } from "next/server"

import Note from "../../../models/note.model"
import AppError from "../../../utils/AppError"
import catchAsync from "../../../utils/helpers/catchAsync"
import sendResponse from "../../../utils/helpers/sendResponse"

export const DELETE = catchAsync(async (request: NextRequest) => {
  const body = await request.json()
  const notes = body.notes as string[]

  if (!notes) throw new AppError("Missing notes array", 400)

  await Note.deleteMany({ _id: { $in: notes } })

  return sendResponse({ status: "success", statusCode: 200 })
})
