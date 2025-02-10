import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <p className="text-lg italic mb-4">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-semibold text-blue-600">{author}</p>
        <p className="text-gray-600">{role}</p>
      </div>
    </motion.div>
  )
}

