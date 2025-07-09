"use client"

import ErrorState from "@/components/shared/Error"

function error() {
  return (
    <div className="h-screen">
      <ErrorState />
    </div>
  )
}

export default error
