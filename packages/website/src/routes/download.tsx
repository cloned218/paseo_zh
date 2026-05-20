import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "~/components/code-block";
import { SiteShell } from "~/components/site-shell";
import { pageMeta } from "~/meta";
import {
  downloadUrls,
  appStoreUrl,
  playStoreUrl,
  webAppUrl,
  AppleIcon,
  AndroidIcon,
  WindowsIcon,
  LinuxIcon,
  TerminalIcon,
  GlobeIcon,
} from "~/downloads";
import { useRelease } from "~/routes/__root";
import "~/styles.css";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: pageMeta(
      "下载 - Paseo",
      "下载适用于 macOS、Windows、Linux、iOS 和 Android 的 Paseo。把你的开发环境装进口袋。",
    ),
  }),
  component: Download,
});

function Download() {
  const release = useRelease();
  const { version } = release;
  const urls = downloadUrls(release);

  return (
    <SiteShell>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">下载</h1>
      <p className="text-muted-foreground mb-10">v{version}</p>

      {/* 桌面端 */}
      <section className="rounded-xl border border-border bg-card/40 p-6 md:p-8 mb-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">桌面端</h2>
            <p className="text-sm text-muted-foreground mt-1">推荐，已打包好所需的一切</p>
          </div>
          <MonitorIcon className="h-5 w-5 text-muted-foreground mt-1.5" />
        </div>

        <div className="divide-y divide-border">
          {/* macOS */}
          <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <AppleIcon className="h-5 w-5 text-foreground" />
              <span className="font-medium">macOS</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <DownloadPill href={urls.macAppleSilicon} label="Apple 芯片" />
              <DownloadPill href={urls.macIntel} label="Intel 芯片" />
            </div>
          </div>

          {/* Homebrew */}
          <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <TerminalIcon className="h-5 w-5 text-foreground" />
              <span className="font-medium">Homebrew</span>
            </div>
            <CodeBlock size="sm">brew install --cask paseo</CodeBlock>
          </div>

          {/* Windows */}
          <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <WindowsIcon className="h-5 w-5 text-foreground" />
              <span className="font-medium">Windows</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <DownloadPill
                href={urls.windowsExeX64}
                label={urls.windowsExeArm64 ? "Intel / x64" : "立即下载"}
              />
              {urls.windowsExeArm64 && <DownloadPill href={urls.windowsExeArm64} label="ARM64" />}
            </div>
          </div>

          {/* Linux */}
          <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <LinuxIcon className="h-5 w-5 text-foreground" />
              <span className="font-medium">Linux</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <DownloadPill href={urls.linuxAppImage} label="AppImage 包" />
              <DownloadPill href={urls.linuxDeb} label="DEB" />
              <DownloadPill href={urls.linuxRpm} label="RPM" />
            </div>
          </div>
        </div>
      </section>

      {/* 移动端 */}
      <section className="rounded-xl border border-border bg-card/40 p-6 md:p-8 mb-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">移动端</h2>
          <PhoneIcon className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="divide-y divide-border">
          {/* Android */}
          <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <AndroidIcon className="h-5 w-5 text-foreground" />
              <span className="font-medium">Android</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <DownloadPill href={playStoreUrl} label="Play 商店" external />
              <DownloadPill href={urls.androidApk} label="APK" />
            </div>
          </div>

          {/* iOS */}
          <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <AppleIcon className="h-5 w-5 text-foreground" />
              <span className="font-medium">iOS</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <DownloadPill href={appStoreUrl} label="App Store" external />
            </div>
          </div>
        </div>
      </section>

      {/* Web */}
      <section className="rounded-xl border border-border bg-card/40 p-6 md:p-8 mb-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">网页端</h2>
            <p className="text-sm text-muted-foreground mt-1">可从任意浏览器连接到服务器</p>
          </div>
          <GlobeIcon className="h-5 w-5 text-muted-foreground mt-1.5" />
        </div>

        <div className="divide-y divide-border">
          <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <GlobeIcon className="h-5 w-5 text-foreground" />
              <span className="font-medium">网页应用</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <DownloadPill href={webAppUrl} label="打开" external />
            </div>
          </div>
        </div>
      </section>

      {/* 服务端 */}
      <section className="rounded-xl border border-border bg-card/40 p-6 md:p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">服务端</h2>
            <p className="text-sm text-muted-foreground mt-1">
              可在任意位置运行 Paseo 服务端，并从任意客户端连接
            </p>
          </div>
          <TerminalIcon className="h-5 w-5 text-muted-foreground mt-1.5" />
        </div>

        <div className="divide-y divide-border">
          <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <TerminalIcon className="h-5 w-5 text-foreground" />
              <span className="font-medium">npm</span>
            </div>
            <CodeBlock size="sm">npm install -g @getpaseo/cli && paseo</CodeBlock>
          </div>

          <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <TerminalIcon className="h-5 w-5 text-foreground" />
              <span className="font-medium">Nix</span>
            </div>
            <CodeBlock size="sm">nix run github:getpaseo/paseo</CodeBlock>
          </div>
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground mt-8">
        所有版本均可在{" "}
        <a
          href="https://github.com/getpaseo/paseo/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          GitHub 发布页
        </a>
        .
      </p>
    </SiteShell>
  );
}

function DownloadPill({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background hover:bg-foreground/85 transition-colors"
    >
      {label}
      {external && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1.5 h-3 w-3"
          aria-hidden="true"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      )}
    </a>
  );
}

function MonitorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
