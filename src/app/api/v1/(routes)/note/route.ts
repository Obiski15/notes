import { NextRequest } from "next/server"

import Note from "../../models/note.model"
import catchAsync from "../../utils/helpers/catchAsync"
import sendResponse from "../../utils/helpers/sendResponse"

export const GET = catchAsync(async (request: NextRequest) => {
  const filter: Record<string, string> = {}
  const noteStatus = request.nextUrl.searchParams.get("status")
  const folderId = request.nextUrl.searchParams.get("folder")

  if (folderId) {
    filter["folder"] = folderId
  }

  const notes = await Note.find({
    status: !noteStatus ? "active" : noteStatus,
    ...filter,
  }).populate("folder")

  return sendResponse({ status: "success", statusCode: 200, data: { notes } })
})

export const POST = catchAsync(async (request: NextRequest) => {
  const body = await request.json()

  const note = await Note.create({ ...body })

  return sendResponse({ status: "success", statusCode: 201, data: { note } })
})
