import type { ReactNode } from "react";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Use cases", href: "#use-cases" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Contact", href: "#contact" },
];

const metrics = [
  ["5 surfaces", "Slack, CLI, REST, MCP, GitOps"],
  ["8 controls", "Scope, RBAC, audit, review, rollback"],
  ["0 long-lived", "Cloud credentials inside Sariva"],
  ["VPC first", "Self-hosted deployment model"],
];

const capabilities = [
  {
    title: "Observe every streaming signal",
    text: "Consumer lag, partition skew, broker health, connector state, Schema Registry compatibility, Flink checkpoints, Tableflow sync, and cloud networking in one operational answer.",
    tag: "Observe",
  },
  {
    title: "Diagnose incidents with evidence",
    text: "Sariva correlates telemetry, runbooks, Git history, and platform topology to explain the likely root cause before suggesting the next action.",
    tag: "Diagnose",
  },
  {
    title: "Ship controlled GitOps changes",
    text: "Write actions become pull requests with Terraform diffs, rationale, rollback notes, and audit metadata. Your CI/CD applies the change, not the chatbot.",
    tag: "Act",
  },
];

const useCases = [
  ["Consumer lag spike", "Find hot partitions, slow consumers, offset drift, and throughput changes without jumping through five dashboards."],
  ["Flink job instability", "Correlate restart loops with checkpoint failures, memory pressure, backpressure, and input topic spikes."],
  ["PrivateLink failure", "Trace DNS, endpoint services, NLB targets, security groups, and Confluent network attachments in order."],
  ["Schema break", "Identify the incompatible field, impacted consumers, registered versions, and the safest migration sequence."],
  ["MSK → Confluent Cloud", "Generate topic mapping, replication plan, validation gates, cutover tasks, and rollback path."],
  ["Connector onboarding", "Prepare connector Terraform, IAM/RBAC dependencies, DLQ policy, and operational checks."],
  ["Topic and ACL operations", "Create governed topic, ACL, retention, and partition changes through reviewable infrastructure code."],
  ["Tableflow + Iceberg ops", "Monitor sync health, schema evolution, table freshness, and operational failure patterns."],
];

