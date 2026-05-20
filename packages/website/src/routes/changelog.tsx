import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import changelogMarkdown from "../../../../CHANGELOG.md?raw";
import { SiteShell } from "~/components/site-shell";
import { pageMeta } from "~/meta";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: pageMeta("更新日志 - Paseo", "每个 Paseo 版本发布的产品更新、修复与改进。"),
  }),
  component: Changelog,
});

function Changelog() {
  return (
    <SiteShell>
      <article className="changelog-markdown rounded-xl border border-border bg-card/40 p-6 md:p-8">
        <ReactMarkdown>{changelogMarkdown}</ReactMarkdown>
      </article>
    </SiteShell>
  );
}
