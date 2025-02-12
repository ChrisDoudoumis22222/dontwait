"use client";

import React, { Fragment, useState, useEffect } from "react";
import {
  Popover,
  Transition,
  Dialog,
} from "@headlessui/react";
import { Link as ScrollLink, Element } from "react-scroll";
import { motion } from "framer-motion";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { createClient } from "@supabase/supabase-js";

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
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  PlayCircle,
  Settings,
  MessageCircle,
} from "lucide-react";

// ------------------------------
// Create Supabase Client
// ------------------------------
const supabaseUrl = "https://rdwwczdghdkqhhpmfneo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkd3djemRnaGRrcWhocG1mbmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNzIyODIsImV4cCI6MjA1NDg0ODI4Mn0.biWNt1s3eMyXEqfEywsDdPZamCyFLUUREYnaTAgJ6hk";
const supabase = createClient(supabaseUrl, supabaseKey);

// ------------------------------
// Custom Components Imports
// ------------------------------
import { PlanSelectionForm } from "@/components/ui/plan-selection-form";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";
import { FeatureCard } from "@/components/feature-card";
// Use default import for PricingCard:
import PricingCard from "@/components/pricing-card";
import { FloatingActionButton } from "@/components/floating-action-button";
import { ChatWidget } from "@/components/chat-widget";

// ---------------------------------------------
// Define a local interface for pricing plans
// (Ensure that your PricingCard component's props match these properties)
interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  icon: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement> & { [key: string]: any }
  >;
  highlighted?: boolean;
}

// ---------------------------------------------
// Constants / Data Arrays
// ---------------------------------------------
const NAV_ITEMS = [
  { label: "Πώς Λειτουργεί", icon: PlayCircle },
  { label: "Χαρακτηριστικά", icon: Settings },
  { label: "Τιμολόγηση", icon: CreditCard },
  { label: "Μαρτυρίες", icon: MessageCircle },
];

const HOW_IT_WORKS_STEPS = [
  {
    title: "Εγγραφή & Προσαρμογή",
    description:
      "Προσθέστε λογότυπο, πληροφορίες επιχείρησης και υπηρεσίες.",
    icon: Briefcase,
  },
  {
    title: "Μοιραστείτε τη Σελίδα σας",
    description:
      "Χρησιμοποιήστε τον μοναδικό σας σύνδεσμο ή συνδέστε τον δικό σας τομέα.",
    icon: Globe,
  },
  {
    title: "Λάβετε Κρατήσεις & Διαχειριστείτε",
    description:
      "Ενημερώσεις σε πραγματικό χρόνο & αναλύσεις στον Πίνακα Ελέγχου.",
    icon: TrendingUp,
  },
];

const FEATURES = [
  {
    title: "Εξατομικευμένη Σελίδα Κρατήσεων",
    description:
      "Προσαρμόστε την εμφάνιση και τη λειτουργικότητα της σελίδας σας.",
    icon: Calendar,
  },
  {
    title: "Χρήση Δικού σας Τομέα",
    description:
      "Συνδέστε τον προσωπικό σας τομέα για επαγγελματική παρουσία.",
    icon: Globe,
  },
  {
    title: "Εύκολη Διαχείριση Κρατήσεων",
    description: "Διαχειριστείτε όλες τις κρατήσεις από ένα εύχρηστο ταμπλό.",
    icon: Zap,
  },
  {
    title: "Αυτοματοποιημένες Ειδοποιήσεις",
    description:
      "Στείλτε αυτόματα επιβεβαιώσεις και υπενθυμίσεις στους πελάτες.",
    icon: Bell,
  },
  {
    title: "Ενσωμάτωση Πληρωμών",
    description:
      "Δεχτείτε online πληρωμές με ασφάλεια και ευκολία.",
    icon: CreditCard,
  },
  {
    title: "Πρόσβαση Πολλαπλών Χρηστών",
    description:
      "Δώστε πρόσβαση σε όλη την ομάδα σας με διαφορετικά δικαιώματα.",
    icon: Users,
  },
];

const PRICING_PLANS: PricingPlan[] = [
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
];

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
];

// ---------------------------------------------
// Reusable SVG Wave Component
// ---------------------------------------------
function Wave({
  position = "bottom",
  className = "text-blue-100",
  ...props
}: React.SVGProps<SVGSVGElement> & { position?: "top" | "bottom" }) {
  const pathTop = "M0,0 C300,80 900,40 1200,80 L1200,0 L0,0 Z";
  const pathBottom = "M0,80 C300,40 900,80 1200,0 L1200,120 L0,120 Z";
  const d = position === "top" ? pathTop : pathBottom;

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
  );
}

