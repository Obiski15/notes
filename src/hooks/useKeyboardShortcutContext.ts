import { useContext } from "react"

import { KeyboardShortcutProviderContext } from "@/providers/KeyboardShortcutProvider"

export const useKeyboardShortcutContext = () => {
  const context = useContext(KeyboardShortcutProviderContext)

  if (!context) {
    throw new Error(
      "useKeyboardShortcutContext must be used within a KeyboardShortcutProvider"
    )
  }

  return context
}
