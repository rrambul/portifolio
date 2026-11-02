"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { isValidEmail, MIN_MESSAGE_LENGTH } from "@/lib/validation";

const FIELDS = ["name", "email", "message"] as const;
type FieldName = (typeof FIELDS)[number];
type FormValues = Record<FieldName, string>;
/** Message key (under `contact.form`) of the rule a field breaks. */
type FieldErrors = Partial<Record<FieldName, string>>;
type Touched = Partial<Record<FieldName, boolean>>;
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_VALUES: FormValues = { name: "", email: "", message: "" };

/** How long the success and error notices stay up before the form returns. */
const NOTICE_MS = 5000;

/**
 * One rule per field: the message key of the first check the value fails, or
 * null when it passes. The same rules run on blur, on change once a field has
 * been touched, and on submit, so there is a single definition of "valid".
 */
const RULES: Record<FieldName, (value: string) => string | null> = {
  name: (value) => (value.trim() ? null : "error.nameRequired"),
  email: (value) => {
    if (!value.trim()) return "error.emailRequired";
    if (!isValidEmail(value)) return "error.emailInvalid";
    return null;
  },
  message: (value) => {
    if (!value.trim()) return "error.messageRequired";
    if (value.length < MIN_MESSAGE_LENGTH) return "error.messageShort";
    return null;
  },
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of FIELDS) {
    const error = RULES[field](values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export function AnimatedContactForm() {
  const t = useTranslations("contact.form");

  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Touched>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  // Honeypot: hidden from users, bots tend to fill it. Submitted as `company`.
  const [honeypot, setHoneypot] = useState("");

  // Errors are derived, not stored: a field shows its error once touched.
  const errors = validate(values);
  const submitting = status === "submitting";

  // Both notices dismiss themselves. Keeping the timer in an effect means it is
  // cleared if the form unmounts first, instead of updating a dead component.
  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const timer = setTimeout(() => setStatus("idle"), NOTICE_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const setValue = (field: FieldName, value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const touch = (field: FieldName) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setValues(EMPTY_VALUES);
      setTouched({});
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <Notice
            key="success"
            icon={<FiCheck className="mb-4 text-4xl text-emerald-700 dark:text-emerald-400" />}
            title={t("success")}
            body={t("successMessage")}
          />
        ) : status === "error" ? (
          <Notice
            key="error"
            icon={<FiAlertCircle className="mb-4 text-4xl text-red-600 dark:text-red-400" />}
            title={t("errorTitle")}
            body={t("errorMessage")}
          />
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
              {FIELDS.map((field, index) => (
                <Field
                  key={field}
                  name={field}
                  value={values[field]}
                  error={touched[field] ? errors[field] : undefined}
                  touched={Boolean(touched[field])}
                  disabled={submitting}
                  delay={0.1 * (index + 1)}
                  onChange={(value) => setValue(field, value)}
                  onBlur={() => touch(field)}
                />
              ))}
            </div>

            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-zinc-900 px-4 py-3 font-accent-mono font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                <span className="flex items-center justify-center">
                  {submitting ? (
                    <>
                      <m.div
                        className="mr-2 h-5 w-5 rounded-full border-2 border-white border-t-transparent dark:border-zinc-900"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
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

interface FieldProps {
  name: FieldName;
  value: string;
  /** Message key to show under the input; only set once the field is touched. */
  error?: string;
  touched: boolean;
  disabled: boolean;
  /** Entrance delay in seconds, so the fields cascade in. */
  delay: number;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const INPUT_BASE =
  "w-full rounded-md border bg-transparent p-3 text-zinc-900 outline-none transition-colors duration-200 focus:ring-2 dark:text-zinc-100";

const INPUT_TONE = {
  invalid: "border-red-500 focus:border-red-500 focus:ring-red-500/30",
  valid: "border-green-500 focus:border-green-500 focus:ring-green-500/30",
  untouched:
    "border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500/30 dark:border-zinc-700",
} as const;

/** One labelled input (or textarea for the message) with its error line. */
function Field({ name, value, error, touched, disabled, delay, onChange, onBlur }: FieldProps) {
  const t = useTranslations("contact.form");
  const tone = !touched ? "untouched" : error ? "invalid" : "valid";
  const className = `${INPUT_BASE} ${INPUT_TONE[tone]}`;
  const shared = {
    id: name,
    name,
    value,
    disabled,
    placeholder: t(`placeholder.${name}`),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onBlur,
  };

  return (
    <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {t(name)}
      </label>
      {name === "message" ? (
        <textarea {...shared} className={`${className} min-h-[120px] resize-y`} />
      ) : (
        <input {...shared} type={name === "email" ? "email" : "text"} className={className} />
      )}
      {error ? (
        <m.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-1 text-sm text-red-500"
        >
          {t(error)}
        </m.p>
      ) : null}
    </m.div>
  );
}

/** The success or error panel that replaces the form for a few seconds. */
function Notice({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center rounded-lg border border-zinc-200 p-6 text-center dark:border-white/10"
    >
      {icon}
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-300">{body}</p>
    </m.div>
  );
}
