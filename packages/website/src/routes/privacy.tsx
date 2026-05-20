import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "~/components/site-shell";
import { pageMeta } from "~/meta";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: pageMeta(
      "隐私政策 - Paseo",
      "Paseo 的隐私政策——一个无追踪、无分析的自托管智能体管理器。",
    ),
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteShell>
      <h1 className="text-3xl font-medium mb-8">隐私政策</h1>

      <div className="space-y-6 text-white/70 leading-relaxed">
        <p>Paseo 是一个自托管的编码智能体管理工具。你的代码和数据始终保留在你的设备上。</p>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-white">我们收集什么</h2>
          <p>什么都不收集。Paseo 运行在你的设备上，不会向我们发送任何数据。</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-white">中继服务器</h2>
          <p>如果你使用可选的加密中继把手机连接到守护进程，中继只能看到：</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>IP 地址与连接时间信息</li>
            <li>消息大小</li>
            <li>会话 ID</li>
          </ul>
          <p>
            你手机与守护进程之间的所有消息都会通过 XSalsa20-Poly1305
            进行端到端加密。中继无法读取你的消息、查看你的代码，也无法解密你的流量。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-white">分析与跟踪</h2>
          <p>我们不使用分析统计、追踪像素、Cookie 或广告。应用也不会偷偷把数据回传给我们。</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-white">第三方服务</h2>
          <p>
            Paseo 封装了 Claude Code、Codex、OpenCode
            等智能体提供方。这些工具会使用你的凭据与它们各自的 API（如 Anthropic、OpenAI
            等）通信。Paseo 不会管理、拦截或代理这些 API 调用。
          </p>
          <p>
            如果你使用云端语音功能（如 OpenAI
            speech），你的语音数据会按照对应服务的隐私政策发送给它们。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-white">我们不会出售你的数据</h2>
          <p>因为我们根本拿不到你的数据可卖。Paseo 是自托管、以本地优先为核心设计的。</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-white">有疑问？</h2>
          <p>
            如果你对隐私有任何疑问，请在{" "}
            <a
              href="https://github.com/getpaseo/paseo"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/90"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        <p className="text-sm text-white/50 pt-6">最后更新：2025 年 2 月</p>
      </div>
    </SiteShell>
  );
}
