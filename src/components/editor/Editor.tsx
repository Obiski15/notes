import NoteOptions from "./NoteOptions"
import TextEditor from "./TextEditor"

function Editor() {
  return (
    <div className="space-y-[30px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-semibold">Note Title</h1>
        <NoteOptions />
      </div>

      <TextEditor />
    </div>
  )
}

export default Editor
