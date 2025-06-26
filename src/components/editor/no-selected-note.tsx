import Image from "next/image"

function NoSelectedNote() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-2.5 text-center">
        <Image
          src="/icons/note.svg"
          alt="note"
          width={80}
          height={80}
          className="mx-auto"
        />
        <h3 className="text-[28px] font-semibold">Select a note to view</h3>
        <p className="leading-[26px] text-foreground/60">
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </div>
    </div>
  )
}

export default NoSelectedNote