// ---------------------------------------------
// Trial Modal Component
// ---------------------------------------------
interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TrialModal({ isOpen, onClose }: TrialModalProps) {
  // Workaround: assign the overlay from Dialog as any
  const DialogOverlay = (Dialog as any).Overlay;

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    companyType: "",
    package: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Insert the trial data into the "trial_requests" table in Supabase
    try {
      const { data, error } = await supabase.from("trial_requests").insert([
        {
          email: formData.email,
          name: formData.name,
          company_type: formData.companyType,
          package: formData.package,
        },
      ]);
      if (error) {
        console.error("Error inserting trial request:", error);
      } else {
        console.log("Trial request submitted successfully:", data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Use our locally defined DialogOverlay */}
            <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* Centering trick */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Δοκιμάστε Δωρεάν
              </Dialog.Title>
              <div className="mt-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Όνομα
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Τύπος Επιχείρησης
                    </label>
                    <select
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                      <option value="">Επιλέξτε...</option>
                      <option value="salon">Σαλόνι</option>
                      <option value="nails">Νύχια</option>
                      <option value="restaurant">Εστιατόριο</option>
                      <option value="cleaning">Εταιρεία Καθαρισμού</option>
                      <option value="other">Άλλο</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ενδιαφέρον Πακέτο
                    </label>
                    <select
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                      <option value="">Επιλέξτε...</option>
                      <option value="basic">Basic</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Ακύρωση
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Υποβολή
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

// ---------------------------------------------
// HEADER Component
// ---------------------------------------------
interface HeaderProps {
  onTrialOpen: () => void;
}

function Header({ onTrialOpen }: HeaderProps) {
  return (
    <Popover className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white border-b border-blue-100 shadow-md backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand / Logo */}
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
          <Button
            onClick={onTrialOpen}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          >
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
                  // Cast activeElement to HTMLElement so that TypeScript recognizes the blur() method.
                  (document.activeElement as HTMLElement)?.blur();
                }}
              >
                {Icon && <Icon className="mr-2 h-5 w-5" />}
                {label}
              </ScrollLink>
            ))}

            <div className="pt-4">
              <Button
                onClick={onTrialOpen}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                Δοκιμάστε Δωρεάν
              </Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

// ---------------------------------------------
// FOOTER Component
// ---------------------------------------------
function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-blue-800 to-gray-900 text-white py-12">
      {/* Decorative SVG Wave */}
      <div className="absolute inset-x-0 top-0 -mt-1 overflow-hidden leading-none">
        <svg
          className="w-full h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,80 900,40 1200,80 L1200,0 L0,0 Z"
            fill="currentColor"
            className="text-blue-800"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
            alt="DontWait Logo"
            width={120}
            height={40}
            className="mx-auto"
          />
        </div>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center space-x-6">
          <a
            href="#"
            className="hover:text-blue-400 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="hover:text-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="hover:text-blue-300 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
          <a
            href="mailto:info@dontwait.gr"
            className="flex items-center text-white hover:text-blue-400 transition-colors"
          >
            <Mail className="h-5 w-5 mr-2" />
            <span>info@dontwait.gr</span>
          </a>
          <a
            href="tel:+302123456789"
            className="flex items-center text-white hover:text-blue-400 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            <span>+30 21 2345 6789</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-sm">
          &copy; {new Date().getFullYear()} DontWait. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ---------------------------------------------
// MAIN HOME COMPONENT (Default Export)
// ---------------------------------------------
export default function Home() {
  // State for trial modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for plan selection modal
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
    setIsPlanModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      {/* Progress Bar */}
      <ProgressBar />

      {/* Header */}
      <Header onTrialOpen={() => setIsModalOpen(true)} />

      {/* Trial Modal */}
      <TrialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Plan Selection Form Modal */}
      <PlanSelectionForm
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        selectedPlan={selectedPlan}
      />

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
                    Αυξήστε τις Κρατήσεις σας{" "}
                    <span className="text-blue-600">Χωρίς Κόπο!</span>
                  </h2>
                  <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                    Δημιουργήστε μια{" "}
                    <strong>επαγγελματική σελίδα κρατήσεων</strong>, αυτοματοποιήστε
                    ραντεβού και ενισχύστε την επιχείρησή σας.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center"
                  >
                    Δοκιμάστε Δωρεάν <ArrowRight className="ml-2" />
                  </Button>
                </motion.div>

                {/* Right: Lottie Animation */}
                <motion.div
                  className="lg:w-1/2 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <DotLottieReact
                    src="https://lottie.host/af179676-9294-4e76-b13e-28c94af1a066/dYGIND4bkN.lottie"
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
        <Element name="Γιατί να Επιλέξετε">
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
                Γιατί να Επιλέξετε το{" "}
                <Image
                  src="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
                  alt="DontWait Logo"
                  width={150}
                  height={40}
                  className="inline-block align-middle"
                />
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
        </Element>

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
                  <div key={index} className="relative bg-white p-8 rounded-lg shadow-lg">
                    {plan.highlighted && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-bl-lg rounded-tr-lg">
                        Πιο Δημοφιλές
                      </div>
                    )}
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full mr-4 bg-gray-100">
                        <plan.icon
                          className={`w-8 h-8 ${plan.highlighted ? "text-blue-600" : "text-gray-600"}`}
                        />
                      </div>
                      <h3 className={`text-2xl font-bold ${plan.highlighted ? "text-blue-600" : "text-gray-900"}`}>
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-3xl font-bold mb-6">{plan.price}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check text-green-500 mr-2"
                          >
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handlePlanSelection(plan.name)}
                      className={
                        plan.highlighted
                          ? "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full h-10 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                          : "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full h-10 bg-gray-800 hover:bg-gray-900 text-white"
                      }
                    >
                      Επιλογή Πακέτου
                    </Button>
                  </div>
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
                Εξοικονομήστε χρόνο, αυξήστε τα έσοδά σας και προσφέρετε άψογη
                εμπειρία στους πελάτες σας.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg px-8 py-4 text-lg"
                >
                  Δωρεάν Δοκιμή 7 Ημερών
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

      {/* Floating Action Button & Chat Widget */}
      <FloatingActionButton />
      <ChatWidget />
    </div>
  );
}
