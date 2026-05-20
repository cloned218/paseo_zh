import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";

export interface CloudSignupInput {
  email: string;
  name?: string;
  company?: string;
  role?: string;
  message: string;
  honeypot?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown, max: number): string {
  if (typeof v !== "string") throw new Error("应为字符串");
  const trimmed = v.trim();
  if (trimmed.length > max) throw new Error("字段过长");
  return trimmed;
}

function validate(raw: unknown): CloudSignupInput {
  if (typeof raw !== "object" || raw === null) throw new Error("输入无效");
  const r = raw as Record<string, unknown>;

  const email = asString(r.email, 320);
  if (!EMAIL_RE.test(email)) throw new Error("邮箱无效");

  const message = asString(r.message, 4000);
  if (message.length === 0) throw new Error("留言为必填项");

  const name = r.name === undefined || r.name === "" ? undefined : asString(r.name, 200);
  const company =
    r.company === undefined || r.company === "" ? undefined : asString(r.company, 200);
  const role = r.role === undefined || r.role === "" ? undefined : asString(r.role, 200);
  const honeypot = typeof r.honeypot === "string" ? r.honeypot : "";

  return { email, name, company, role, message, honeypot };
}

function truncate(s: string, max: number): string {
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}

function buildEmbed(input: CloudSignupInput) {
  const fields: Array<{ name: string; value: string; inline?: boolean }> = [
    { name: "Email", value: truncate(input.email, 1024), inline: true },
  ];
  if (input.name) {
    fields.push({ name: "Name", value: truncate(input.name, 1024), inline: true });
  }
  if (input.company) {
    fields.push({ name: "Company", value: truncate(input.company, 1024), inline: true });
  }
  if (input.role) {
    fields.push({ name: "Role", value: truncate(input.role, 1024), inline: true });
  }
  fields.push({ name: "Message", value: truncate(input.message, 1024) });

  return {
    title: "Paseo Cloud 注册",
    color: 0x5865f2,
    fields,
    timestamp: new Date().toISOString(),
  };
}

export const submitCloudSignup = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    if (data.honeypot) return { ok: true };

    const url = (env as { DISCORD_WEBHOOK_URL?: string }).DISCORD_WEBHOOK_URL;
    if (!url) throw new Error("webhook 未配置");

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [buildEmbed(data)] }),
    });

    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return { ok: true };
  });
