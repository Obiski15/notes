import { NextRequest, NextResponse } from "next/server"

import db from "@/lib/api/helpers/db"

import { IError } from "../types"
import errorHandler from "./errorHandler"

const catchAsync = (
  fn: (
    request: NextRequest,
    context?: { params: Promise<unknown> }
  ) => Promise<NextResponse<unknown>>
) => {
  return async (
    request: NextRequest,
    context: { params: Promise<unknown> }
  ) => {
    try {
      await db()
      return await fn(request, context)
    } catch (error) {
      return errorHandler(error as IError, request)
    }
  }
}

export default catchAsync
