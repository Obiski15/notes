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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey) return

      const key = event.key.toLowerCase()

      if (["n", "b", "k"].includes(key)) {
        event.preventDefault()

        switch (key) {
          case "n":
            createNoteRef.current?.click()
            break
          case "b":
            settingRef.current?.click()
            break
          case "k":
            searchRef.current?.focus()
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

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
