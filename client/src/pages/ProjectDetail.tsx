import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Project } from "../types/projects";
import { Helmet } from "react-helmet-async";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data: Project[]) => {
        const found = data.find((p) => p.slug === slug);
        setProject(found ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!project)
    return (
      <div className="text-white p-10">
        Project not found.{" "}
        <Link to="/" className="text-amber400 underline">
          Go Back Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-10">
      <Helmet>
        <title>{project.title} | Portfolio Codex</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.image} />
        <meta name="keywords" content={project.tech.join(", ")} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-6">
        <img
          src={project.image}
          alt={project.title}
          className="rounded w-full bject-cover max-h-96"
        />
        <h1 className="text-4xl font-bold text-amber-300">{project.title}</h1>
        <p className="text-lg text-gray-300">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="bg-emerald-700 text-white px-3 py-1 rounded text-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-6 mt-4">
          <a
            href={project.link}
            target="_blank"
            className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500"
          >
            View Live
          </a>
          <a
            href={project.repo}
            target="_blank"
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            View Code
          </a>
        </div>
        <Link to="/projects" className="text-amber-400 underline block mt-8">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}
