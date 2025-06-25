"use server"

import { cookies } from "next/headers"

const getAuthTokens = async () => {
  const refreshToken = (await cookies()).get("refresh_token")
  const accessToken = (await cookies()).get("access_token")

  return { refreshToken, accessToken }
}

export default getAuthTokens
