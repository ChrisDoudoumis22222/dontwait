"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client instance using environment variables.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PlanSelectionFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
}

export function PlanSelectionForm({ isOpen, onClose, selectedPlan }: PlanSelectionFormProps) {
  // Define the step (1 through 5) and error state.
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);

  // Set up the form data.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyType: "",
    plan: selectedPlan,
    subject: "",
    emailDescription: "",
    comments: "",
  });

  // Reset the form whenever the dialog is opened.
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrors([]);
      setFormData({
        name: "",
        email: "",
        companyType: "",
        plan: selectedPlan,
        subject: "",
        emailDescription: "",
        comments: "",
      });
    }
  }, [isOpen, selectedPlan]);

  // Update the plan if the selectedPlan prop changes.
  useEffect(() => {
    setFormData((prev) => ({ ...prev, plan: selectedPlan }));
  }, [selectedPlan]);

  // Handler for text-based inputs.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for Select components.
  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validate the current step.
  const validateStep = () => {
    let newErrors: string[] = [];
    if (step === 1) {
      if (!formData.name.trim()) newErrors.push("Το όνομα είναι υποχρεωτικό.");
      if (!formData.email.trim()) newErrors.push("Το email είναι υποχρεωτικό.");
      if (!formData.companyType) newErrors.push("Ο τύπος επιχείρησης είναι υποχρεωτικός.");
    }
    if (step === 2) {
      if (!formData.plan) newErrors.push("Επιλέξτε ένα πακέτο.");
    }
    if (step === 3) {
      if (!formData.subject.trim()) newErrors.push("Το θέμα είναι υποχρεωτικό.");
      if (!formData.emailDescription.trim()) newErrors.push("Η περιγραφή είναι υποχρεωτική.");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Advance to the next step if validation passes.
  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
      setErrors([]);
    }
  };

  // Go back one step.
  const prevStep = () => {
    setStep((prev) => prev - 1);
    setErrors([]);
  };

  // Handle form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from("emails").insert([
      {
        name: formData.name,
        email: formData.email,
        company_type: formData.companyType,
        plan: formData.plan,
        subject: formData.subject,
        email_description: formData.emailDescription,
        comments: formData.comments,
      },
    ]);
    if (error) {
      console.error("Error inserting email:", error);
      setErrors([error.message]);
    } else {
      console.log("Email inserted successfully");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[800px] bg-gradient-to-br from-blue-50 via-white to-blue-100 p-0 overflow-y-auto max-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="p-6 pb-0">
            {/* Header image with link */}
            <a href="https://ibb.co/XRdqsJT" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://i.ibb.co/1Wpkq2x/Adobe-Express-file.png"
                alt="Adobe-Express-file"
                width={120}
                height={40}
                className="mb-4"
              />
            </a>
            <DialogTitle className="text-lg lg:text-xl font-bold text-gray-900">
              {step === 1 && "Βασικές Πληροφορίες"}
              {step === 2 && "Επιλογή Πακέτου"}
              {step === 3 && "Συμπληρωματικές Πληροφορίες"}
              {step === 4 && "Σύνοψη"}
              {step === 5 && "Ανασκόπιση & Υποβολή"}
            </DialogTitle>
            <DialogDescription className="text-sm lg:text-base text-gray-600">
              {step === 1 && "Συμπληρώστε τα στοιχεία σας για να συνεχίσετε."}
              {step === 2 && "Επιλέξτε το πακέτο που σας ενδιαφέρει."}
              {step === 3 && "Συμπληρώστε το θέμα και την περιγραφή email."}
              {step === 4 && "Παρακάτω εμφανίζεται μια σύνοψη των στοιχείων που εισάγατε."}
              {step === 5 && "Ελέγξτε προσεκτικά τα στοιχεία σας πριν την υποβολή."}
            </DialogDescription>
          </DialogHeader>

          {errors.length > 0 && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md mx-6 mb-4">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="min-h-[150px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <Label htmlFor="name">Όνομα</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />

                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

                    <Label htmlFor="companyType">Τύπος Επιχείρησης</Label>
                    <Select
                      name="companyType"
                      value={formData.companyType}
                      onValueChange={(value) => handleSelectChange("companyType", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Επιλέξτε τύπο επιχείρησης" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gym">Γυμναστήριο</SelectItem>
                        <SelectItem value="Trainer">Προσωπικός Γυμναστής</SelectItem>
                        <SelectItem value="Consultant">Σύμβουλος</SelectItem>
                        <SelectItem value="Other">Άλλο</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <Label htmlFor="plan">Πακέτο</Label>
                    <Select
                      name="plan"
                      value={formData.plan}
                      onValueChange={(value) => handleSelectChange("plan", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Επιλέξτε πακέτο" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Pro">Pro</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <Label htmlFor="subject">Θέμα</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />

                    <Label htmlFor="emailDescription">Περιγραφή</Label>
                    <Textarea
                      id="emailDescription"
                      name="emailDescription"
                      value={formData.emailDescription}
                      onChange={handleChange}
                      rows={3}
                      required
                    />
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <div className="space-y-2">
                      <div>
                        <Label>Όνομα</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.name || "-"}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.email || "-"}</p>
                      </div>
                      <div>
                        <Label>Τύπος Επιχείρησης</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.companyType || "-"}</p>
                      </div>
                      <div>
                        <Label>Πακέτο</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.plan || "-"}</p>
                      </div>
                      <div>
                        <Label>Θέμα</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.subject || "-"}</p>
                      </div>
                      <div>
                        <Label>Περιγραφή</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.emailDescription || "-"}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <div className="space-y-2">
                      <div>
                        <Label>Όνομα</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.name || "-"}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.email || "-"}</p>
                      </div>
                      <div>
                        <Label>Τύπος Επιχείρησης</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.companyType || "-"}</p>
                      </div>
                      <div>
                        <Label>Πακέτο</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.plan || "-"}</p>
                      </div>
                      <div>
                        <Label>Θέμα</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.subject || "-"}</p>
                      </div>
                      <div>
                        <Label>Περιγραφή</Label>
                        <p className="px-2 py-1 bg-gray-100 rounded">{formData.emailDescription || "-"}</p>
                      </div>
                      {formData.comments && (
                        <div>
                          <Label>Σχόλια</Label>
                          <p className="px-2 py-1 bg-gray-100 rounded">{formData.comments}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <DialogFooter className="flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Πίσω
                </Button>
              )}
              {step < 5 ? (
                <Button type="button" onClick={nextStep} className="bg-blue-600 text-white">
                  Επόμενο
                </Button>
              ) : (
                <Button type="submit" className="bg-blue-600 text-white">
                  υποβολη
                </Button>
              )}
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
