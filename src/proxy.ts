import { NextRequest, NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

import errorHandler from "./lib/api/helpers/errorHandler"
import { IError } from "./lib/api/types"
import AppError from "./lib/api/utils/AppError"
import { verifyToken } from "./lib/api/utils/auth"

const excludedPaths = ["/api/auth"]

async function limitApiRequest(ip: string) {
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "1m"),
    analytics: true,

    prefix: "@upstash/ratelimit",
  })

  const limit = await ratelimit.limit(ip)

  return limit
}

export default async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    try {
      const ip = request.headers.get("x-forwarded-for")!
      const limit = await limitApiRequest(ip)

      if (!limit.success) throw new AppError("Too many requests", 429)

      if (excludedPaths.find(path => request.nextUrl.pathname.includes(path)))
        return NextResponse.next()

      const accessToken = request.cookies.get("accessToken")?.value

      if (!accessToken) throw new AppError("UNAUTHORIZED", 401)

      const { userId } = await verifyToken(accessToken)

      const response = NextResponse.next()

      response.headers.set("x-userid", userId)

      return response
    } catch (error) {
      return errorHandler(error as IError, request)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
}
