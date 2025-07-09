"use client"

import { Ref } from "react"
import { Menu } from "lucide-react"

import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useNoteLocation } from "@/hooks/useNoteLocation"

import CustomIcon from "../shared/CustomIcon"
import Logo from "../shared/Logo"
import SearchNote from "../shared/notes/SearchNote"
import Sidebar from "../sidebar/Sidebar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import Settings from "../user/Settings"

function MobileSidebar() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    !isDesktop && (
      <Sheet>
        <SheetTrigger>
          <CustomIcon Icon={Menu} />
        </SheetTrigger>
        <SheetHeader className="hidden">
          <SheetTitle>Sidebar header</SheetTitle>
          <SheetDescription>Sidebar description</SheetDescription>
        </SheetHeader>

        <SheetContent className="border-none p-0 [&>button]:hidden">
          <Sidebar />
        </SheetContent>
      </Sheet>
    )
  )
}

function Header({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const { folder, status } = useNoteLocation()

  return (
    <div ref={ref} className="flex items-center justify-between p-6 lg:p-3">
      <div className="lg:hidden">
        <Logo />
      </div>

      <p className="text-[22px] font-semibold capitalize max-lg:hidden">
        {folder.name || (!(status === "active") ? status : "All Notes")}
      </p>

      <div className="flex items-center justify-between gap-3 max-lg:hidden">
        <SearchNote />
        <Settings />
      </div>
      <MobileSidebar />
    </div>
  )
}

export default Header
