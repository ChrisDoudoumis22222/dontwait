"use client"

import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { Link as ScrollLink, Element } from "react-scroll"
import { motion } from "framer-motion"
import {
  Menu as MenuIcon,
  X as CloseX,
  ArrowRight,
  Calendar,
  Globe,
  Zap,
  Bell,
  CreditCard,
  Users,
  Briefcase,
  Shield,
  TrendingUp,
  Check,
  Info,
  Headphones,
  ShieldAlert,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  PlayCircle,
  Settings,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

// ---------------------------------------------
// Import your custom components
// ---------------------------------------------
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { FloatingActionButton } from "@/components/floating-action-button"
import { FeatureCard } from "@/components/feature-card"
import { PricingCard } from "@/components/pricing-card"
import { ChatWidget } from "@/components/chat-widget"
import { AnimatedCounter } from "@/components/animated-counter"

// ---------------------------------------------
// Constants / Data
// ---------------------------------------------
const NAV_ITEMS = [
  { label: "Πώς Λειτουργεί", icon: PlayCircle },
  { label: "Χαρακτηριστικά", icon: Settings },
  { label: "Τιμολόγηση", icon: CreditCard },
  { label: "Μαρτυρίες", icon: MessageCircle },
]

const HOW_IT_WORKS_STEPS = [
  {
    title: "Εγγραφή & Προσαρμογή",
    description: "Προσθέστε λογότυπο, πληροφορίες επιχείρησης και υπηρεσίες.",
    icon: Briefcase,
  },
  {
    title: "Μοιραστείτε τη Σελίδα σας",
    description: "Χρησιμοποιήστε τον μοναδικό σας σύνδεσμο ή συνδέστε τον δικό σας τομέα.",
    icon: Globe,
  },
  {
    title: "Λάβετε Κρατήσεις & Διαχειριστείτε",
    description: "Ενημερώσεις σε πραγματικό χρόνο & αναλύσεις στον Πίνακα Ελέγχου.",
    icon: TrendingUp,
  },
]

const FEATURES = [
  {
    title: "Εξατομικευμένη Σελίδα Κρατήσεων",
    description: "Προσαρμόστε την εμφάνιση και τη λειτουργικότητα της σελίδας σας.",
    icon: Calendar,
  },
  {
    title: "Χρήση Δικού σας Τομέα",
    description: "Συνδέστε τον προσωπικό σας τομέα για επαγγελματική παρουσία.",
    icon: Globe,
  },
  {
    title: "Εύκολη Διαχείριση Κρατήσεων",
    description: "Διαχειριστείτε όλες τις κρατήσεις από ένα εύχρηστο ταμπλό.",
    icon: Zap,
  },
  {
    title: "Αυτοματοποιημένες Ειδοποιήσεις",
    description: "Στείλτε αυτόματα επιβεβαιώσεις και υπενθυμίσεις στους πελάτες.",
    icon: Bell,
  },
  {
    title: "Ενσωμάτωση Πληρωμών",
    description: "Δεχτείτε online πληρωμές με ασφάλεια και ευκολία.",
    icon: CreditCard,
  },
  {
    title: "Πρόσβαση Πολλαπλών Χρηστών",
    description: "Δώστε πρόσβαση σε όλη την ομάδα σας με διαφορετικά δικαιώματα.",
    icon: Users,
  },
]

const PRICING_PLANS = [
  {
    name: "Basic",
    price: "€100",
    features: [
      "Προσαρμοσμένη σελίδα κρατήσεων",
      "Πρόσβαση στον πίνακα ελέγχου",
      "Ειδοποιήσεις μέσω email",
    ],
    icon: Shield,
  },
  {
    name: "Pro",
    price: "€150",
    features: [
      "Όλα του Basic",
      "Υπενθυμίσεις SMS",
      "Online πληρωμές",
      "Ιδανικό για τις περισσότερες επιχειρήσεις",
    ],
    highlighted: true,
    icon: Zap,
  },
  {
    name: "Enterprise",
    price: "Επικοινωνήστε μαζί μας",
    features: [
      "Όλα του Pro",
      "Προσαρμοσμένος τομέας",
      "Προηγμένες αναφορές",
      "Προτεραιότητα υποστήριξης",
    ],
    icon: TrendingUp,
  },
]

const TESTIMONIALS = [
  {
    quote:
      "Το DontWait.gr άλλαξε τον τρόπο που διαχειριζόμαστε τις κρατήσεις. Όχι άλλα τηλεφωνήματα, μόνο εύκολες online κρατήσεις!",
    author: "Άννα Παπαδοπούλου",
    role: "Ιδιοκτήτρια Σαλονιού",
  },
  {
    quote:
      "Ο πίνακας ελέγχου μας βοηθά να παρακολουθούμε τα πάντα σε ένα μέρος. Το συνιστώ ανεπιφύλακτα!",
    author: "Γιάννης Αντωνίου",
    role: "Διευθυντής Γυμναστηρίου",
  },
]

// ---------------------------------------------
// Reusable SVG Wave Component
// ---------------------------------------------
function Wave({
  position = "bottom",
  className = "text-blue-100",
  ...props
}: React.SVGProps<SVGSVGElement> & { position?: "top" | "bottom" }) {
  const pathTop = "M0,0 C300,80 900,40 1200,80 L1200,0 L0,0 Z"
  const pathBottom = "M0,80 C300,40 900,80 1200,0 L1200,120 L0,120 Z"
  const d = position === "top" ? pathTop : pathBottom

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${position}-0 -z-10 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-24 md:h-32"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        {...props}
      >
        <path d={d} fill="currentColor" />
      </svg>
    </div>
  )
}

