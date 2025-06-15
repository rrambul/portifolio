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
  title: {
    template: '%s | Renan Rambul',
    default: 'Renan Rambul | Software Developer Portfolio',
  },
  description:
    "Portfolio of Renan Rambul, a passionate software developer with 3+ years of experience in building modern web applications and solving complex problems.",
  metadataBase: new URL('https://renanrambul.com'),
  keywords: [
    'Renan Rambul',
    'Software Developer',
    'Frontend Developer',
    'React',
    'TypeScript',
    'Next.js',
    'JavaScript',
    'Web Development',
    'Portfolio',
    'Brazil',
    'Software Engineer',
  ],
  authors: [{ name: 'Renan Rambul', url: 'https://renanrambul.com' }],
  creator: 'Renan Rambul',
  publisher: 'Renan Rambul',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/favicon/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/favicon/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://renanrambul.com',
    siteName: 'Renan Rambul Portfolio',
    title: 'Renan Rambul | Software Developer Portfolio',
    description: 'Portfolio of Renan Rambul, a passionate software developer with 3+ years of experience in building modern web applications.',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Renan Rambul - Software Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renan Rambul | Software Developer Portfolio',
    description: 'Portfolio of Renan Rambul, a passionate software developer with 3+ years of experience.',
    creator: '@renanrambul',
    images: ['/og-home.png'],
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes as needed
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Renan Rambul",
              "url": "https://renanrambul.com",
              "image": "https://renanrambul.com/profile-picture.jpg",
              "jobTitle": "Software Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Translational Analytics"
              },
              "description": "Passionate software developer with 3+ years of experience in building modern web applications and solving complex problems.",
              "knowsAbout": [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Web Development",
                "Frontend Development",
                "Software Architecture"
              ],
              "sameAs": [
                "https://github.com/renanrambul",
                "https://linkedin.com/in/renanrambul",
                "https://twitter.com/renanrambul"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "Your University"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Renan Rambul Portfolio",
              "url": "https://renanrambul.com",
              "description": "Portfolio of Renan Rambul, a passionate software developer with 3+ years of experience in building modern web applications.",
              "author": {
                "@type": "Person",
                "name": "Renan Rambul"
              },
              "inLanguage": ["en", "pt"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://renanrambul.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
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
