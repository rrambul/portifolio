import en from "@/messages/en/index.json";
import pt from "@/messages/pt/index.json";
import { toLocale } from "@/i18n/config";

export type Messages = typeof en;

/**
 * The message tree for a locale, for code that runs outside a request: the CV
 * renderer and the OG card. Components keep using next-intl's hooks; this is
 * the same JSON those hooks are fed.
 */
export function messagesFor(locale: string): Messages {
  return toLocale(locale) === "pt" ? pt : en;
}
