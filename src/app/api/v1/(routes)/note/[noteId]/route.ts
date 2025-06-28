import { NextRequest } from "next/server"

import Note from "../../../models/note.model"
import catchAsync from "../../../utils/helpers/catchAsync"
import sendResponse from "../../../utils/helpers/sendResponse"

export const GET = catchAsync(
  async (
    // @ts-expect-error unused request
    request: NextRequest,
    context?: { params: Promise<unknown> }
  ) => {
    const { noteId } = (await context?.params) as { noteId: string }
    const note = await Note.findById(noteId).populate("folder")

    return sendResponse({ status: "success", statusCode: 200, data: { note } })
  }
)

export const PATCH = catchAsync(
  async (request: NextRequest, context?: { params: Promise<unknown> }) => {
    const body = await request.json()
    const { noteId } = (await context?.params) as { noteId: string }

    const note = await Note.findByIdAndUpdate(
      noteId,
      { ...body },
      { new: true }
    )

    return sendResponse({ status: "success", statusCode: 200, data: { note } })
  }
)

export const DELETE = catchAsync(
  async (
    // @ts-expect-error unused request
    request: NextRequest,
    context?: { params: Promise<unknown> }
  ) => {
    const { noteId } = (await context?.params) as { noteId: string }

    await Note.findByIdAndDelete(noteId)

    return sendResponse({ status: "success", statusCode: 200 })
  }
)
