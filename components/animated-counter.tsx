"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface AnimatedCounterProps {
  end: number
  duration: number
  label: string
}

export function AnimatedCounter({ end, duration, label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      let start = 0
      const increment = end / (duration / 16) // 60 FPS
      const easeOutQuad = (t: number) => t * (2 - t)
      const timer = setInterval(() => {
        start += increment
        const progress = start / end
        setCount(Math.floor(easeOutQuad(progress) * end))
        if (start >= end) {
          clearInterval(timer)
          setCount(end)
        }
      }, 16)

      controls.start({ opacity: 1, y: 0 })

      return () => clearInterval(timer)
    }
  }, [inView, end, duration, controls])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={controls} className="text-center">
      <div className="text-4xl font-bold text-white mb-2">{count}+</div>
      <div className="text-white">{label}</div>
    </motion.div>
  )
}

