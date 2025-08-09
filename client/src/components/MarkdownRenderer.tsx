import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  slug: string;
}

export default function MarkdownRenderer({ slug }: Props) {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/markdown/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("404 Not Found");
        return res.text();
      })
      .then(setContent)
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    return <p className="text-red-500 text-center">📜 Scroll not Found.</p>;
  }

  return (
    <article className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
