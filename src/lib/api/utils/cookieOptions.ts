import config from "@/config"
import { SerializeOptions } from "cookie"

export const cookieOptions = ({ expires }: { expires: number }) => {
  return {
    expires: new Date(Date.now() + expires),
    secure: config.nodeEnv === "development" ? false : true,
    httpOnly: true,
    sameSite: "lax",
  } satisfies SerializeOptions
}
