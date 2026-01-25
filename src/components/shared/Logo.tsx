import { Kaushan_Script } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

export const KaushaScript = Kaushan_Script({
  variable: "--font-kaushan-script",
  subsets: ["latin"],
  weight: ["400"],
})

function Logo() {
  return (
    <Link
      href="/"
      className="flex h-10 items-center justify-start gap-2 rounded-md transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      aria-label="Go to home page"
    >
      <p
        className={`${KaushaScript.className} text-2xl font-normal text-text-primary`}
      >
        Notes
      </p>
      <Image
        src="/icons/icon.svg"
        alt="Notes app icon"
        width={15}
        height={15}
      />
    </Link>
  )
}

export default Logo
