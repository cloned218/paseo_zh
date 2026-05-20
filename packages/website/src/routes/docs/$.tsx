import { createFileRoute } from "@tanstack/react-router";
import { DocsMarkdown } from "~/components/docs-markdown";
import { DocsSourceFooter } from "~/components/docs-source-footer";
import { getDoc } from "~/docs";
import { pageMeta } from "~/meta";

export const Route = createFileRoute("/docs/$")({
  head: ({ params }) => {
    const slug = params._splat ?? "";
    const doc = getDoc(slug);
    if (!doc) return { meta: pageMeta("未找到 - Paseo 文档", "未找到文档。") };
    return {
      meta: pageMeta(`${doc.frontmatter.title} - Paseo Docs`, doc.frontmatter.description),
    };
  },
  component: DocsPage,
});

function DocsPage() {
  const { _splat } = Route.useParams();
  const slug = _splat ?? "";
  return <RenderedDoc slug={slug} />;
}

function RenderedDoc({ slug }: { slug: string }) {
  const doc = getDoc(slug);

  if (!doc) {
    return <p className="text-muted-foreground">未找到文档。</p>;
  }

  return (
    <>
      <DocsMarkdown>{doc.content}</DocsMarkdown>
      <DocsSourceFooter doc={doc} />
    </>
  );
}
