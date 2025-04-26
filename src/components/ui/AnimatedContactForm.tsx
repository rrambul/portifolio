"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export function AnimatedContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Mark field as touched on blur and validate
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Validate a specific field
  const validateField = (name: string, value: string) => {
    const fieldErrors: ValidationErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          fieldErrors.name = "Name is required";
        } else {
          delete fieldErrors.name;
        }
        break;
      case "email":
        if (!value.trim()) {
          fieldErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          fieldErrors.email = "Please enter a valid email";
        } else {
          delete fieldErrors.email;
        }
        break;
      case "message":
        if (!value.trim()) {
          fieldErrors.message = "Message is required";
        } else if (value.length < 10) {
          fieldErrors.message = "Message is too short";
        } else {
          delete fieldErrors.message;
        }
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const formErrors: ValidationErrors = {};
    let isValid = true;

    // Validate each field
    if (!formState.name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    if (!formState.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      formErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formState.message.trim()) {
      formErrors.message = "Message is required";
      isValid = false;
    } else if (formState.message.length < 10) {
      formErrors.message = "Message is too short";
      isValid = false;
    }

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On success
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTouched({});

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");

      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  // Get classes for an input based on touch and error state
  const getInputClasses = (fieldName: keyof FormState) => {
    let classes = "w-full p-3 rounded-md bg-white/10 backdrop-blur-sm border";

    if (touched[fieldName] && errors[fieldName]) {
      classes += " border-red-500 focus:border-red-500 focus:ring-red-500/30";
    } else if (touched[fieldName] && !errors[fieldName]) {
      classes +=
        " border-green-500 focus:border-green-500 focus:ring-green-500/30";
    } else {
      classes +=
        " border-zinc-300 dark:border-zinc-700 focus:border-purple-500 focus:ring-purple-500/30";
    }

    classes += " transition-all duration-200 outline-none focus:ring-4";
    return classes;
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 200 }}
            >
              <FiCheck className="text-green-600 dark:text-green-400 text-4xl mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Thank you for your message. I&apos;ll get back to you soon!
            </p>
          </motion.div>
        ) : status === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-100 dark:bg-red-900/30 p-6 rounded-lg flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 200 }}
            >
              <FiAlertCircle className="text-red-600 dark:text-red-400 text-4xl mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Oops!</h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Something went wrong. Please try again later.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses("name")}
                  placeholder="John Doe"
                  disabled={status === "submitting"}
                />
                {touched.name && errors.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses("email")}
                  placeholder="john@example.com"
                  disabled={status === "submitting"}
                />
                {touched.email && errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${getInputClasses(
                    "message"
                  )} min-h-[120px] resize-y`}
                  placeholder="Your message here..."
                  disabled={status === "submitting"}
                />
                {touched.message && errors.message && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-all relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {status === "submitting" ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1, opacity: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
