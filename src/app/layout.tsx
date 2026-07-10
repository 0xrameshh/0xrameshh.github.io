import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://0xrameshh.github.io"),
  title: {
    default: "Ramesh Kumar | Full-Stack & AI Engineer",
    template: "%s | Ramesh Kumar",
  },
  description:
    "Full-stack engineer with 3+ years of experience building web, mobile, AI, and Web3 applications.",
  keywords: [
    "Full-Stack Engineer",
    "AI Engineer",
    "Next.js",
    "LangGraph",
    "RAG",
    "Solana",
    "Portfolio",
  ],
  authors: [{ name: "Ramesh Kumar" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ramesh Kumar",
    title: "Ramesh Kumar | Full-Stack & AI Engineer",
    description:
      "Full-stack engineer with 3+ years of experience building web, mobile, AI, and Web3 applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramesh Kumar | Full-Stack & AI Engineer",
    description:
      "Full-stack engineer with 3+ years of experience building web, mobile, AI, and Web3 applications.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
