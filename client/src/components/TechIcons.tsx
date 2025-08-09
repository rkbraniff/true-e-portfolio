import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiJavascript,
  SiVite,
} from "react-icons/si";

const technologies = [
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
  { name: "Express", icon: <SiExpress className="text-gray-300" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" /> },
  { name: "TailwindCSS", icon: <SiTailwindcss className="text-teal-400" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
  { name: "Vite", icon: <SiVite className="text-sky-400" /> },
  { name: "GitHub", icon: <FaGithub className="text-gray-200" /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-400" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-400" /> },
];

export default function TechIcons() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center mt-12">
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className="flex flex-col items-center space-y-2 group hover:scale-110 transition-all hover:shadow-5xl"
        >
          <div className="text-4xl transition:transform group-hover:text-emerald-400">
            {tech.icon}
          </div>
          <span className="text-xs text-gray-400 group-hover:text-emerald-400">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}
