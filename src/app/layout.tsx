import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "../components/ui/theme-fix.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { TransitionProvider } from "@/providers/TransitionProvider";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Renan Rambul - Portfolio",
  description: "Software Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(storedTheme || 'dark');
                } catch (e) {
                  console.error('Theme initialization failed:', e);
                  // Ensure dark theme is applied by default
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={outfit.className}>
        <ThemeProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
