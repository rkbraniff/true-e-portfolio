export interface Project {
  id: number;
  slug: string;
  doc: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  repo: string;
  image: string;
  content: any;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "mythos",
    doc: "/markdown/mythos.md",
    title: "MythOS: Terminal Portfolio",
    description: "A terminal-style portfolio with keyboard navigation and ASCII magic. React + Vite + Tailwind.",
    tech: ["React", "Vite", "Tailwind"],
    link: "https://your-project-link.com",
    repo: "https://github.com/rkbraniff/mythos",
    image: "placeholder",
    content: undefined
  },
  {
    id: 2,
    slug: "hidden-codex",
    doc: "/markdown/hidden-codex.md",
    title: "Hidden Empire Codex API",
    description: "RESTful API built with Node.js and Express to serve protected grimoire data.",
    tech: ["Node.js", "Express", "PostgreSQL"],
    link: "https://your-backend-link.com",
    repo: "https://github.com/rkbraniff/codex-api",
    image: "placeholder",
    content: undefined
  },
  {
    id: 3,
    slug: "encrypted-chat",
    doc: "/markdown/encrypted-chat.md",
    title: "Encrypted Chat App",
    description: "A secure, end-to-end encrypted chat app using React, Node.js, and WebSocket",
    tech: ["React", "Node.js", "WebSocket", "TailwindCSS"],
    link: "https://whisper-vault-nu.vercel.app/",
    repo: "https://github.com/rkbraniff/whisper-vault",
    image: "C:\\Users\\rfpau\\e-portfolio\\assets\\Screenshot 2025-08-19 160816.png",
    content: undefined
  },
  {
    id: 4,
    slug: "portfolio-gen",
    doc: "/markdown/portfolio-gen.md",
    title: "Portfolio Generator",
    description: "Drag-and-drop builder for personal sites, built with Vite and Postgres",
    tech: ["Vite", "TypeScript", "PostgreSQL"],
    link: "#",
    repo: "#",
    image: "placeholder",
    content: undefined
  },
];
