import { NextRequest, NextResponse } from "next/server"

import db from "@/lib/db"

import { IError } from "../../types"
import errorHandler from "./errorHandler"

const catchAsync = (
  fn: (request: NextRequest) => Promise<NextResponse<unknown>>
) => {
  return async (request: NextRequest) => {
    try {
      await db()
      return await fn(request)
    } catch (error) {
      return errorHandler(error as IError)
    }
  }
}

export default catchAsync
