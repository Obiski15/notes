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
      className="flex h-[38px] w-[101px] items-start justify-start gap-2.5 bg-transparent"
    >
      <p className={`${KaushaScript.className} text-[26px] font-normal`}>
        Notes
      </p>
      <Image src="/icons/icon.svg" alt="logo" width={15} height={15} />
    </Link>
  )
}

export default Logo
