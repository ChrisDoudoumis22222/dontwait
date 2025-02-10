"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSendEmailButton, setShowSendEmailButton] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)

  // Email form fields
  const [userEmail, setUserEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")

  // 20-second "search for expert" logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isOpen) {
      // After 20s (20000 ms), show "Send Email" option
      timer = setTimeout(() => {
        setShowSendEmailButton(true)
      }, 20000)
    } else {
      // Reset state if widget is closed
      setShowSendEmailButton(false)
      setShowEmailForm(false)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isOpen])

  // Handler: open the email form
  const handleSendEmailClick = () => {
    setShowSendEmailButton(false)
    setShowEmailForm(true)
  }

  // Handler: form submission -> mailto link
  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:chrisdoom500@gmail.com
      ?subject=${encodeURIComponent(subject)}
      &body=${encodeURIComponent(`From: ${userEmail}\n\n${description}`)}`

    // Opens user’s default email client
    window.location.href = mailtoLink
    setIsOpen(false) // Optionally close widget
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            /* 
              Tailwind classes:
              - `bottom-[5rem]` on small screens to clear chat button
              - `right-2` for minimal margin on mobile
              - `sm:bottom-20 sm:right-20` on bigger screens
              - `w-[calc(100%-1rem)]` ensures it fits on small screens
                (100% - some margin)
              - `sm:w-72` on larger screens
            */
            className="
              fixed bottom-[5rem] right-2 
              sm:bottom-20 sm:right-20 
              w-[calc(100%-1rem)] sm:w-72
              bg-white rounded-lg shadow-lg overflow-hidden z-50
            "
          >
            {/* Header Bar */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Αναζήτηση Ειδικού</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Main Chat Body */}
            <div className="p-4 space-y-4">
              {/* 1) Spinner while searching */}
              {!showSendEmailButton && !showEmailForm && (
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Loader2 className="animate-spin" />
                  <span>Αναζητούμε διαθέσιμο ειδικό...</span>
                </div>
              )}

              {/* 2) Button to send email after 20s */}
              {showSendEmailButton && !showEmailForm && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    Δεν βρέθηκε διαθέσιμος ειδικός. Θέλετε να στείλετε email;
                  </p>
                  <Button className="w-full" onClick={handleSendEmailClick}>
                    Αποστολή Email
                  </Button>
                </div>
              )}

              {/* 3) Email form */}
              {showEmailForm && (
                <form onSubmit={handleSubmitEmail} className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Το Email σας
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Θέμα
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Περιγραφή
                    </label>
                    <textarea
                      required
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Αποστολή Email
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        Floating chat button:
        - On mobile: bottom-4, right-2
        - On larger screens: bottom-4, right-20
      */}
      <Button
        className="
          fixed bottom-4 right-2
          sm:right-20
          rounded-full w-12 h-12 shadow-lg z-50 bg-black text-white
        "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>
    </>
  )
}
