import { NextResponse } from "next/server"

interface IResponse {
  status: "success" | "fail" | "error"
  statusCode: number
  data?: unknown
  error?: unknown
}

export default function sendResponse({ statusCode = 200, ...data }: IResponse) {
  return NextResponse.json(data, { status: statusCode })
}
