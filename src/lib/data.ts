export const personal = {
  name: "Ramesh Kumar",
  title: "Full-Stack & AI Application Engineer",
  location: "Hyderabad, India",
  email: "rameshvoodi24@gmail.com",
  phone: "+91 8074862491",
  website: "github.com/0xrameshh",
  portfolio: "0xrameshh.github.io",
  summary:
    "Full-stack engineer with 3+ years freelance experience — 50+ shipped projects across web, AI, and systems. I build LangGraph agents, RAG pipelines, and production APIs (FastAPI, Node, Go). Based in Hyderabad.",
};

export const skills = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "LangGraph",
  "LangChain",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "RAG / Chroma",
  "pgvector",
  "Go",
  "Rust",
  "Docker",
  "MongoDB",
  "React Native",
  "Electron",
  "gRPC",
  "Stripe",
  "WebSockets",
  "Solana",
  "Anchor",
  "Tailwind CSS",
];

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "Freelance Engineer",
    period: "Oct 2023 - Present",
    location: "Hyderabad, India",
    bullets: [
      "Delivered 50+ client projects end-to-end — web, mobile, AI, and blockchain.",
      "Built full-stack apps with React, Next.js, FastAPI, Node.js, PostgreSQL, and MongoDB.",
      "Developed voice AI agents with speech recognition, TTS, and LLM conversation flows.",
      "Shipped iOS (Swift), React Native, and Flutter apps; published a game on the App Store.",
      "Built Web3 dApps on Solana and Ethereum — contracts, wallets, and production frontends.",
    ],
  },
];

export const projects = [
  {
    name: "Agentflow — Document Intelligence Platform",
    link: "https://github.com/0xrameshh/agentflow",
    stack: ["Python", "LangGraph", "FastAPI", "Chroma", "Next.js", "TypeScript"],
    highlights: [
      "Production-style document Q&A — multi-format RAG, LangGraph agent with critic loop, cited answers.",
      "Next.js chat UI, SSE streaming, YAML eval suite (92% pass), 49 tests, GitHub Actions CI.",
    ],
  },
  {
    name: "Velum",
    link: "https://github.com/0xrameshh/velum",
    stack: ["Go", "gRPC", "Event Sourcing", "Docker"],
    highlights: [
      "Event-sourced workflow engine — gRPC workers, durable timers, sagas, parallel branches.",
      "Control plane + worker pools; Docker Compose demo.",
    ],
  },
  {
    name: "Coworker",
    link: "https://github.com/0xrameshh/coworker",
    stack: ["Electron", "React", "TypeScript", "Rust"],
    highlights: [
      "Electron AI workspace — chat, terminal, file explorer, ripgrep search.",
      "Rust file ops via napi-rs; cross-platform macOS, Linux, Windows.",
    ],
  },
  {
    name: "SHADE",
    link: "https://github.com/0xrameshh/shade",
    stack: ["Next.js", "Solana", "Web Crypto API", "Tailwind CSS"],
    highlights: [
      "Privacy-focused Solana wallet — burner wallets, passkey login, client-side encryption.",
      "Fee-payer flow; seed never leaves the browser.",
    ],
  },
  {
    name: "Solana Stablecoin Standard",
    link: "https://github.com/0xrameshh/solana-stablecoin-standard",
    stack: ["Rust", "Anchor", "Solana", "Token-2022", "TypeScript"],
    highlights: [
      "Anchor framework for regulated stablecoins — SSS-1 (role-based controls) and SSS-2 (compliance extensions).",
      "TypeScript SDK, CLI tooling, transfer-hook blacklist, seize/freeze/pause governance.",
    ],
  },
  {
    name: "PolySwipe",
    link: "https://github.com/0xrameshh/polyswipe",
    stack: ["React Native", "Expo", "NativeWind", "Reanimated", "TanStack Query"],
    highlights: [
      "Tinder-style swipe UI for crypto prediction markets — buy/pass on live market data.",
      "Reanimated gestures, price charts, haptic feedback; Expo SDK 54 + TanStack Query.",
    ],
  },
];

export const education = {
  school: "B.Tech in Computer Science",
  degree: "Bachelor of Technology",
  year: "2024",
};
