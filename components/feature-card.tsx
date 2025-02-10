import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  index: number
  icon: LucideIcon
}

export function FeatureCard({ title, description, index, icon: Icon }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

