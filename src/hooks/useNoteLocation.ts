import { useContext } from "react"

import { NoteLocationContent } from "@/providers/note-location-provider"

export const useNoteLocation = () => {
  const context = useContext(NoteLocationContent)

  if (!context)
    throw new Error(
      "Note location context is being accessed outside if it's provider"
    )

  return context
}
