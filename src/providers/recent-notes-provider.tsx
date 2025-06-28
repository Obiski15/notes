"use client"

import { createContext, ReactNode } from "react"
import { useRouter } from "next/navigation"

import { RECENT_NOTES_KEY } from "@/lib/constants"
import { useLocalStorage } from "@/hooks/useLocalStorage"

type IRecentNote = { title: string; _id: string }

type IRecentNotes = IRecentNote[]

interface IContext {
  recentNotes: IRecentNotes
  setRecentNotes: (val: IRecentNote) => void
}

export const RecentNotesContext = createContext<IContext>({
  recentNotes: [],
  setRecentNotes: () => {},
})

function RecentNotesProvider({ children }: { children: ReactNode }) {
  const { value: recentNotes, setValue } = useLocalStorage<IRecentNotes>(
    RECENT_NOTES_KEY,
    []
  )
  const router = useRouter()

  const setRecentNotes = (note: IRecentNote) => {
    router.push(`/?note=${note._id}`)

    setValue(prev => {
      // filter out note to avoid duplicates
      const updated = prev.filter(r => r._id !== note._id)
      return [
        note,
        ...updated.slice(0, updated.length >= 3 ? -1 : updated.length),
      ]
    })
  }
  return (
    <RecentNotesContext.Provider value={{ recentNotes, setRecentNotes }}>
      {children}
    </RecentNotesContext.Provider>
  )
}

export default RecentNotesProvider
