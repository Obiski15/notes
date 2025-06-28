import Editor from "@/components/editor/Editor"
import Notes from "@/components/notes/Notes"

export default function Home() {
  return (
    // use dynamic header height

    <div className="grid h-[calc(100vh-68px)] grid-cols-12 overflow-hidden">
      <div className="no_scrollbar col-span-4 h-[calc(100vh-68px)] overflow-y-scroll">
        <Notes />
      </div>

      <Editor />
    </div>
  )
}
