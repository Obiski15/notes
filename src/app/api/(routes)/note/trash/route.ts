import { NextRequest } from "next/server"
import Note from "@/models/note.model"
import { NOTESTATUS } from "@/types"

import catchAsync from "@/lib/api/helpers/catchAsync"
import sendResponse from "@/lib/api/helpers/sendResponse"
import AppError from "@/lib/api/utils/AppError"

export const DELETE = catchAsync(async (request: NextRequest) => {
  const body = await request.json()
  const userId = request.headers.get("x-userid")
  const notes = body.notes as string[]

  if (!notes) throw new AppError("Missing notes array", 400)

  await Note.deleteMany({
    $and: [
      { _id: { $in: notes } },
      { userId: { $eq: userId } },
      { status: NOTESTATUS.TRASH },
    ],
  })

  return sendResponse({ status: "success", statusCode: 200 })
})
