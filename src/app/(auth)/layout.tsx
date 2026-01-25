import { Kaushan_Script } from "next/font/google"
import Image from "next/image"

const KaushaScript = Kaushan_Script({
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
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="no_scrollbar my-8 max-h-[calc(100vh-4rem)] w-full max-w-[476px] space-y-8 overflow-y-auto">
        <div className="mx-auto w-fit">
          <div className="flex items-start justify-between gap-2">
            <Image src="/icons/icon.svg" alt="icon" width={30} height={30} />
            <p className={`text-3xl ${KaushaScript.className}`}>Notes</p>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
