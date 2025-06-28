import { useContext } from "react"

import { RecentNotesContext } from "@/providers/recent-notes-provider"

export const useRecentNotes = () => {
  const context = useContext(RecentNotesContext)

  if (!context)
    throw new Error(
      "Recent notes context is being accessed outside of its provider"
    )

  return context
}
