import { Search } from "lucide-react"

import Logo from "../shared/Logo"
import Folders from "./Folders"
import More from "./More"
import Recents from "./Recents"

function Sidebar() {
  return (
    <div className="no_scrollbar col-span-3 h-screen space-y-[30px] overflow-y-scroll py-[30px]">
      <div className="flex items-center justify-between px-5">
        <Logo />
        <Search className="size-5 text-foreground/40" />
      </div>

      <div className="space-y-[30px]">
        <Recents />
        <Folders />
        <More />
      </div>
    </div>
  )
}

export default Sidebar
