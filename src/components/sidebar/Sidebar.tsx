import Logo from "../shared/Logo"
import CreateNote from "../shared/notes/CreateNote"
import AllNotes from "./all-notes"
import CompWrapper from "./CompWrapper"
import Folders from "./Folders"
import More from "./More"
import Recents from "./Recents"

function Sidebar() {
  return (
    <aside
      className="no_scrollbar h-screen space-y-6 overflow-y-scroll border-r border-border bg-surface py-6"
      aria-label="Main navigation"
    >
      <CompWrapper className="max-lg:hidden">
        <Logo />
      </CompWrapper>

      <AllNotes />

      <div className="max-lg:hidden">
        <CreateNote />
      </div>

      <div className="space-y-6">
        <Recents />
        <Folders />
        <More />
      </div>
    </aside>
  )
}

export default Sidebar
