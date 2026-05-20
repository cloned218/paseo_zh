import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState, type FormEvent } from "react";
import { submitCloudSignup, type CloudSignupInput } from "~/cloud-signup";
import { FAQItem } from "~/components/faq-item";
import { SiteShell } from "~/components/site-shell";
import { pageMeta } from "~/meta";

export const Route = createFileRoute("/cloud")({
  head: () => ({
    meta: pageMeta(
      "Paseo Cloud - 设计合作伙伴",
      "让 Paseo 在多台机器、团队或公司环境中使用。现正寻找设计合作伙伴。",
    ),
  }),
  component: Cloud,
});

const INPUT_CLASS =
  "block w-full rounded-md bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors";

type Status = "idle" | "submitting" | "success" | "error";

function Cloud() {
  return (
    <SiteShell>
      <h1 className="text-3xl font-medium mb-3">Paseo Cloud</h1>
      <p className="text-white/70 leading-relaxed mb-10">
        适用于跨机器、团队协作或企业内部使用 Paseo 的场景。现正寻找设计合作伙伴。
      </p>

      <div className="space-y-20">
        <SignupForm />
        <FaqSection />
      </div>
    </SiteShell>
  );
}

function SignupForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(event.currentTarget);
    const data: CloudSignupInput = {
      email: String(form.get("email") ?? ""),
      name: form.get("name") ? String(form.get("name")) : undefined,
      company: form.get("company") ? String(form.get("company")) : undefined,
      role: form.get("role") ? String(form.get("role")) : undefined,
      message: String(form.get("message") ?? ""),
      honeypot: form.get("website") ? String(form.get("website")) : "",
    };

    try {
      await submitCloudSignup({ data });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "出了点问题。");
    }
  }, []);

  if (status === "success") {
    return (
      <section className="space-y-3">
        <p className="text-white/70">
          Got it. I&apos;ll be in touch. If you don&apos;t hear back within a week, ping me on{" "}
          <a
            href="https://discord.gg/jz8T2uahpH"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/80"
          >
            Discord
          </a>
          .
        </p>
      </section>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="邮箱" required>
          <input type="email" name="email" required autoComplete="email" className={INPUT_CLASS} />
        </Field>
        <Field label="姓名">
          <input type="text" name="name" autoComplete="name" className={INPUT_CLASS} />
        </Field>
        <Field label="公司">
          <input type="text" name="company" autoComplete="organization" className={INPUT_CLASS} />
        </Field>
        <Field label="角色">
          <input
            type="text"
            name="role"
            autoComplete="organization-title"
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      <Field label="留言" required>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="简单介绍一下你，以及你希望 Paseo Cloud 提供什么。"
          className={`${INPUT_CLASS} resize-y`}
        />
      </Field>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      {error && (
        <p className="text-sm text-red-400">
          {error === "webhook not configured"
            ? "表单暂未接通，先通过 Discord 联系吧。"
            : "出了点问题。请重试，或直接在 Discord 私信我。"}
        </p>
      )}

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "发送中…" : "发送"}
        </button>
        <p className="text-sm text-white/50">
          或者{" "}
          <a
            href="https://discord.gg/jz8T2uahpH"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/80"
          >
            在 Discord 私信我
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-white/80 pb-2">
        {label}
        {required && <span className="text-white/40"> *</span>}
      </span>
      {children}
    </label>
  );
}

function FaqSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-medium">常见问题</h2>
      <div className="space-y-6">
        <FAQItem question="什么是 Paseo Cloud？">
          Paseo 之上的一层可选能力，用于跨机器运行守护进程、同步配置，以及在团队或公司中使用
          Paseo。可理解为共享运行器、权限、审计、托管守护进程和组织级控制。
        </FAQItem>
        <FAQItem question="Paseo 会一直免费且开源吗？">
          会。整套栈都会保持免费且开源：应用、守护进程、CLI、协议以及 Cloud
          控制平面。托管版云服务只是给不想自己部署的人提供的一层可选付费服务。
        </FAQItem>
        <FAQItem question="自托管还是托管版？">
          两者都有。控制平面会放在 Paseo monorepo
          里，你可以自行部署；托管版则面向不想自己维护的人和团队。
        </FAQItem>
        <FAQItem question="我的代码会经过 Paseo 吗？">
          不会。守护进程运行在你的机器上，并直接与 Agent Provider 通信。Cloud
          只负责注册、配置同步、权限与编排。代码和模型流量仍保留在你的机器上。
        </FAQItem>
        <FAQItem question="什么时候可用？">
          目前正向设计合作伙伴开放早期接入。还没有公开发布日期，应用和守护进程优先。
        </FAQItem>
        <FAQItem question="如何定价？">暂未确定。设计合作伙伴会一起参与定价方案的打磨。</FAQItem>
      </div>
    </section>
  );
}
