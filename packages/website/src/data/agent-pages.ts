// Source of truth for per-agent marketing landing pages.
// To add a new agent, append an entry here and create a 4-line route file at
// `src/routes/<slug>.tsx`. The sitemap (vite.config) reads `AGENT_PAGE_SLUGS`.

export interface AgentPage {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
}

export const AGENT_PAGES = [
  {
    slug: "claude-code",
    name: "Claude Code",
    title: "在手机上用 Claude Code 持续交付",
    subtitle: "随时启动 Agent、查看进度、完成合并。你的 Claude Code 配置、你的机器、你的口袋。",
    metaTitle: "Claude Code 手机应用 – 用手机持续交付 | Paseo",
    metaDescription:
      "通过手机运行 Claude Code。启动 Agent、查看进度、审查 diff 并完成合并——一切都能在口袋里完成。自托管，代码保留在你的机器上。",
  },
  {
    slug: "codex",
    name: "Codex",
    title: "随时随地运行 Codex",
    subtitle: "直接用手机在你的机器上启动 Codex Agent。通勤路上查看、沙发上评审、公园里合并。",
    metaTitle: "Codex 手机应用 – 随时随地运行 Codex | Paseo",
    metaDescription:
      "通过手机运行 OpenAI Codex。启动 Agent、监控进度、无需坐在工位前也能持续交付。自托管，代码永不离开你的机器。",
  },
  {
    slug: "opencode",
    name: "OpenCode",
    title: "用手机运行 OpenCode",
    subtitle: "随时启动 Agent、查看构建状态、持续交付代码。配置不变、机器不变，只是不必坐在桌前。",
    metaTitle: "OpenCode 手机应用 – 随时随地写代码 | Paseo",
    metaDescription:
      "通过手机运行 OpenCode。启动 Agent、看它们工作，并在任何地方持续交付代码。自托管、开源、代码保留在本地。",
  },
  {
    slug: "copilot",
    name: "GitHub Copilot",
    title: "移动端 GitHub Copilot",
    subtitle: "用手机驱动 Copilot。发起改动、看它落地，不用坐回工位也能继续交付。",
    metaTitle: "GitHub Copilot 手机应用 – 随时驱动 Copilot | Paseo",
    metaDescription:
      "通过手机控制 GitHub Copilot。启动会话、监控进度、随时完成合并。你的机器、你的账号、你的口袋。",
  },
  {
    slug: "pi",
    name: "Pi",
    title: "用手机运行 Pi",
    subtitle: "小巧 Agent，完整掌控。随时启动 Pi，在关键时刻回来查看。",
    metaTitle: "Pi 手机应用 – 随时随地运行 Pi | Paseo",
    metaDescription:
      "通过手机运行 Pi 编码 Agent。在你的机器上启动会话、查看进度、从口袋里完成合并。自托管且开源。",
  },
  {
    slug: "cursor",
    name: "Cursor",
    title: "把 Cursor 装进口袋",
    subtitle: "把任务发给你机器上的 Cursor，看它运行，在通勤路上审查 diff。",
    metaTitle: "Cursor 手机应用 – 随时驱动 Cursor | Paseo",
    metaDescription:
      "通过手机运行 Cursor。发起任务、监控输出、审查 diff 并完成合并——一切都能在口袋里完成。自托管，代码保留在本地。",
  },
  {
    slug: "gemini",
    name: "Gemini CLI",
    title: "随时随地运行 Gemini",
    subtitle: "直接用手机启动 Google Gemini CLI。真正的编码工作，不必拿出笔记本。",
    metaTitle: "Gemini CLI 手机应用 – 随时运行 Gemini | Paseo",
    metaDescription:
      "通过手机驱动 Google Gemini CLI。启动 Agent、监控进度，并在任何地方持续交付。自托管，代码永不离开你的机器。",
  },
  {
    slug: "hermes",
    name: "Hermes Agent",
    title: "手机上的 Hermes Agent",
    subtitle: "随时驱动 Nous Research 的 Hermes Agent。你的机器负责干活，你的口袋负责指挥。",
    metaTitle: "Hermes Agent 手机应用 – 随时驱动 Hermes | Paseo",
    metaDescription:
      "通过手机运行 Nous Research 的 Hermes Agent。启动会话、监控进度，并从口袋里持续交付代码。",
  },
  {
    slug: "qwen-code",
    name: "Qwen Code",
    title: "随时随地运行 Qwen Code",
    subtitle: "当你不在工位前时，也能把阿里巴巴的 Qwen Agent 派到你的机器上工作。",
    metaTitle: "Qwen Code 手机应用 – 随时运行 Qwen | Paseo",
    metaDescription:
      "通过手机驱动阿里巴巴的 Qwen Code。在你的机器上启动 Agent、监控进度，并随时完成合并。",
  },
  {
    slug: "kimi",
    name: "Kimi Code CLI",
    title: "用手机运行 Kimi Code",
    subtitle:
      "Moonshot AI 的 Kimi Code CLI 跑在你的机器上，你可以在任何地方控制它。配置不变，无需笔记本。",
    metaTitle: "Kimi Code 手机应用 – 随时运行 Kimi Code | Paseo",
    metaDescription:
      "通过手机运行 Moonshot AI 的 Kimi Code CLI。启动会话、监控进度、从口袋里持续交付。自托管且私密。",
  },
  {
    slug: "amp",
    name: "Amp",
    title: "移动端 Amp",
    subtitle: "用手机驱动前沿编码 Agent。发起工作、监控进度、随时完成合并。",
    metaTitle: "Amp 手机应用 – 随时运行 Amp | Paseo",
    metaDescription:
      "通过手机运行 Amp 这类前沿编码 Agent。在你的机器上发起任务，看它们从口袋里一路交付。",
  },
  {
    slug: "auggie",
    name: "Auggie CLI",
    title: "把 Auggie 装进口袋",
    subtitle: "通过手机运行 Augment Code 的 Agent。行业领先的上下文能力，随时可用。",
    metaTitle: "Auggie 手机应用 – 随时驱动 Augment Code | Paseo",
    metaDescription:
      "通过手机运行 Augment Code 的 Auggie CLI。在你的机器上启动会话、监控进度，并从口袋里持续交付代码。",
  },
  {
    slug: "cline",
    name: "Cline",
    title: "随时随地运行 Cline",
    subtitle: "自主编码 Agent 跑在你的机器上，由你的手机控制。看它工作，需要时再介入。",
    metaTitle: "Cline 手机应用 – 随时运行 Cline | Paseo",
    metaDescription:
      "通过手机驱动自主编码 Agent Cline。启动任务、监控输出，并在任何地方审查 diff。",
  },
  {
    slug: "codebuddy",
    name: "Codebuddy Code",
    title: "用手机运行 Codebuddy",
    subtitle: "随时运行腾讯云的智能编码工具。你的开发机，你的口袋。",
    metaTitle: "Codebuddy Code 手机应用 – 随时运行 Codebuddy | Paseo",
    metaDescription:
      "通过手机驱动腾讯云的 Codebuddy Code。在你的机器上启动会话、监控进度，并随时持续交付。",
  },
  {
    slug: "cortex-code",
    name: "Cortex Code",
    title: "移动端 Cortex Code",
    subtitle: "Snowflake 的编码 Agent 跑在你的机器上，由你的手机驱动。无需笔记本。",
    metaTitle: "Cortex Code 手机应用 – 随时运行 Cortex Code | Paseo",
    metaDescription:
      "通过手机运行 Snowflake 的 Cortex Code。启动 Agent、监控进度，并在任何地方持续交付。",
  },
  {
    slug: "corust",
    name: "Corust Agent",
    title: "把 Corust 装进口袋",
    subtitle: "让一位经验丰富的 Rust 搭档在你的机器上工作，由你的手机来驱动。",
    metaTitle: "Corust 手机应用 – 随时驱动 Corust Agent | Paseo",
    metaDescription:
      "通过手机运行面向 Rust 的 Corust 编码 Agent。在你的机器上发起任务，从口袋里持续交付。",
  },
  {
    slug: "crow",
    name: "crow-cli",
    title: "用手机运行 crow-cli",
    subtitle: "极简原生编码 Agent 跑在你的机器上，随时可控。轻量、ACP 原生、适合移动端。",
    metaTitle: "crow-cli 手机应用 – 随时运行 crow-cli | Paseo",
    metaDescription:
      "通过手机驱动极简 ACP 原生编码 Agent crow-cli。在你的机器上发起任务，并在任何地方监控。",
  },
  {
    slug: "deepagents",
    name: "DeepAgents",
    title: "用手机运行 DeepAgents",
    subtitle: "基于 LangChain 的编码 Agent 跑在你的机器上，可在任何地方驱动。开箱即用。",
    metaTitle: "DeepAgents 手机应用 – 随时运行 DeepAgents | Paseo",
    metaDescription:
      "通过手机运行 LangChain DeepAgents 编码 Agent。启动会话、监控进度，并在任何地方持续交付代码。",
  },
  {
    slug: "deepseek-tui",
    name: "DeepSeek TUI",
    title: "用手机运行 DeepSeek TUI",
    subtitle: "在你的机器上运行 DeepSeek V4 终端编码 Agent，然后在任何地方驱动它。",
    metaTitle: "DeepSeek TUI 手机应用 – 随时运行 DeepSeek TUI | Paseo",
    metaDescription:
      "通过手机驱动 DeepSeek TUI。在你的机器上启动编码会话、监控进度，并随时持续交付。",
  },
  {
    slug: "dimcode",
    name: "DimCode",
    title: "随时随地运行 DimCode",
    subtitle: "领先模型，一条命令，由手机驱动。你的机器负责干活。",
    metaTitle: "DimCode 手机应用 – 随时运行 DimCode | Paseo",
    metaDescription:
      "通过手机驱动多模型编码 Agent DimCode。在你的机器上发起任务，并从口袋里持续交付。",
  },
  {
    slug: "dirac",
    name: "Dirac",
    title: "移动端 Dirac",
    subtitle: "哈希锚定的并行编辑跑在你的机器上，由你的口袋来驱动。更快、更便宜、完全开源。",
    metaTitle: "Dirac 手机应用 – 随时运行 Dirac | Paseo",
    metaDescription: "通过手机运行 Dirac 编码 Agent。哈希锚定并行编辑、AST 操作，随时持续交付。",
  },
  {
    slug: "factory-droid",
    name: "Factory Droid",
    title: "随时随地运行 Factory Droid",
    subtitle: "用手机驱动 Factory 的编码 Agent。发起任务、查看进度、从口袋里完成交付。",
    metaTitle: "Factory Droid 手机应用 – 随时运行 Droid | Paseo",
    metaDescription:
      "通过手机运行 Factory AI 的 Droid 编码 Agent。在你的机器上启动会话、监控进度，并随时持续交付。",
  },
  {
    slug: "fast-agent",
    name: "fast-agent",
    title: "移动端 fast-agent",
    subtitle: "多 Provider Agent 跑在你的机器上，可在任何地方控制。发出任务，收回结果。",
    metaTitle: "fast-agent 手机应用 – 随时运行 fast-agent | Paseo",
    metaDescription:
      "通过手机驱动多 Provider 编码 Agent fast-agent。在你的机器上发起任务，并从口袋里监控。",
  },
  {
    slug: "glm",
    name: "GLM Agent",
    title: "用手机运行 GLM Agent",
    subtitle:
      "智谱 AI 的 GLM 编码 Agent 跑在你的机器上，可在任何地方驱动。流式输出、中途切换模型、适配移动端。",
    metaTitle: "GLM Agent 手机应用 – 随时运行 GLM | Paseo",
    metaDescription:
      "通过手机运行智谱 AI 的 GLM 编码 Agent。启动会话、监控进度，并在任何地方持续交付代码。",
  },
  {
    slug: "goose",
    name: "goose",
    title: "用手机运行 goose",
    subtitle:
      "Block 的开源 Agent 跑在你的笔记本上，可在任何地方驱动。本地优先、可扩展、适配移动端。",
    metaTitle: "goose 手机应用 – 随时运行 goose | Paseo",
    metaDescription:
      "通过手机驱动 Block 的 goose——本地优先的开源 AI Agent。在你的机器上发起任务，并从口袋里持续交付。",
  },
  {
    slug: "junie",
    name: "Junie",
    title: "手机上的 Junie",
    subtitle: "JetBrains 的编码 Agent 跑在你的开发机上，由你的口袋来控制。真正的工作流，无需 IDE。",
    metaTitle: "Junie 手机应用 – 随时运行 Junie | Paseo",
    metaDescription:
      "通过手机驱动 JetBrains 的 Junie 编码 Agent。在你的机器上启动会话、监控进度，并随时持续交付。",
  },
  {
    slug: "kilo",
    name: "Kilo Code",
    title: "随时随地运行 Kilo Code",
    subtitle: "Kilo Code 跑在你的机器上，由手机驱动。发出任务，看它交付。",
    metaTitle: "Kilo Code 手机应用 – 随时运行 Kilo Code | Paseo",
    metaDescription:
      "通过手机运行开源编码 Agent Kilo Code。借助 Kilo CLI 在你的机器上发起任务、监控进度，并随时完成合并。",
  },
  {
    slug: "minion-code",
    name: "Minion Code",
    title: "移动端 Minion Code",
    subtitle: "基于 Minion framework 的 Agent 跑在你的机器上，由手机控制。工具丰富，自由度高。",
    metaTitle: "Minion Code 手机应用 – 随时运行 Minion Code | Paseo",
    metaDescription:
      "通过手机驱动 Minion framework 编码 Agent Minion Code。在你的机器上启动会话，并从口袋里持续交付。",
  },
  {
    slug: "mistral-vibe",
    name: "Mistral Vibe",
    title: "用手机运行 Mistral Vibe",
    subtitle: "Mistral 的开源编码助手，随时可驱动。你的机器，你的口袋。",
    metaTitle: "Mistral Vibe 手机应用 – 随时运行 Mistral Vibe | Paseo",
    metaDescription:
      "通过手机运行 Mistral 的开源 Vibe 编码助手。在你的机器上启动会话、监控进度，并随时持续交付。",
  },
  {
    slug: "nova",
    name: "Nova",
    title: "把 Nova 装进口袋",
    subtitle: "Compass AI 的软件工程师跑在你的机器上，由手机控制。发出工作，交付代码。",
    metaTitle: "Nova 手机应用 – 随时运行 Nova | Paseo",
    metaDescription:
      "通过手机驱动 Compass AI 的 Nova 编码 Agent。在你的机器上启动会话、监控进度，并从口袋里完成合并。",
  },
  {
    slug: "poolside",
    name: "Poolside",
    title: "移动端 Poolside",
    subtitle: "随时驱动 Poolside 的编码 Agent。发起任务、看它落地、在路上也能完成合并。",
    metaTitle: "Poolside 手机应用 – 随时运行 Poolside | Paseo",
    metaDescription:
      "通过手机运行 Poolside 的编码 Agent。在你的机器上发起任务、监控进度，并随时持续交付。",
  },
  {
    slug: "qoder",
    name: "Qoder CLI",
    title: "用手机运行 Qoder",
    subtitle: "Agentic 编码助手跑在你的机器上，随时可控。无需笔记本。",
    metaTitle: "Qoder 手机应用 – 随时运行 Qoder | Paseo",
    metaDescription:
      "通过手机驱动 Agentic 编码助手 Qoder。在你的机器上启动会话，并从口袋里持续交付。",
  },
  {
    slug: "sigit",
    name: "siGit Code",
    title: "移动端 siGit Code",
    subtitle: "本地优先的编码 Agent 跑在你的机器上，由手机驱动。还可选择在设备端进行 LLM 推理。",
    metaTitle: "siGit Code 手机应用 – 随时运行 siGit | Paseo",
    metaDescription:
      "通过手机运行本地优先的编码 Agent siGit Code。在你的机器上启动会话，并随时持续交付。",
  },
  {
    slug: "stakpak",
    name: "Stakpak",
    title: "随时随地运行 Stakpak DevOps",
    subtitle: "开源 DevOps Agent 跑在你的机器上，由手机控制。Rust 级速度，企业级安全。",
    metaTitle: "Stakpak 手机应用 – 随时运行 Stakpak | Paseo",
    metaDescription:
      "通过手机驱动基于 Rust 的 DevOps Agent Stakpak。在你的机器上启动任务，并从口袋里监控。",
  },
  {
    slug: "vtcode",
    name: "VT Code",
    title: "移动端 VT Code",
    subtitle: "多 Provider 编码 Agent 跑在你的机器上。随时发出任务，从口袋里完成交付。",
    metaTitle: "VT Code 手机应用 – 随时运行 VT Code | Paseo",
    metaDescription:
      "通过手机运行开源多 Provider 编码 Agent VT Code。启动会话、监控进度，并随时持续交付。",
  },
  {
    slug: "agoragentic",
    name: "Agoragentic",
    title: "用手机运行 Agoragentic",
    subtitle: "174+ AI 能力跑在你的机器上，可在任何地方驱动。浏览、调用、交付。",
    metaTitle: "Agoragentic 手机应用 – 随时运行 Agoragentic | Paseo",
    metaDescription:
      "通过手机驱动 AI Agent 市场 Agoragentic。在你的机器上启动会话，并从口袋里持续交付。",
  },
  {
    slug: "autohand",
    name: "Autohand Code",
    title: "移动端 Autohand Code",
    subtitle: "Autohand 的编码 Agent 跑在你的机器上，由手机控制。真正的工作流，无需笔记本。",
    metaTitle: "Autohand Code 手机应用 – 随时运行 Autohand | Paseo",
    metaDescription:
      "通过手机运行 Autohand AI 的编码 Agent。在你的机器上启动会话、监控进度，并随时持续交付。",
  },
] as const satisfies readonly AgentPage[];

export const AGENT_PAGE_SLUGS: readonly string[] = AGENT_PAGES.map((p) => p.slug);

const AGENT_PAGE_MAP_INTERNAL: Record<string, AgentPage> = Object.fromEntries(
  AGENT_PAGES.map((p) => [p.slug, p]),
);

export function getAgentPage(slug: string): AgentPage {
  const page = AGENT_PAGE_MAP_INTERNAL[slug];
  if (!page) throw new Error(`Unknown agent page slug: ${slug}`);
  return page;
}
