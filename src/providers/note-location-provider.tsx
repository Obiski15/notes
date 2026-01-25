"use client"

import { NOTESTATUS } from "@/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type IFolder = { name: string; _id: string }

export const NoteLocationContent = createContext<{
  folder: IFolder
  status: NOTESTATUS 
  setStatus: Dispatch<SetStateAction<NOTESTATUS>>
  setFolder: Dispatch<SetStateAction<IFolder>>
}>({
  folder: {
    name: "",
    _id: "",
  },
  status: NOTESTATUS.ACTIVE,
  setFolder: () => {},
  setStatus: () => {},
})

function NoteLocationProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<NOTESTATUS>(NOTESTATUS.ACTIVE)
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
