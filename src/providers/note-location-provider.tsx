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
  status: INoteStatus
  setStatus: Dispatch<SetStateAction<INoteStatus>>
  setFolder: Dispatch<SetStateAction<IFolder>>
}>({
  folder: {
    name: "",
    _id: "",
  },
  status: "active",
  setFolder: () => {},
  setStatus: () => {},
})

function NoteLocationProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<INoteStatus>("active")
  const [folder, setFolder] = useState<IFolder>({ name: "", _id: "" })

  return (
    <NoteLocationContent.Provider
      value={{ folder, status, setStatus, setFolder }}
    >
      {children}
    </NoteLocationContent.Provider>
  )
}

export default NoteLocationProvider
