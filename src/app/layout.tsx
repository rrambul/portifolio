import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "../components/ui/theme-fix.css";
import "../components/ui/mobile-theme-fix.css";
import "../components/blog/blog-colors.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { TransitionProvider } from "@/providers/TransitionProvider";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Renan Rambul | Software Developer Portfolio",
  description:
    "Portfolio of Renan Rambul, a passionate software developer with 3+ years of experience in building modern web applications and solving complex problems.",
  icons: {
    icon: [
      {
        url: "/favicon/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  themeColor: "#9333ea",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  // First check if we have a stored theme preference
                  let theme = 'dark'; // Default to dark
                  
                  if (storedTheme === 'light' || storedTheme === 'dark') {
                    theme = storedTheme;
                  }
                  
                  // Apply theme to document
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                  
                  // Force text colors to match theme
                  if (theme === 'dark') {
                    document.documentElement.style.setProperty('color-scheme', 'dark');
                    document.documentElement.style.setProperty('--foreground', '0 0% 98%');
                    document.documentElement.style.setProperty('--card-foreground', '0 0% 98%');
                  } else {
                    document.documentElement.style.setProperty('color-scheme', 'light');
                    document.documentElement.style.setProperty('--foreground', '240 10% 3.9%');
                    document.documentElement.style.setProperty('--card-foreground', '240 10% 3.9%');
                  }
                } catch (e) {
                  console.error('Theme initialization failed:', e);
                  // Ensure dark theme is applied by default
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.setProperty('color-scheme', 'dark');
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
