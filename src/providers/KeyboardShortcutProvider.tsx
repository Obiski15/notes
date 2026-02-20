"use client"

import { createContext, Ref, useEffect, useRef } from "react"

export const KeyboardShortcutProviderContext = createContext({
  createNoteRef: { current: null } as Ref<HTMLButtonElement | null>,
  settingRef: { current: null } as Ref<HTMLButtonElement | null>,
  searchRef: { current: null } as Ref<HTMLInputElement | null>,
})

export const KeyboardShortcutProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const createNoteRef = useRef<HTMLButtonElement | null>(null)
  const settingRef = useRef<HTMLButtonElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleCreateNote = () => {
      createNoteRef.current?.click()
    }
    const handleSetting = () => {
      settingRef.current?.click()
    }

    const handleSearch = () => {
      searchRef.current?.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        switch (event.key.toLocaleLowerCase()) {
          case "n":
            handleCreateNote()
            break
          case "b":
            handleSetting()
            break
          case "k":
            handleSearch()
            break
          default:
            break
        }
      }
    }

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      event.preventDefault()
      handleKeyDown(event)
      event.stopImmediatePropagation()
    })

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <KeyboardShortcutProviderContext.Provider
      value={{ createNoteRef, settingRef, searchRef }}
    >
      {children}
    </KeyboardShortcutProviderContext.Provider>
  )
}

export default KeyboardShortcutProvider
