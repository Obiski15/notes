import Editor from "@/components/editor/Editor"
import Notes from "@/components/notes/Notes"

export default function Home() {
  return (
    // use dynamic header height
    <div className="grid h-[calc(100vh-68px)] grid-cols-12 overflow-hidden">
      <div className="no_scrollbar col-span-12 h-[calc(100vh-68px)] overflow-y-scroll lg:col-span-4">
        <Notes />
      </div>

      <div className="h-[calc(100vh-68px) no_scrollbar col-span-8 overflow-y-scroll max-lg:hidden">
        <Editor />
      </div>
    </div>
  )
}
