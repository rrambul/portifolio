"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("contact.form");

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  // Honeypot: hidden from users, bots tend to fill it. Submitted as `company`.
  const [honeypot, setHoneypot] = useState("");

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

  const validateField = (name: string, value: string) => {
    const fieldErrors: ValidationErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          fieldErrors.name = t("error.nameRequired");
        } else {
          delete fieldErrors.name;
        }
        break;
      case "email":
        if (!value.trim()) {
          fieldErrors.email = t("error.emailRequired");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          fieldErrors.email = t("error.emailInvalid");
        } else {
          delete fieldErrors.email;
        }
        break;
      case "message":
        if (!value.trim()) {
          fieldErrors.message = t("error.messageRequired");
        } else if (value.length < 10) {
          fieldErrors.message = t("error.messageShort");
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

  const validateForm = (): boolean => {
    const formErrors: ValidationErrors = {};
    let isValid = true;

    if (!formState.name.trim()) {
      formErrors.name = t("error.nameRequired");
      isValid = false;
    }

    if (!formState.email.trim()) {
      formErrors.email = t("error.emailRequired");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      formErrors.email = t("error.emailInvalid");
      isValid = false;
    }

    if (!formState.message.trim()) {
      formErrors.message = t("error.messageRequired");
      isValid = false;
    } else if (formState.message.length < 10) {
      formErrors.message = t("error.messageShort");
      isValid = false;
    }

    setTouched({ name: true, email: true, message: true });
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
      // Send data to API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          company: honeypot,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

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
    let classes = "w-full p-3 rounded-md bg-transparent border text-zinc-900 dark:text-zinc-100";

    if (touched[fieldName] && errors[fieldName]) {
      classes += " border-red-500 focus:border-red-500 focus:ring-red-500/30";
    } else if (touched[fieldName] && !errors[fieldName]) {
      classes +=
        " border-green-500 focus:border-green-500 focus:ring-green-500/30";
    } else {
      classes +=
        " border-zinc-300 dark:border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500/30";
    }

    classes += " transition-colors duration-200 outline-none focus:ring-2";
    return classes;
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-lg border border-zinc-200 p-6 flex flex-col items-center text-center dark:border-white/10"
          >
            <FiCheck className="text-emerald-700 dark:text-emerald-400 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">{t("success")}</h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              {t("successMessage")}
            </p>
          </m.div>
        ) : status === "error" ? (
          <m.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-lg border border-zinc-200 p-6 flex flex-col items-center text-center dark:border-white/10"
          >
            <FiAlertCircle className="text-red-600 dark:text-red-400 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">{t("errorTitle")}</h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              {t("errorMessage")}
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Honeypot: visually hidden, kept out of the tab order. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses("name")}
                  placeholder={t("placeholder.name")}
                  disabled={status === "submitting"}
                />
                {touched.name && errors.name && (
                  <m.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.name}
                  </m.p>
                )}
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses("email")}
                  placeholder={t("placeholder.email")}
                  disabled={status === "submitting"}
                />
                {touched.email && errors.email && (
                  <m.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.email}
                  </m.p>
                )}
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  {t("message")}
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
                  placeholder={t("placeholder.message")}
                  disabled={status === "submitting"}
                />
                {touched.message && errors.message && (
                  <m.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.message}
                  </m.p>
                )}
              </m.div>
            </div>

            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-md bg-zinc-900 px-4 py-3 font-accent-mono font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                <span className="flex items-center justify-center">
                  {status === "submitting" ? (
                    <>
                      <m.div
                        className="w-5 h-5 border-2 border-white dark:border-zinc-900 border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          ease: "linear",
                        }}
                      />
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      {t("submit")}
                    </>
                  )}
                </span>
              </button>
            </m.div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
 