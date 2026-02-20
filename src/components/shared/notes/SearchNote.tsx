"use client"

import { useKeyboardShortcutContext } from "@/hooks/useKeyboardShortcutContext"

import { Input } from "../../ui/input"

function SearchNote() {
  const { searchRef } = useKeyboardShortcutContext()

  return <Input ref={searchRef} placeholder="Search by Tags or Title..." />
}

export default SearchNote
