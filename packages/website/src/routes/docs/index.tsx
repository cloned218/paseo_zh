import { createFileRoute } from "@tanstack/react-router";
import { DocsMarkdown } from "~/components/docs-markdown";
import { DocsSourceFooter } from "~/components/docs-source-footer";
import { getDoc } from "~/docs";
import { pageMeta } from "~/meta";

export const Route = createFileRoute("/docs/")({
  head: () => {
    const doc = getDoc("");
    if (!doc) return { meta: pageMeta("文档 - Paseo", "Paseo 文档。") };
    return {
      meta: pageMeta(`${doc.frontmatter.title} - Paseo Docs`, doc.frontmatter.description),
    };
  },
  component: DocsIndex,
});

function DocsIndex() {
  const doc = getDoc("");
  if (!doc) return <p className="text-muted-foreground">未找到文档。</p>;
  return (
    <>
      <DocsMarkdown>{doc.content}</DocsMarkdown>
      <DocsSourceFooter doc={doc} />
    </>
  );
}
