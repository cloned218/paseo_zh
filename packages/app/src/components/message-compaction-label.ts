export interface CompactionMarkerLabelInput {
  status: "loading" | "completed";
  trigger?: "auto" | "manual";
  preTokens?: number;
}

export function getCompactionMarkerLabel({
  status,
  trigger,
  preTokens,
}: CompactionMarkerLabelInput): string {
  if (status === "loading") return "压缩中...";
  if (trigger === "auto") return "上下文已自动压缩";
  if (trigger === "manual") return "上下文已手动压缩";
  if (preTokens) return `上下文已压缩（${Math.round(preTokens / 1000)}K 词元）`;
  return "上下文已压缩";
}
