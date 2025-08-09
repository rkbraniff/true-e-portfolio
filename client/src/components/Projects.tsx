import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import type { Project } from "../types/projects";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("./public/data/projects.json")
        .then((res) => res.json())
        .then((data) => setProjects(data))
    .catch((err) => console.error("failed to load projects:", err));
    }, []);

  return (
    <section id="projects" className="bg-zinc-900 py-16 px-6 text-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-amber-300">
        📁Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </section>
  );
}
