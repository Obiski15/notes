import Image from "next/image"

import Info from "../Info"

function SelectNote() {
  return (
    <Info
      title="Select a note to view"
      message="Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection."
    >
      <Image
        src="/icons/note.svg"
        alt="note"
        width={80}
        height={80}
        className="mx-auto"
      />
    </Info>
  )
}

export default SelectNote
