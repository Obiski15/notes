import { NextRequest } from "next/server"
import Note from "@/models/note.model"
import { NOTESTATUS } from "@/types"

import catchAsync from "@/lib/api/helpers/catchAsync"
import sendResponse from "@/lib/api/helpers/sendResponse"

export const GET = catchAsync(async (request: NextRequest) => {
  const userId = request.headers.get("x-userid")!
  const filter: Record<string, string> = { userId }
  const { searchParams } = request.nextUrl

  const noteStatus = searchParams.get("status")
  const folderId = searchParams.get("folder")

  if (folderId) {
    filter["folder"] = folderId
  }

  const query = {
    ...filter,
    ...(!noteStatus || noteStatus === NOTESTATUS.ACTIVE
      ? {
          $or: [
            { status: NOTESTATUS.ACTIVE },
            { status: NOTESTATUS.FAVORITES },
          ],
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
  const userId = request.headers.get("x-userid")

  const note = await Note.create({ ...body, userId })

  return sendResponse({ status: "success", statusCode: 201, data: { note } })
})
