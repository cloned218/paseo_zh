import type { Agent } from "@/stores/session-store";
import type { WorkspaceDraftTabSetup } from "@/stores/workspace-tabs-store";

export type ClientSlashCommandKind = "archive-agent" | "replace-agent-with-draft";
export type ClientSlashCommandExecution = "immediate" | "insert";

export interface ClientSlashCommand {
  name: string;
  description: string;
  argumentHint: string;
  kind: ClientSlashCommandKind;
  execution: ClientSlashCommandExecution;
}

export const CLIENT_SLASH_COMMANDS: readonly ClientSlashCommand[] = [
  {
    name: "quit",
    description: "归档当前 Agent",
    argumentHint: "",
    kind: "archive-agent",
    execution: "immediate",
  },
  {
    name: "exit",
    description: "归档当前 Agent",
    argumentHint: "",
    kind: "archive-agent",
    execution: "immediate",
  },
  {
    name: "q",
    description: "归档当前 Agent",
    argumentHint: "",
    kind: "archive-agent",
    execution: "immediate",
  },
  {
    name: "clear",
    description: "归档此 Agent 并新建草稿",
    argumentHint: "",
    kind: "replace-agent-with-draft",
    execution: "immediate",
  },
  {
    name: "new",
    description: "归档此 Agent 并新建草稿",
    argumentHint: "",
    kind: "replace-agent-with-draft",
    execution: "immediate",
  },
];

const COMMAND_BY_NAME = new Map(CLIENT_SLASH_COMMANDS.map((command) => [command.name, command]));

export function resolveClientSlashCommand(input: {
  text: string;
  hasAttachments: boolean;
}): ClientSlashCommand | null {
  if (input.hasAttachments) {
    return null;
  }

  const trimmed = input.text.trim();
  if (!trimmed.startsWith("/")) {
    return null;
  }

  const commandName = trimmed.slice(1);
  if (!commandName || /\s/.test(commandName)) {
    return null;
  }

  return COMMAND_BY_NAME.get(commandName) ?? null;
}

export function buildDraftAgentSetup(agent: Agent): WorkspaceDraftTabSetup {
  const featureValues: Record<string, unknown> = {};
  for (const feature of agent.features ?? []) {
    featureValues[feature.id] = feature.value;
  }

  return {
    provider: agent.provider,
    cwd: agent.cwd,
    modeId: agent.currentModeId ?? agent.runtimeInfo?.modeId ?? null,
    model: agent.model ?? agent.runtimeInfo?.model ?? null,
    thinkingOptionId: agent.thinkingOptionId ?? agent.runtimeInfo?.thinkingOptionId ?? null,
    featureValues,
  };
}
