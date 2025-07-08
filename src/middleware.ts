import { NextRequest, NextResponse } from "next/server"

import errorHandler from "./lib/api/helpers/errorHandler"
import { IError } from "./lib/api/types"
import AppError from "./lib/api/utils/AppError"
import { verifyToken } from "./lib/api/utils/auth"

const excludedPaths = [
  "/api/login",
  "/api/register",
  "/api/protect",
  "/api/refresh-token",
]

// export default async function middleware(request: NextRequest) {

//   if (!excludedPaths.includes(request.nextUrl.pathname)) {
//     const nextResponse = NextResponse.next()

//     axios.interceptors.response.use(
//       function (response) {
//         if (request.nextUrl.pathname.startsWith("/api")) {
//           nextResponse.headers.set("x-userid", response.headers["x-userid"])
//         }
//         return response
//       },
//       async function (error) {
//         if (error instanceof AxiosError) {
//           if (
//             error.response?.status === 401 &&
//             !error.response.config.url?.includes("/api/refresh-token")
//           ) {
//             try {
//               // refresh token route
//               const data = await axios.post(
//                 `${request.nextUrl.origin}/api/refresh-token`,
//                 null,
//                 {
//                   headers: {
//                     Cookie: request.cookies.toString(),
//                   },
//                 }
//               )

//               // set cookie
//               nextResponse.cookies.set(
//                 "access_token",
//                 data.data.data.accessToken,
//                 {
//                   ...cookieOptions({
//                     // minutes to milliseconds
//                     expires:
//                       parseInt(configuration.JWT.accessTokenExpiresIn) *
//                       60 *
//                       1000,
//                   }),
//                 }
//               )

//               return Promise.resolve(data)
//             } catch (error) {
//               return Promise.reject(error)
//             }
//           }

//           return Promise.reject(error)
//         }
//       }
//     )

//     try {
//       // throw app error if there is no refresh_token
//       //
//       await axios.get(`${request.nextUrl.origin}/api/protect`, {
//         headers: {
//           Cookie: request.cookies.toString(),
//         },
//       })

//       return nextResponse
//     } catch (e) {
//       if (e instanceof AxiosError) {
//         // send json response for API test using postman
//         if (request.nextUrl.pathname.startsWith("/api")) {
//           return NextResponse.json({ ...e.response?.data })
//         }
//         if (`${e.response?.data.error.status}`.startsWith("4")) {
//           return NextResponse.redirect(new URL("/login", request.nextUrl))
//         }
//         return NextResponse.redirect(new URL("/something", request.nextUrl))
//       }
//       return NextResponse.redirect(new URL("/something", request.nextUrl))
//     }
//   }

//   return NextResponse.next()
// }

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    if (excludedPaths.includes(request.nextUrl.pathname))
      return NextResponse.next()

    try {
      const accessToken = request.cookies.get("access_token")?.value

      if (!accessToken) throw new AppError("UNAUTHORIZED", 401)

      const userId = await verifyToken(accessToken)

      const response = NextResponse.next()

      response.headers.set("x-userid", userId)

      return response
    } catch (error) {
      return errorHandler(error as IError, request)
    }
  }

  return NextResponse.next()
}

// export const config = {
//   matcher: ["/", "/:path", "/api/:path"],
// }

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
}
