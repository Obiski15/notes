import { useEffect, useState } from "react"

export const useLocalStorage = <T>(key: string, initialValue: unknown) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key)!) ?? initialValue
    }

    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return { value, setValue }
}
