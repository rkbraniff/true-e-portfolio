import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { Project } from "../types/projects";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";

export default function DocsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [md, setMd] = useState("");
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("Requested slug:", slug);

    fetch(`/data/projects.json`)
      .then((res) => res.json())
      .then((projects: Project[]) => {
        console.log(
          "Loaded projects:",
          projects.map((p) => p.slug)
        );
        const project = projects.find((p) => p.slug === slug);
        console.log("Matched project:", project);
        if (!project || !project.content) throw new Error("Project not found");
        setProject(project)
        setMd(project.content);
      })
      .catch((err) => {
        console.log("Failed to load content:", err);
        setError(true);
      });
  }, [slug]);

  if (error) {
    return (
      <section className="p-8 text-red-400">
        <h1 className="text-3x1 font-bold">404 - Scroll Not Found</h1>
        <p>
          No Scroll named <code>{slug}</code> could be summoned.
        </p>
      </section>
    );
  }

  return (
    <section className="prose dark:prose-invert max-w-4xl mx-auto py-12 px-6">
      {project && (
        <Helmet>
          <title>{project?.title} | Portfolio Codex</title>
          <meta name="description" content={project?.description} />
          <meta property="og:title" content={project?.title} />
          <meta property="og:description" content={project?.description} />
          <meta property="og:image" content={project?.image} />
        </Helmet>
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </section>
  );
}
