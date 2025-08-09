import { Helmet } from "react-helmet-async";
import Projects from "../components/Projects";

export default function ProjectsPage() {
  return (
    <section className="min-h-screen bg-zinc-900 text-white">
      <Helmet>
        <title>Projects | Portfolio Codex</title>
        <meta
          name="description"
          content="Browse a collection of handcrafted, full-stack, and secure digital creations from the Portfolio Codex."
        />
        <meta property="og:title" content="Projects | Portfolio Codex" />
        <meta
          property="og:description"
          content="Discover tools, applications, and experiments forged in the digital forge of the Portfolio Codex."
        />
        <meta property="og:image" content="/images/projects-banner.png" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Projects />
    </section>
  );
}
