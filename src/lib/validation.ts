/**
 * Validation rules shared by the contact form and the `/api/contact` route, so
 * the client and the server can never disagree about what a valid submission
 * is.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

/** Shortest message the form accepts, in characters. */
export const MIN_MESSAGE_LENGTH = 10;

/** Longest value the API accepts per field, in characters. */
export const MAX_FIELD_LENGTH = { name: 100, email: 200, message: 5000 } as const;
