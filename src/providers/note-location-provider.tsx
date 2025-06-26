"use client"

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import { INoteStatus } from "@/services/serviceTypes"

type IFolder = { name: string; _id: string }

export const NoteLocationContent = createContext<{
  folder: IFolder
  note: string
  status: INoteStatus
  setStatus: Dispatch<SetStateAction<INoteStatus>>
  setFolder: Dispatch<SetStateAction<IFolder>>
  setNote: Dispatch<SetStateAction<string>>
}>({
  folder: {
    name: "",
    _id: "",
  },
  note: "",
  status: "active",
  setNote: () => {},
  setFolder: () => {},
  setStatus: () => {},
})

function NoteLocationProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<INoteStatus>("active")
  const [folder, setFolder] = useState<IFolder>({ name: "", _id: "" })
  const [note, setNote] = useState<string>("")

  return (
    <NoteLocationContent.Provider
      value={{ folder, note, status, setStatus, setFolder, setNote }}
    >
      {children}
    </NoteLocationContent.Provider>
  )
}

export default NoteLocationProvider
