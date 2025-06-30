import Logo from "../shared/Logo"
import CreateNote from "../shared/notes/CreateNote"
import AllNotes from "./all-notes"
import CompWrapper from "./CompWrapper"
import Folders from "./Folders"
import More from "./More"
import Recents from "./Recents"

function Sidebar() {
  return (
    <div className="no_scrollbar h-screen space-y-7 overflow-y-scroll py-7">
      <CompWrapper className="max-lg:hidden">
        <Logo />
      </CompWrapper>

      <AllNotes />

      <div className="max-lg:hidden">
        <CreateNote />
      </div>

      <div className="space-y-7">
        <Recents />
        <Folders />
        <More />
      </div>
    </div>
  )
}

export default Sidebar
