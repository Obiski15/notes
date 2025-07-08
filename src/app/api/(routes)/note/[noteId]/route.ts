import { NextRequest } from "next/server"
import Note from "@/models/note.model"

import catchAsync from "../../../../../lib/api/helpers/catchAsync"
import sendResponse from "../../../../../lib/api/helpers/sendResponse"

export const GET = catchAsync(
  async (request: NextRequest, context?: { params: Promise<unknown> }) => {
    const { noteId } = (await context?.params) as { noteId: string }
    const userId = request.headers.get("x-userid")

    const note = await Note.findOne({ _id: noteId, userId }).populate("folder")

    return sendResponse({ status: "success", statusCode: 200, data: { note } })
  }
)

export const PATCH = catchAsync(
  async (request: NextRequest, context?: { params: Promise<unknown> }) => {
    const body = await request.json()
    const userId = request.headers.get("x-userid")
    const { noteId } = (await context?.params) as { noteId: string }

    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { ...body },
      { new: true }
    )

    return sendResponse({ status: "success", statusCode: 200, data: { note } })
  }
)

export const DELETE = catchAsync(
  async (request: NextRequest, context?: { params: Promise<unknown> }) => {
    const { noteId } = (await context?.params) as { noteId: string }
    const userId = request.headers.get("x-userid")

    await Note.findOneAndDelete({ _id: noteId, userId })

    return sendResponse({ status: "success", statusCode: 200 })
  }
)