// ---------------------------------------------
// HEADER
// ---------------------------------------------
function Header() {
  return (
    <Popover className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white border-b border-blue-100 shadow-md backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand / Logo (Image) */}
        <div className="flex-shrink-0">
          <Image
            src="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
            alt="DontWait Logo"
            width={180}
            height={50}
            priority
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <ScrollLink
              key={label}
              to={label}
              smooth={true}
              duration={500}
              className="relative inline-flex items-center text-gray-700 hover:text-blue-700 transition-colors duration-200
                         after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-600
                         after:transition-[width] after:ease-in-out after:duration-200 hover:after:w-full"
            >
              {Icon && <Icon className="mr-2 h-5 w-5" />}
              {label}
            </ScrollLink>
          ))}
        </div>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:block">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
            Δοκιμάστε Δωρεάν
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md">
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Open main menu</span>
          </Popover.Button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel className="md:hidden bg-white/90 backdrop-blur-md shadow-lg border-t border-gray-200">
          <div className="px-4 pt-4 pb-4 space-y-4">
            {NAV_ITEMS.map(({ label, icon: Icon }) => (
              <ScrollLink
                key={label}
                to={label}
                smooth={true}
                duration={500}
                className="block w-full text-gray-700 hover:text-blue-600 text-lg font-medium transition-colors flex items-center"
                onClick={() => {
                  document.activeElement?.blur()
                }}
              >
                {Icon && <Icon className="mr-2 h-5 w-5" />}
                {label}
              </ScrollLink>
            ))}

            <div className="pt-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                Δοκιμάστε Δωρεάν
              </Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

