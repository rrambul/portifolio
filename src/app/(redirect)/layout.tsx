// Minimal root layout for the locale-less "/" route, which only redirects.
// The real document shell (providers, fonts, scripts) lives in
// app/[locale]/layout.tsx so <html lang> can reflect the active locale.
export default function RedirectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
