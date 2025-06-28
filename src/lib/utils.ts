import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-Us", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date)
}

export const toastTrash = () =>
  toast.info("This note is in the Trash and can't be edited", {
    description: "To make changes, please restore it first",
  })
