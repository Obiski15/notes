import { NextRequest } from "next/server"

import Note from "../../models/note.model"
import catchAsync from "../../utils/helpers/catchAsync"
import sendResponse from "../../utils/helpers/sendResponse"

export const GET = catchAsync(async (request: NextRequest) => {
  const noteStatus = request.nextUrl.searchParams.get("status")

  const notes = await Note.find({ status: !noteStatus ? "active" : noteStatus })

  return sendResponse({ status: "success", statusCode: 200, data: { notes } })
})

// export const POST = catchAsync(async (request: NextRequest) => {
// const body = request.json()
// validate the body parameter using zod
// content string
// title: string
// folderId: mongoose.Schema.Types.ObjectId
// const note = await Note.create()

// return sendResponse({ status: "success", statusCode: 201 })
// })

// export const PATCH = catchAsync(async (request: NextRequest) => {
// const body = request.json
// validate the body parameter using zod
// id,
// contents to be updated

// const note = await Note.findByIdAndUpdate("hash", {}, { new: true })

// return sendResponse({ status: "success", statusCode: 200 })
// })

// export const Delete = catchAsync(async (request: NextRequest) => {
// const body = request.json
// validate the body parameter using zod
// id,

// return sendResponse({ status: "success", statusCode: 200 })
// })
