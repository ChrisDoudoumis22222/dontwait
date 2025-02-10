import { motion } from "framer-motion"
import { Check, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingCardProps {
  name: string
  price: string
  features: string[]
  highlighted?: boolean
  icon: LucideIcon
}

export function PricingCard({ name, price, features, highlighted = false, icon: Icon }: PricingCardProps) {
  return (
    <motion.div
      className={`relative bg-white p-8 rounded-lg shadow-lg ${highlighted ? "ring-2 ring-blue-500" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {highlighted && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-bl-lg rounded-tr-lg">
          Πιο Δημοφιλές
        </div>
      )}
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-full mr-4 ${highlighted ? "bg-blue-100" : "bg-gray-100"}`}>
          <Icon className={`w-8 h-8 ${highlighted ? "text-blue-600" : "text-gray-600"}`} />
        </div>
        <h3 className={`text-2xl font-bold ${highlighted ? "text-blue-600" : "text-gray-900"}`}>{name}</h3>
      </div>
      <p className="text-3xl font-bold mb-6">{price}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="text-green-500 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${
          highlighted
            ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
            : "bg-gray-800 hover:bg-gray-900"
        } text-white`}
      >
        Επιλογή Πακέτου
      </Button>
    </motion.div>
  )
}

