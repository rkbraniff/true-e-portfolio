import matter from "gray-matter";
import fs from "fs-extra";
import path from "path";

interface ProjectData {
    id: number;
  slug: string;
  doc: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  repo: string;
  image: string;
  content: string;
}

const mdDir = path.resolve("public/markdown/");
const outPath = path.resolve("./public/data/projects.json")

const files = fs.readdirSync(mdDir).filter((file) => file.endsWith(".md"));

const projects: ProjectData[] = files.map((file, i) => {
    const slug =file.replace(/\.md$/, "");
    const filePath = path.join(mdDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(raw);

    return {
        id: i + 1,
        slug,
        doc: `/markdown/${slug}.md`,
        title: data.title ?? `Untitled Project ${i + 1}`,
        description: data.description ?? "No description provided.",
        tech: data.tech ?? [],
        link: data.link ?? "",
        repo: data.repo ?? "",
        image: data.image ?? "/images/default.png",
        content,
    };
});

fs.writeFileSync(outPath, JSON.stringify(projects, null, 2));