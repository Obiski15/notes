import { Kaushan_Script } from "next/font/google"
import Image from "next/image"

export const KaushaScript = Kaushan_Script({
  variable: "--font-kaushan-script",
  subsets: ["latin"],
  weight: ["400"],
})

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="no_scrollbar max-h-[500px] w-full max-w-[476px] space-y-8 overflow-y-scroll py-5">
        <div className="mx-auto w-fit">
          <div className="flex items-start justify-between gap-2">
            <Image src="/icons/icon.svg" alt="icon" width={30} height={30} />
            <p className={`text-3xl ${KaushaScript.className}`}>Notes</p>
          </div>
        </div>

        <div className="p-5 lg:p-10">{children}</div>
      </div>
    </div>
  )
}
