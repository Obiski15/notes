import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { cookies } from "next/headers"
import config from "@/config"
import User from "@/models/user.model"

import db from "@/lib/api/helpers/db"
import { signAccessToken, signRefreshToken } from "@/lib/api/utils/auth"
import { cookieOptions } from "@/lib/api/utils/cookieOptions"
import logger from "@/lib/logger"

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE.clientId,
      clientSecret: config.GOOGLE.clientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: config.JWT.secret,
  callbacks: {
    async signIn({ user: googleUser }) {
      try {
        // find user, if there is no user, create new user
        await db()
        let user = await User.findOne({ googleId: googleUser.id })

        if (!user) {
          user = new User({
            email: googleUser.email,
            googleId: googleUser.id,
          })
          await user.save({ validateBeforeSave: false })
        }

        const accessToken = await signAccessToken({
          userId: user._id.toString(),
        })
        const refreshToken = await signRefreshToken({
          userId: user._id.toString(),
        })

        ;(await cookies()).set("accessToken", accessToken, {
          ...cookieOptions({
            expires: config.COOKIES.accessTokenExpiresIn,
          }),
        })
        ;(await cookies()).set("refreshToken", refreshToken, {
          ...cookieOptions({
            expires: config.COOKIES.refreshTokenExpiresIn,
          }),
        })

        return true
      } catch (error) {
        logger.error(error)
        return false
      }
    },

    async jwt({ token }) {
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