const security = [
  "Self-hosted in your VPC",
  "Explicit environment registration",
  "RBAC mapped to identity groups",
  "GitOps pull-request workflow",
  "No long-lived cloud credentials",
  "Structured audit logs",
  "Runbook-backed recommendations",
  "Rollback notes for write actions",
];

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`sariva-container ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-cyan-300/90">
      {children}
    </p>
  );
}

function SectionHeader({ eyebrow, title, children, center = false }: { eyebrow: string; title: string; children: ReactNode; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{children}</p>
    </div>
  );
}

function LogoMark() {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 ring-1 ring-blue-300/25 sariva-glow">
      <span className="absolute h-6 w-6 rounded-full border border-cyan-300/30" />
      <span className="absolute h-3.5 w-3.5 rounded-full border border-blue-200/45" />
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.8)]" />
    </span>
  );
}

function Pill({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "cyan" }) {
  const tones = {
    blue: "border-blue-300/25 bg-blue-500/12 text-blue-100",
    green: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
    cyan: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function CommandPanel() {
  return (
    <div className="sariva-card relative overflow-hidden rounded-[2rem] p-4">
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/50">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="font-mono text-xs text-slate-400">sariva / production</div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="rounded-2xl border border-blue-300/20 bg-blue-500/10 p-4">
            <div className="font-mono text-xs text-cyan-200">@sariva why is fraud-detector restarting?</div>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["Signal", "3 restarts in 15 minutes · checkpoint duration +280%"],
              ["Root cause", "TaskManager OOM during payment-events spike"],
              ["Fix", "Open PR: raise memory 4GB → 6GB with rollback"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</div>
                <div className="mt-1 text-sm font-medium leading-6 text-slate-100">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Pill tone="green">Healthy rollout path</Pill>
            <Pill tone="cyan">GitOps PR ready</Pill>
            <Pill>RBAC checked</Pill>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="sariva-shell min-h-screen overflow-hidden text-slate-100">
      <div className="sariva-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[780px]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06101f]/78 backdrop-blur-xl">
        <Container>
          <div className="flex h-20 items-center justify-between gap-6">
            <a href="#top" className="flex items-center gap-3">
              <LogoMark />
              <div>
                <div className="font-display text-lg font-extrabold tracking-[-0.03em] text-white">Sariva</div>
                <div className="hidden text-xs text-slate-500 sm:block">AI operations layer</div>
              </div>
            </a>
            <nav className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm font-semibold text-slate-300 transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
            <a href="#contact" className="rounded-2xl border border-blue-300/25 bg-blue-500/15 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500/25">
              Get early access
            </a>
          </div>
        </Container>
      </header>

      <section id="top" className="relative z-10 py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="mb-6 flex flex-wrap gap-3">
                <Pill>Kafka & Flink AI operator</Pill>
                <Pill tone="green">Enterprise-safe GitOps</Pill>
                <Pill tone="cyan">Self-hosted in your VPC</Pill>
              </div>
              <h1 className="max-w-5xl text-5xl font-extrabold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Operate streaming infrastructure with confidence, speed, and control.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Sariva gives platform teams an AI operations layer for Kafka, Flink, Confluent Cloud, MSK, and cloud-native streaming platforms — turning incidents, runbooks, and GitOps changes into one governed workflow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-center text-sm font-extrabold text-white shadow-[0_22px_70px_rgba(50,103,255,0.34)] transition hover:-translate-y-0.5">
                  Request early access
                </a>
                <a href="#platform" className="rounded-2xl border border-white/12 bg-white/[0.045] px-6 py-3.5 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.07]">
                  View platform
                </a>
              </div>
              <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                {metrics.map(([value, label]) => (
                  <div key={value} className="sariva-card-soft rounded-2xl p-4">
                    <div className="font-display text-xl font-extrabold text-white">{value}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <CommandPanel />
          </div>
        </Container>
      </section>

      <section id="platform" className="relative z-10 border-y border-white/10 bg-[#081426]/80 py-20">
        <Container>
          <SectionHeader eyebrow="Platform" title="A production operations layer, not another dashboard.">
            Sariva connects live telemetry, Kafka/Flink expertise, cloud runbooks, Git history, and approval workflows so teams can move faster without bypassing control.
          </SectionHeader>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {capabilities.map((item) => (
              <article key={item.title} className="sariva-card rounded-[1.7rem] p-7">
                <div className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                  {item.tag}
                </div>
                <h3 className="text-2xl font-extrabold leading-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="use-cases" className="relative z-10 py-20">
        <Container>
          <SectionHeader center eyebrow="Use cases" title="Built around the moments that slow platform teams down.">
            The site should feel like an enterprise product because the product is aimed at production owners: Kafka admins, platform engineers, SRE teams, and cloud infrastructure leads.
          </SectionHeader>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map(([title, body]) => (
              <article key={title} className="sariva-card rounded-[1.6rem] p-5">
                <h3 className="text-lg font-extrabold leading-tight text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="relative z-10 border-y border-white/10 bg-[#081426]/80 py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeader eyebrow="How it works" title="Fast answers for reads. Governed pull requests for writes.">
              Sariva is intentionally conservative. It helps teams diagnose quickly, then routes production changes through the systems they already trust.
            </SectionHeader>
            <div className="space-y-4">
              {[
                ["01", "Register scope", "Connect only the clusters, topics, Flink jobs, repositories, observability sources, and runbook domains Sariva is allowed to access."],
                ["02", "Ask naturally", "Use Slack, CLI, REST, or MCP while Sariva translates operational intent into Kafka, Flink, cloud, and GitOps context."],
                ["03", "Approve safely", "Read answers return with evidence. Write actions become PRs with diffs, rationale, RBAC checks, and rollback notes."],
              ].map(([step, title, body]) => (
                <article key={step} className="sariva-card grid gap-5 rounded-[1.7rem] p-6 sm:grid-cols-[74px_1fr]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/25 bg-blue-500/15 font-mono text-sm font-bold text-cyan-200">
                    {step}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="security" className="relative z-10 py-20">
        <Container>
          <div className="sariva-card rounded-[2.2rem] p-8 sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <SectionHeader eyebrow="Security & control" title="Enterprise authority without looking heavy or old.">
                The deep navy background carries the authority and scale energy; the royal blue, cyan, and green accents carry movement, progress, and growth.
              </SectionHeader>
              <div className="grid gap-3 sm:grid-cols-2">
                {security.map((item) => (
                  <div key={item} className="sariva-card-soft flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="relative z-10 border-t border-white/10 bg-[#081426]/90 py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Launch Sariva with a stronger enterprise first impression.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                The next deployment should only change the visual layer and copy. Package files should remain untouched so Vercel continues using the known-good pnpm setup.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="mailto:hello@sariva.ai" className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-center text-sm font-extrabold text-white transition hover:-translate-y-0.5">
                  hello@sariva.ai
                </a>
                <a href="mailto:sales@sariva.ai" className="rounded-2xl border border-white/12 bg-white/[0.045] px-6 py-3.5 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.07]">
                  sales@sariva.ai
                </a>
              </div>
            </div>
            <div className="sariva-card rounded-[1.8rem] p-7">
              <h3 className="text-2xl font-extrabold text-white">Best fit</h3>
              <div className="mt-5 space-y-4">
                {[
                  "Kafka, Flink, Confluent Cloud, or MSK platform teams",
                  "SRE teams that need diagnosis plus a safe path to action",
                  "Organizations standardizing Terraform-backed streaming operations",
                  "Migration programs where repeatable runbooks and auditability matter",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8">
        <Container>
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <LogoMark />
              <div>
                <div className="font-display font-extrabold text-white">Sariva</div>
                <div className="text-xs text-slate-500">AI operations layer for streaming infrastructure</div>
              </div>
            </div>
            <div className="text-sm text-slate-500">© 2026 Sariva Inc. · Ontario, Canada</div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