// ---------------------------------------------
// FOOTER
// ---------------------------------------------
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16">
      <div className="container mx-auto px-4 space-y-8">
        {/* Top Row: Brand & Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Brand / Intro */}
          <div className="md:w-1/4">
            <h3 className="text-2xl font-bold mb-3 text-white">DontWait.gr</h3>
            <p className="text-gray-400">Η λύση για τις online κρατήσεις σας</p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/4">
            <h4 className="text-lg font-semibold mb-3">Γρήγοροι Σύνδεσμοι</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <Info className="mr-2 h-5 w-5 text-gray-400" />
                  Σχετικά
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
                  Τιμολόγηση
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <Headphones className="mr-2 h-5 w-5 text-gray-400" />
                  Υποστήριξη
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <ShieldAlert className="mr-2 h-5 w-5 text-gray-400" />
                  Όροι &amp; Απόρρητο
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:w-1/4">
            <h4 className="text-lg font-semibold mb-3">Επικοινωνία</h4>
            <p className="flex items-center mb-2">
              <Mail className="mr-2 h-5 w-5 text-gray-400" />
              <span className="text-gray-400">info@dontwait.gr</span>
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-gray-400" />
              <span className="text-gray-400">+30 XXX XXX XXXX</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="md:w-1/4">
            <h4 className="text-lg font-semibold mb-3">Ακολουθήστε μας</h4>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} DontWait.gr. Όλα τα δικαιώματα διατηρούνται.
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------
// MAIN HOME COMPONENT (Default Export)
// ---------------------------------------------
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      {/* Progress Bar */}
      <ProgressBar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <Element name="Hero">
          <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <Wave position="bottom" />

            <div className="mx-auto max-w-7xl px-6 py-32 md:py-40 lg:py-48">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Left Content */}
                <motion.div
                  className="lg:w-1/2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                    Η Επιχείρησή σας,
                    <br />
                    οι Κρατήσεις σας
                    <br />
                    <span className="text-blue-600">Χωρίς Άγχος!</span>
                  </h2>
                  <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                    Αποκτήστε τη δική σας επώνυμη σελίδα κρατήσεων, διαχειριστείτε τις κρατήσεις
                    και αναπτύξτε την επιχείρησή σας χωρίς κόπο.
                  </p>
                  <ScrollLink to="Τιμολόγηση" smooth={true} duration={500}>
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center"
                    >
                      Ξεκινήστε Δωρεάν <ArrowRight className="ml-2" />
                    </Button>
                  </ScrollLink>
                </motion.div>

                {/* Right: Lottie Animation */}
                <motion.div
                  className="lg:w-1/2 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <DotLottieReact
                    src="https://lottie.host/664f770a-832d-4a15-8c19-2e0084cda6ee/M1BRRXwuio.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", maxWidth: "700px" }}
                  />
                </motion.div>
              </div>
            </div>
          </section>
        </Element>

        {/* How It Works Section */}
        <Element name="Πώς Λειτουργεί">
          <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-32">
            <Wave position="top" />
            <Wave position="bottom" />

            <div className="container mx-auto px-4 relative z-10">
              <motion.h2
                className="text-4xl font-bold text-center mb-16 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Πώς Λειτουργεί
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {HOW_IT_WORKS_STEPS.map((step, index) => (
                  <FeatureCard key={index} {...step} index={index} />
                ))}
              </div>
            </div>
          </section>
        </Element>

        {/* Features Section */}
        <Element name="Χαρακτηριστικά">
          <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-32">
            <Wave position="top" />
            <Wave position="bottom" />

            <div className="container mx-auto px-4 relative z-10">
              <motion.h2
                className="text-4xl font-bold text-center mb-16 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Χαρακτηριστικά
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {FEATURES.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </div>
            </div>
          </section>
        </Element>

        {/* Comparison Section */}
        <section className="bg-gray-50 py-32">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-16 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Γιατί να Επιλέξετε το DontWait.gr
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* With DontWait.gr */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  Με το DontWait.gr
                </h3>
                <ul className="space-y-4">
                  {[
                    "Εξοικονόμηση χρόνου με αυτοματοποιημένες κρατήσεις",
                    "Επαγγελματική παρουσία με προσαρμοσμένη σελίδα",
                    "Αύξηση εσόδων με 24/7 διαθεσιμότητα κρατήσεων",
                    "Βελτίωση εμπειρίας πελατών με εύκολη διαδικασία",
                    "Αναλυτικά στατιστικά για λήψη καλύτερων αποφάσεων",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Without DontWait.gr */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-600">
                  Χωρίς το DontWait.gr
                </h3>
                <ul className="space-y-4">
                  {[
                    "Σπατάλη χρόνου με χειροκίνητη διαχείριση κρατήσεων",
                    "Μη επαγγελματική εικόνα χωρίς online παρουσία",
                    "Χαμένες ευκαιρίες λόγω περιορισμένων ωρών λειτουργίας",
                    "Δυσαρεστημένοι πελάτες λόγω πολύπλοκης διαδικασίας",
                    "Έλλειψη δεδομένων για τη λήψη επιχειρηματικών αποφάσεων",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CloseX className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <Element name="Τιμολόγηση">
          <section className="bg-white py-32">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-4xl font-bold text-center mb-16 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Πακέτα Τιμών
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRICING_PLANS.map((plan, index) => (
                  <PricingCard key={index} {...plan} />
                ))}
              </div>
            </div>
          </section>
        </Element>

        {/* Testimonials Section */}
        <Element name="Μαρτυρίες">
          <section className="relative isolate bg-gradient-to-br from-white via-blue-50 to-blue-100 py-32">
            <Wave position="top" />
            <Wave position="bottom" />

            <div className="mx-auto max-w-6xl px-6 relative z-10">
              <motion.h2
                className="text-4xl font-bold text-center text-gray-900 mb-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Τι Λένε οι Πελάτες μας
              </motion.h2>
              <motion.p
                className="text-lg text-center text-gray-600 mb-12"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Πώς το <strong className="text-blue-600">DontWait.gr</strong>{" "}
                βελτίωσε την εμπειρία κρατήσεων για επιχειρήσεις και πελάτες.
              </motion.p>

              <div className="space-y-8">
                {TESTIMONIALS.map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg p-6 md:p-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-1">
                      <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                        “{testimonial.quote}”
                      </blockquote>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.author}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </Element>

        {/* Final CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Απογειώστε την Επιχείρησή σας με Έξυπνες Κρατήσεις!
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Εξοικονομήστε χρόνο, αυξήστε τα έσοδά σας και προσφέρετε άψογη εμπειρία στους
                πελάτες σας.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg px-8 py-4 text-lg"
                >
                  Δωρεάν Δοκιμή 14 Ημερών
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-blue-600 hover:bg-white hover:bg-opacity-10 px-8 py-4 text-lg"
                >
                  Ζητήστε μια Επίδειξη
                </Button>
              </div>
              <p className="mt-6 text-sm text-blue-200">
                Χωρίς πιστωτική κάρτα • Εύκολη εγκατάσταση • Ακύρωση οποιαδήποτε στιγμή
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Button & Chat */}
      <FloatingActionButton />
      <ChatWidget />
    </div>
  )
}
