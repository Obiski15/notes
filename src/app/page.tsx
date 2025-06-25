import Editor from "@/components/editor/Editor"
import FolderContent from "@/components/folder/FolderContent"

export default function Home() {
  return (
    // use dynamic header height

    <div className="grid h-[calc(100vh-68px)] grid-cols-12 overflow-hidden">
      <div className="no_scrollbar col-span-4 h-[calc(100vh-68px)] overflow-y-scroll">
        <FolderContent />
      </div>

      <div className="h-[calc(100vh-68px) no_scrollbar col-span-8 overflow-y-scroll border-2 p-10">
        <Editor />
      </div>
    </div>
  )
}
