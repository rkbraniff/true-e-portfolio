import type { Project } from "../types/projects";
import { Link } from "react-router-dom";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={project.image}
        alt={project.title}
        className="h-48 w-full object-cover"
      />
      <h3 className="text-2xl font-bold text-amber-300">{project.title}</h3>
      <p className="text-gray-300 mt-2">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-sm bg-emerald-700 text-white px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <Link
          to={`/projects/${project.slug}`}
          className="text-emerald-400 hover:underline"
        >
          Details
        </Link>
        <a
          href={project.link}
          target="_blank"
          className="text-emerald-400 hover:underline"
        >
          Live
        </a>
        <a 
        href={`/docs/${project.slug}`}
        className="text-emerald-400 hover:underline"
        >
            Markdown
        </a>
        <a
          href={project.repo}
          target="_blank"
          className="text-emerald-400 hover:underline"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
