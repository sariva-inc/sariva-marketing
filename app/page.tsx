"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const palette = {
  bg: "#07111f",
  bg2: "#0b1628",
  panel: "rgba(15, 27, 48, 0.78)",
  panelSolid: "#0f1b30",
  panel2: "#111f36",
  line: "rgba(148, 163, 184, 0.18)",
  lineStrong: "rgba(96, 165, 250, 0.28)",
  text: "#f8fafc",
  muted: "#cbd5e1",
  quiet: "#94a3b8",
  accent: "#4f7cff",
  accent2: "#22d3ee",
  success: "#34d399",
  warning: "#fbbf24",
  danger: "#fb7185",
};

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Contact", href: "#contact" },
];

const capabilityCards = [
  {
    eyebrow: "Observe",
    title: "Ask what is happening across Kafka and Flink.",
    body: "Consumer lag, broker health, connector status, Schema Registry compatibility, Flink checkpoints, Tableflow sync state, PrivateLink diagnostics, and cloud telemetry in one operational answer.",
    items: ["Confluent Cloud Metrics", "Prometheus / Grafana", "Kafka Exporter", "CloudWatch"],
  },
  {
    eyebrow: "Diagnose",
    title: "Turn noisy incidents into clear root cause.",
    body: "Sariva correlates symptoms across clusters, jobs, networking, schemas, and Git history, then maps the incident to a vetted runbook before recommending the next action.",
    items: ["Lag spikes", "Flink OOM / restart loops", "Connector failures", "Schema breaks"],
  },
  {
    eyebrow: "Act",
    title: "Execute changes through controlled GitOps.",
    body: "Write operations create reviewed pull requests with Terraform diffs, rationale, rollback notes, and audit metadata. Sariva never needs long-lived cloud credentials.",
    items: ["Topics & ACLs", "Connectors", "Flink statements", "Migration runbooks"],
  },
];

const workflow = [
  {
    step: "01",
    title: "Register controlled environments",
    body: "Add only the clusters, repositories, identity groups, and observability sources Sariva is allowed to read or operate.",
  },
  {
    step: "02",
    title: "Ask in Slack, CLI, REST, or MCP",
    body: "Use plain English while Sariva handles the platform vocabulary: partitions, offsets, checkpoints, ACLs, KRaft, IRSA, PrivateLink, FLE, and Tableflow.",
  },
  {
    step: "03",
    title: "Review the evidence and approve the change",
    body: "Read operations return context immediately. Write operations ship as pull requests with diffs, runbook references, and rollback steps.",
  },
];

const useCases = [
  ["Consumer lag spike", "Identify hot partitions, consumer bottlenecks, offset drift, and throughput anomalies before they become application incidents."],
  ["Flink job instability", "Correlate restart loops with checkpoint failures, memory pressure, backpressure, and input topic spikes."],
  ["Confluent Cloud networking", "Walk the PrivateLink, DNS, endpoint service, NLB target, and security-group path without losing the diagnostic chain."],
  ["Schema compatibility failure", "Explain the breaking field, impacted consumers, registered versions, and the safest migration path."],
  ["MSK to Confluent Cloud migration", "Generate topic mapping, replication steps, consumer cutover plan, validation checks, and rollback paths."],
  ["Connector onboarding", "Create Terraform for managed or self-hosted connectors, IAM/RBAC dependencies, DLQ policy, and operational checks."],
];

const securityItems = [
  {
    title: "Self-hosted by default",
    body: "Deploy Sariva into your VPC or Kubernetes environment. Credentials, telemetry access, and operational logs stay within your boundary.",
  },
  {
    title: "Explicit registration model",
    body: "No broad auto-discovery. Sariva operates only registered clusters, topics, jobs, repositories, and runbook scopes.",
  },
  {
    title: "RBAC and approval flow",
    body: "Slack or CLI users map to identity groups. Sensitive writes require review, authorization, and traceable approval.",
  },
  {
    title: "GitOps-first writes",
    body: "Changes are proposed as pull requests. CI/CD owns the cloud credentials, applies the Terraform, and maintains the audit trail.",
  },
];

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function SectionHeader({
  eyebrow,
  title,
  children,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.accent2 }}>
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl" style={{ color: palette.text }}>
        {title}
      </h2>
      {children && (
        <p className="mt-5 text-base leading-8 sm:text-lg" style={{ color: palette.muted }}>
          {children}
        </p>
      )}
    </div>
  );
}

function PulseMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(79,124,255,0.22), rgba(34,211,238,0.16))",
        border: `1px solid ${palette.lineStrong}`,
        boxShadow: "0 0 40px rgba(79,124,255,0.24)",
      }}
    >
      <span className="absolute h-5 w-5 rounded-full border" style={{ borderColor: "rgba(148, 163, 184, 0.35)" }} />
      <span className="absolute h-3 w-3 rounded-full border" style={{ borderColor: "rgba(34, 211, 238, 0.55)" }} />
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.accent2 }} />
    </span>
  );
}

function StatusPill({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "yellow" }) {
  const toneMap = {
    blue: ["rgba(79, 124, 255, 0.16)", "rgba(96, 165, 250, 0.34)", "#bfdbfe"],
    green: ["rgba(52, 211, 153, 0.14)", "rgba(52, 211, 153, 0.32)", "#bbf7d0"],
    yellow: ["rgba(251, 191, 36, 0.14)", "rgba(251, 191, 36, 0.32)", "#fde68a"],
  } as const;

  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
      style={{
        background: toneMap[tone][0],
        border: `1px solid ${toneMap[tone][1]}`,
        color: toneMap[tone][2],
      }}
    >
      {children}
    </span>
  );
}

function ProductConsole() {
  const [active, setActive] = useState("incident");

  const views = {
    incident: {
      label: "Incident",
      title: "Flink job restarting in production",
      command: "@sariva why is fraud-detector restarting?",
      result: [
        ["Signal", "3 restarts in 15 minutes · checkpoint duration +280%"],
        ["Root cause", "TaskManager OOM during payment-events spike"],
        ["Fix", "Raise process memory 4 GB → 6 GB and rebalance parallelism"],
      ],
      tone: "yellow" as const,
    },
    change: {
      label: "Change",
      title: "Topic and ACL request",
      command: "@sariva create payments.audit.v1 with 12 partitions",
      result: [
        ["Validation", "Naming convention, RBAC scope, and retention policy matched"],
        ["Output", "Terraform module generated with owner metadata"],
        ["Approval", "Pull request ready with rollback notes"],
      ],
      tone: "green" as const,
    },
    migration: {
      label: "Migration",
      title: "MSK to Confluent Cloud cutover",
      command: "@sariva plan payments-cluster migration",
      result: [
        ["Inventory", "43 topics · 7 consumer groups · 5 connectors"],
        ["Replication", "Cluster Linking plan with lag-zero validation gates"],
        ["Cutover", "Three-phase producer and consumer migration runbook"],
      ],
      tone: "blue" as const,
    },
  };

  const current = views[active as keyof typeof views];

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-4 shadow-2xl"
      style={{
        background: "linear-gradient(180deg, rgba(15, 27, 48, 0.92), rgba(8, 17, 31, 0.96))",
        border: `1px solid ${palette.lineStrong}`,
        boxShadow: "0 28px 90px rgba(0, 0, 0, 0.45), 0 0 80px rgba(79, 124, 255, 0.12)",
      }}
    >
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl" style={{ background: "rgba(79, 124, 255, 0.20)" }} />
      <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full blur-3xl" style={{ background: "rgba(34, 211, 238, 0.12)" }} />

      <div className="relative rounded-2xl" style={{ background: "rgba(2, 6, 23, 0.48)", border: `1px solid ${palette.line}` }}>
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: palette.line }}>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: palette.danger }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: palette.warning }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: palette.success }} />
          </div>
          <div className="text-xs font-medium" style={{ color: palette.quiet }}>
            Sariva command center
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[180px_1fr]">
          <div className="border-b p-3 lg:border-b-0 lg:border-r" style={{ borderColor: palette.line }}>
            <div className="mb-3 px-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em]" style={{ color: palette.quiet }}>
              Workflows
            </div>
            {Object.entries(views).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className="mb-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition"
                style={{
                  background: active === key ? "rgba(79, 124, 255, 0.16)" : "transparent",
                  color: active === key ? palette.text : palette.muted,
                  border: active === key ? `1px solid ${palette.lineStrong}` : "1px solid transparent",
                }}
              >
                {item.label}
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: active === key ? palette.accent2 : "rgba(148, 163, 184, 0.4)" }} />
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <StatusPill tone={current.tone}>Live example</StatusPill>
                <h3 className="mt-3 text-xl font-semibold tracking-tight" style={{ color: palette.text }}>
                  {current.title}
                </h3>
              </div>
              <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ color: palette.success, background: "rgba(52, 211, 153, 0.12)" }}>
                RBAC checked
              </div>
            </div>

            <div className="mb-5 rounded-2xl p-4 font-mono text-sm" style={{ background: "rgba(15, 23, 42, 0.72)", border: `1px solid ${palette.line}` }}>
              <span style={{ color: palette.accent2 }}>›</span>{" "}
              <span style={{ color: palette.text }}>{current.command}</span>
            </div>

            <div className="space-y-3">
              {current.result.map(([label, value]) => (
                <div key={label} className="rounded-2xl p-4" style={{ background: "rgba(15, 27, 48, 0.72)", border: `1px solid ${palette.line}` }}>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: palette.quiet }}>
                    {label}
                  </div>
                  <div className="text-sm leading-6" style={{ color: palette.muted }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl p-4" style={{ background: "rgba(79, 124, 255, 0.12)", border: `1px solid ${palette.lineStrong}` }}>
              <div className="text-sm font-medium" style={{ color: palette.text }}>
                Recommended action
              </div>
              <p className="mt-1 text-sm leading-6" style={{ color: palette.muted }}>
                Open a GitOps pull request with the config change, validation checks, and rollback instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: palette.panel, border: `1px solid ${palette.line}` }}>
      <div className="text-2xl font-semibold tracking-tight" style={{ color: palette.text }}>
        {value}
      </div>
      <div className="mt-1 text-sm leading-6" style={{ color: palette.quiet }}>
        {label}
      </div>
    </div>
  );
}

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("ok");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <input
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setStatus("idle");
        }}
        type="email"
        placeholder="you@company.com"
        aria-label="Email address"
        className="min-h-12 flex-1 rounded-xl px-4 text-sm outline-none transition focus:ring-2"
        style={{
          background: "rgba(15, 23, 42, 0.72)",
          border: `1px solid ${palette.line}`,
          color: palette.text,
        }}
      />
      <button
        type="submit"
        className="min-h-12 rounded-xl px-5 text-sm font-semibold transition hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #4f7cff, #22d3ee)",
          color: "#ffffff",
          boxShadow: "0 18px 40px rgba(79, 124, 255, 0.28)",
        }}
      >
        Request early access
      </button>
      {status !== "idle" && (
        <p className="sm:hidden text-sm" style={{ color: status === "ok" ? palette.success : palette.danger }}>
          {status === "ok" ? "Thanks — we will be in touch." : "Please enter a valid email address."}
        </p>
      )}
    </form>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden" style={{ background: palette.bg, color: palette.text }}>
      <div className="pointer-events-none fixed inset-0 opacity-60" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(79,124,255,0.20), transparent 32rem), radial-gradient(circle at top right, rgba(34,211,238,0.12), transparent 28rem), linear-gradient(180deg, rgba(7,17,31,0) 0%, #07111f 80%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          }}
        />
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(7, 17, 31, 0.78)", borderBottom: `1px solid ${palette.line}` }}>
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#top" className="flex items-center gap-3">
              <PulseMark />
              <div>
                <div className="text-base font-semibold tracking-tight" style={{ color: palette.text }}>Sariva</div>
                <div className="hidden text-[0.68rem] uppercase tracking-[0.18em] sm:block" style={{ color: palette.quiet }}>
                  Streaming Ops AI
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm font-medium transition hover:text-white" style={{ color: palette.muted }}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href="https://docs.sariva.ai" target="_blank" rel="noreferrer" className="hidden text-sm font-medium transition hover:text-white sm:inline-flex" style={{ color: palette.muted }}>
                Docs ↗
              </a>
              <a
                href="#contact"
                className="rounded-xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                style={{
                  background: "rgba(79, 124, 255, 0.16)",
                  border: `1px solid ${palette.lineStrong}`,
                  color: palette.text,
                }}
              >
                Get early access
              </a>
            </div>
          </div>
        </Container>
      </header>

      <section id="top" className="relative z-10 pt-16 pb-20 sm:pt-20 lg:pb-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
            <div>
              <div className="mb-6 flex flex-wrap gap-3">
                <StatusPill>AI operator for Kafka & Flink</StatusPill>
                <StatusPill tone="green">Self-hosted in your VPC</StatusPill>
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl" style={{ color: palette.text }}>
                Operate streaming platforms with the judgment of a senior engineer.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 sm:text-xl" style={{ color: palette.muted }}>
                Sariva is an AI operations layer for Kafka, Flink, Confluent Cloud, and cloud-native streaming infrastructure. Ask questions, diagnose incidents, and ship safe GitOps changes from the tools your team already uses.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-xl px-5 py-3 text-center text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #4f7cff, #22d3ee)",
                    color: "#ffffff",
                    boxShadow: "0 18px 40px rgba(79, 124, 255, 0.30)",
                  }}
                >
                  Request early access
                </a>
                <a
                  href="#platform"
                  className="rounded-xl px-5 py-3 text-center text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{ background: "rgba(15, 27, 48, 0.72)", border: `1px solid ${palette.line}`, color: palette.text }}
                >
                  See platform overview
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                <MetricCard value="GitOps" label="for every production write" />
                <MetricCard value="RBAC" label="mapped to your identity model" />
                <MetricCard value="MCP" label="ready for agentic workflows" />
                <MetricCard value="VPC" label="deployment boundary" />
              </div>
            </div>

            <ProductConsole />
          </div>
        </Container>
      </section>

      <section id="platform" className="relative z-10 py-20" style={{ background: "rgba(11, 22, 40, 0.68)", borderTop: `1px solid ${palette.line}`, borderBottom: `1px solid ${palette.line}` }}>
        <Container>
          <SectionHeader eyebrow="Platform" title="Built for teams that run streaming infrastructure in production.">
            Sariva reduces operational toil by connecting runtime telemetry, infrastructure code, runbooks, and approval workflows into one controlled operating surface.
          </SectionHeader>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "One answer across many tools",
                body: "Confluent Cloud, self-managed Kafka, Flink, Kubernetes, Schema Registry, cloud networking, monitoring, and Git history are correlated into a single operational explanation.",
              },
              {
                title: "Runbooks that improve over time",
                body: "Known fixes become versioned playbooks. Sariva explains the exact evidence, confidence level, and action boundary before proposing a change.",
              },
              {
                title: "Production-safe by design",
                body: "Read-only operations are fast. Writes are explicit, reviewed, reversible, and shipped through your existing CI/CD control plane.",
              },
            ].map((item) => (
              <article key={item.title} className="sariva-card rounded-3xl p-6" style={{ background: palette.panel, border: `1px solid ${palette.line}` }}>
                <h3 className="text-xl font-semibold tracking-tight" style={{ color: palette.text }}>{item.title}</h3>
                <p className="mt-4 text-sm leading-7" style={{ color: palette.muted }}>{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="capabilities" className="relative z-10 py-20">
        <Container>
          <SectionHeader centered eyebrow="Capabilities" title="Observe, diagnose, and act from one conversation.">
            Sariva is not another dashboard. It is the operational layer that reads the dashboard, checks the runbook, and prepares the safe change.
          </SectionHeader>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {capabilityCards.map((card) => (
              <article key={card.title} className="sariva-card group rounded-3xl p-6" style={{ background: palette.panel, border: `1px solid ${palette.line}` }}>
                <div className="mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: palette.accent2, background: "rgba(34, 211, 238, 0.10)", border: `1px solid rgba(34, 211, 238, 0.22)` }}>
                  {card.eyebrow}
                </div>
                <h3 className="text-xl font-semibold tracking-tight" style={{ color: palette.text }}>{card.title}</h3>
                <p className="mt-4 text-sm leading-7" style={{ color: palette.muted }}>{card.body}</p>
                <div className="mt-6 space-y-2">
                  {card.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm" style={{ color: palette.muted }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.accent2 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="relative z-10 py-20" style={{ background: palette.bg2, borderTop: `1px solid ${palette.line}`, borderBottom: `1px solid ${palette.line}` }}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <SectionHeader eyebrow="How it works" title="Controlled automation, not black-box automation.">
              The product is intentionally conservative. Sariva gives fast answers for reads and governed pull requests for production writes.
            </SectionHeader>

            <div className="space-y-4">
              {workflow.map((item) => (
                <article key={item.step} className="sariva-card grid gap-5 rounded-3xl p-6 sm:grid-cols-[72px_1fr]" style={{ background: palette.panel, border: `1px solid ${palette.line}` }}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl font-mono text-sm font-semibold" style={{ background: "rgba(79, 124, 255, 0.14)", color: palette.accent2, border: `1px solid ${palette.lineStrong}` }}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight" style={{ color: palette.text }}>{item.title}</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: palette.muted }}>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 py-20">
        <Container>
          <SectionHeader centered eyebrow="Use cases" title="Common streaming operations, handled with context.">
            These are the recurring high-friction workflows Sariva is designed to compress from hours of manual diagnosis into minutes of guided operation.
          </SectionHeader>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map(([title, body]) => (
              <article key={title} className="sariva-card rounded-3xl p-6" style={{ background: palette.panel, border: `1px solid ${palette.line}` }}>
                <h3 className="text-lg font-semibold tracking-tight" style={{ color: palette.text }}>{title}</h3>
                <p className="mt-3 text-sm leading-7" style={{ color: palette.muted }}>{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="security" className="relative z-10 py-20" style={{ background: palette.bg2, borderTop: `1px solid ${palette.line}`, borderBottom: `1px solid ${palette.line}` }}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <SectionHeader eyebrow="Security & control" title="Designed for platform teams that own the blast radius.">
              Sariva is opinionated about operational safety: explicit scope, least privilege, reviewable writes, and complete traceability.
            </SectionHeader>

            <div className="grid gap-4 sm:grid-cols-2">
              {securityItems.map((item) => (
                <article key={item.title} className="sariva-card rounded-3xl p-6" style={{ background: palette.panel, border: `1px solid ${palette.line}` }}>
                  <div className="mb-4 h-2 w-10 rounded-full" style={{ background: "linear-gradient(90deg, #4f7cff, #22d3ee)" }} />
                  <h3 className="text-lg font-semibold tracking-tight" style={{ color: palette.text }}>{item.title}</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: palette.muted }}>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 py-20">
        <Container>
          <div className="sariva-card rounded-[2rem] p-8 sm:p-10 lg:p-12" style={{ background: "linear-gradient(135deg, rgba(79, 124, 255, 0.18), rgba(34, 211, 238, 0.10))", border: `1px solid ${palette.lineStrong}` }}>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.accent2 }}>Ecosystem fit</p>
                <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl" style={{ color: palette.text }}>
                  Works beside the platforms you already trust.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Confluent Cloud", "Confluent Platform", "Apache Kafka", "AWS MSK", "Apache Flink", "Tableflow + Iceberg", "GitHub / GitOps", "Slack / CLI / REST / MCP"].map((item) => (
                  <div key={item} className="sariva-soft-card rounded-2xl px-4 py-3 text-sm font-medium" style={{ background: "rgba(7, 17, 31, 0.42)", border: `1px solid ${palette.line}`, color: palette.muted }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="relative z-10 py-20" style={{ background: palette.bg2, borderTop: `1px solid ${palette.line}` }}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeader eyebrow="Contact" title="Bring Sariva into your streaming operations workflow.">
                We are onboarding design partners who run Kafka, Flink, Confluent Cloud, MSK, or hybrid streaming platforms and want safer operational automation.
              </SectionHeader>
              <NotifyForm />
              <p className="mt-4 hidden text-sm sm:block" style={{ color: palette.quiet }}>
                Or email <a className="underline decoration-white/30 underline-offset-4 hover:text-white" href="mailto:hello@sariva.ai">hello@sariva.ai</a>.
              </p>
            </div>

            <div className="sariva-card rounded-3xl p-6" style={{ background: palette.panel, border: `1px solid ${palette.line}` }}>
              <h3 className="text-xl font-semibold tracking-tight" style={{ color: palette.text }}>Best fit for</h3>
              <div className="mt-5 space-y-4">
                {[
                  "Platform teams supporting business-critical Kafka and Flink workloads",
                  "Confluent Cloud or MSK migrations where repeatable runbooks matter",
                  "Teams standardizing Terraform-backed topic, ACL, connector, and Flink operations",
                  "SRE teams that need incident diagnosis with a safe path to action",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-7" style={{ color: palette.muted }}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: palette.success }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <footer className="relative z-10 border-t py-8" style={{ background: palette.bg, borderColor: palette.line }}>
        <Container>
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <PulseMark />
              <div>
                <div className="font-semibold tracking-tight" style={{ color: palette.text }}>Sariva</div>
                <div className="text-xs" style={{ color: palette.quiet }}>AI operations layer for streaming infrastructure</div>
              </div>
            </div>
            <div className="text-sm" style={{ color: palette.quiet }}>
              © {new Date().getFullYear()} Sariva Inc. · Ontario, Canada
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
