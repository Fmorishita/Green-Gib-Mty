import { Fragment } from "react";

interface ArticleContentProps {
  content: string;
}

/**
 * Renderiza contenido con sintaxis ligera:
 * `## ` → subtítulo, líneas `- ` → lista, resto → párrafos.
 */
export function ArticleContent({ content }: ArticleContentProps) {
  const blocks = content.trim().split(/\n\s*\n/);

  return (
    <div className="prose-gibb max-w-none">
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        if (trimmed.startsWith("## ")) {
          return <h2 key={i}>{trimmed.replace(/^##\s+/, "")}</h2>;
        }

        const lines = trimmed.split("\n");
        if (lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^-\s+/, "")}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i}>
            {lines.map((l, j) => (
              <Fragment key={j}>
                {l}
                {j < lines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
