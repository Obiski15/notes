import { NextRequest } from "next/server"

import Note from "../../models/note.model"
import catchAsync from "../../utils/helpers/catchAsync"
import sendResponse from "../../utils/helpers/sendResponse"

export const GET = catchAsync(async (request: NextRequest) => {
  const filter: Record<string, string> = {}
  const { searchParams } = request.nextUrl

  const noteStatus = searchParams.get("status")
  const folderId = searchParams.get("folder")

  if (folderId) {
    filter["folder"] = folderId
  }

  const query = {
    ...filter,
    ...(!noteStatus
      ? {
          $or: [{ status: "active" }, { status: "favorites" }],
        }
      : { status: noteStatus }),
  }

  const notes = await Note.find(query)
    .populate("folder")
    .sort([
      ["updatedAt", "desc"],
      ["title", "desc"],
    ])

  return sendResponse({ status: "success", statusCode: 200, data: { notes } })
})

export const POST = catchAsync(async (request: NextRequest) => {
  const body = await request.json()

  const note = await Note.create({ ...body })

  return sendResponse({ status: "success", statusCode: 201, data: { note } })
})
