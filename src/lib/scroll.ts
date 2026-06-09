export function scrollToSection(sectionId: string) {
  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // `scroll-margin-top` on `section[id]` (see globals.css) keeps the heading
  // clear of the sticky nav, so we no longer need a hardcoded offset here.
  document
    .getElementById(sectionId)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
