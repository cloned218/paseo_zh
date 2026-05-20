import { appStoreUrl, playStoreUrl, webAppUrl } from "~/downloads";

interface SiteFooterProps {
  width?: "default" | "prose";
}

export function SiteFooter({ width = "default" }: SiteFooterProps) {
  const widthClasses =
    width === "prose" ? "max-w-prose p-6 md:p-12 md:pt-0" : "max-w-5xl p-6 md:p-20 md:pt-0";
  return (
    <footer className={`${widthClasses} mx-auto`}>
      <div className="border-t border-white/10 pt-8 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
          <p className="text-white/60 font-medium">产品</p>
          <div className="space-y-2">
            <a
              href="/blog"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              博客
            </a>
            <a
              href="/docs"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              文档
            </a>
            <a
              href="/changelog"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              更新日志
            </a>
            <a
              href="/cloud"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Cloud
            </a>
            <a
              href="/docs/cli"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              CLI
            </a>
            <a
              href="/privacy"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              隐私
            </a>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-white/60 font-medium">Agent</p>
          <div className="space-y-2">
            <a
              href="/claude-code"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Claude Code
            </a>
            <a
              href="/codex"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Codex
            </a>
            <a
              href="/opencode"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              OpenCode
            </a>
            <a
              href="/agents"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              所有 Provider
            </a>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-white/60 font-medium">社区</p>
          <div className="space-y-2">
            <a
              href="https://discord.gg/jz8T2uahpH"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Discord
            </a>
            <a
              href="https://github.com/getpaseo/paseo"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-white/60 font-medium">下载</p>
          <div className="space-y-2">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              App Store
            </a>
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Google Play
            </a>
            <a
              href="https://github.com/getpaseo/paseo/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              桌面端
            </a>
            <a
              href={webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              Web 应用
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
