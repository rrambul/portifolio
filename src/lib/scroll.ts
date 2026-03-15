const NAV_HEIGHT = 80;

export function scrollToSection(sectionId: string, navHeight = NAV_HEIGHT) {
  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    const offsetPosition = element.offsetTop - navHeight;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
}
