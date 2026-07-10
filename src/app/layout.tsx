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
    var accents = {
      indigo:  {50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81'},
      emerald: {50:'#ecfdf5',100:'#d1fae5',200:'#a7f3d0',300:'#6ee7b7',400:'#34d399',500:'#10b981',600:'#059669',700:'#047857',800:'#065f46',900:'#064e3b'},
      sunset:  {50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',400:'#fb923c',500:'#f97316',600:'#ea580c',700:'#c2410c',800:'#9a3412',900:'#7c2d12'}
    };
    var a = localStorage.getItem('accent') || 'indigo';
    var pal = accents[a] || accents.indigo;
    var root = document.documentElement;
    for (var k in pal) { root.style.setProperty('--color-brand-' + k, pal[k]); }
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
