import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "~/components/landing-page";
import { pageMeta } from "~/meta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      "Paseo – 随时随地运行 Claude Code、Codex、Copilot、OpenCode 和 Pi",
      "面向 Claude Code、Codex、Copilot、OpenCode 和 Pi 的自托管守护进程。Agent 在你的机器上运行，拥有完整开发环境。可从手机、桌面端或 Web 连接。",
    ),
  }),
  component: Home,
});

function Home() {
  return (
    <LandingPage
      title={
        <>
          编排你的编码 Agent
          <br />
          无论在桌前还是手机上
        </>
      }
      subtitle="可从手机、桌面端或终端运行任意编码 Agent。自托管、多 Provider、开源。"
    />
  );
}
