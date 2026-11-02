/**
 * Smooth-scroll a homepage section into view. `scroll-margin-top` on
 * `section[id]` (see globals.css) keeps the heading clear of the sticky nav,
 * so no offset is applied here. For a section that may not be on the current
 * page, go through `navigateTo` in `@/lib/nav` instead.
 */
export function scrollToSection(sectionId: string) {
  document
    .getElementById(sectionId)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
