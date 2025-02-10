"use client"

import { ArrowUp } from "lucide-react"

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="rounded-full bg-blue-600 text-white p-4 shadow-lg flex items-center justify-center"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}
