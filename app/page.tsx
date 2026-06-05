import type { CSSProperties, ReactNode } from "react";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Patterns", href: "#patterns" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "Integrations", href: "#integrations" },
  { label: "Docs", href: "https://sariva.mintlify.app/", external: true },
  { label: "Contact", href: "#contact" },
];

const metrics = [
  ["5 access paths", "Slack, CLI, REST, MCP, GitOps"],
  ["8 control points", "RBAC, scope, audit, review, rollback"],
  ["0 standing keys", "Cloud credentials stay outside Sariva"],
  ["VPC-first", "Runs inside your boundary"],
];

const platformCards = [
  {
    tag: "Observe",
    title: "One operational view across Kafka and Flink",
    text: "Correlate consumer lag, broker health, connector status, Schema Registry compatibility, Flink checkpoints, Kubernetes state, and cloud telemetry into one answer.",
  },
  {
    tag: "Diagnose",
    title: "Root cause with evidence, not dashboard hunting",
    text: "Sariva connects symptoms to runbooks, Git history, infrastructure topology, and production context so teams understand why an incident is happening.",
  },
  {
    tag: "Act",
    title: "Safe change execution through GitOps",
    text: "Write actions become reviewed pull requests with Terraform diffs, RBAC checks, rationale, validation steps, and rollback notes before anything changes.",
  },
];

const rotatingExamples = [
  {
    category: "Kafka operations",
    title: "Consumer lag spike",
    prompt: "@sariva why is orders-consumer behind?",
    signal: "Lag +82k on two hot partitions · consumer CPU 94% · broker ISR healthy",
    action: "Scale the consumer deployment by two pods, verify assignment balance, and open a rollback-ready PR.",
    outcome: "Faster triage without jumping between Kafka, Kubernetes, and dashboards.",
  },
  {
    category: "Flink operations",
    title: "Job restart loop",
    prompt: "@sariva explain fraud-detector restarts",
    signal: "3 restarts in 15 minutes · checkpoint duration +280% · TaskManager OOM",
    action: "Increase process memory, validate checkpoint recovery, and attach evidence to the GitOps change.",
    outcome: "Operational fix with root-cause context and rollback instructions.",
  },
  {
    category: "Schema governance",
    title: "Compatibility failure",
    prompt: "@sariva why did schema registration fail?",
    signal: "New required field without default · impacted consumers found in prod group metadata",
    action: "Generate a backward-compatible schema update and produce the safe rollout sequence.",
    outcome: "Reduced producer/consumer breakage during schema evolution.",
  },
  {
    category: "Observability",
    title: "Cross-signal incident view",
    prompt: "@sariva summarize the checkout latency spike",
    signal: "p95 latency +410ms · broker network out +62% · connector retries started after deploy",
    action: "Correlate dashboards, logs, metrics, and deployment history into a single incident timeline.",
    outcome: "One evidence-backed explanation instead of manual dashboard hunting.",
  },
  {
    category: "Deployment agents",
    title: "Agent rollout drift",
    prompt: "@sariva check deployment agents in enterprise-prod",
    signal: "2 agents on old image · 1 missing heartbeat · RBAC policy version mismatch",
    action: "Create a staged upgrade plan, validate health checks, and prepare the GitOps PR.",
    outcome: "Safer agent operations across clusters, environments, and customer VPCs.",
  },
  {
    category: "Cloud networking",
    title: "PrivateLink path failure",
    prompt: "@sariva trace client connection failures to prod Kafka",
    signal: "DNS resolves · endpoint service accepted · NLB target unhealthy in one AZ",
    action: "Map the full path and isolate the failing network component before client rollback.",
    outcome: "Clear ownership across app, network, AWS, and Confluent teams.",
  },
];

const useCases = [
  ["Consumer lag spike", "Find hot partitions, slow consumers, offset drift, and throughput changes without jumping through five dashboards."],
  ["Flink job instability", "Correlate restart loops with checkpoint failures, memory pressure, backpressure, and input topic spikes."],
  ["Observability correlation", "Unify metrics, logs, traces, deployment events, topology, and runbooks into one operational explanation."],
  ["Deployment agent rollout", "Track agent health, image versions, RBAC scope, heartbeat status, and staged upgrade safety."],
  ["PrivateLink failure", "Trace DNS, endpoint services, NLB targets, security groups, and Confluent network attachments in order."],
  ["Schema break", "Identify the incompatible field, impacted consumers, registered versions, and the safest migration sequence."],
  ["MSK → Confluent Cloud", "Generate topic mapping, replication plan, validation gates, cutover tasks, and rollback path."],
  ["Connector onboarding", "Prepare connector Terraform, IAM/RBAC dependencies, DLQ policy, and operational checks."],
];

const supportedClients = [
  ["Slack", "Primary collaboration interface for questions, approvals, updates, and alert notifications."],
  ["CLI", "Operator workflow for setup, validation, diagnostics, and controlled platform actions."],
  ["REST API", "Programmatic access for platform workflows, dashboards, and automation systems."],
  ["MCP", "AI-native interface for tools and assistants that need governed Sariva context."],
];

const integrations = [
  ["GitHub Actions", "GitOps execution path for Terraform applies and workflow status."],
  ["Confluent Cloud", "Cloud metrics, Kafka topics, consumer groups, connectors, and metadata insight."],
  ["Amazon EKS", "Self-hosted Sariva runtime with customer-controlled network and IAM boundary."],
  ["Amazon CloudWatch", "Application logs, metrics, alarms, traces, and service health signals."],
  ["Amazon S3", "Terraform remote state storage for the AWS reference pattern."],
  ["Amazon DynamoDB", "Terraform state locking and deployment coordination."],
  ["PagerDuty", "Incident escalation and on-call routing for alert workflows."],
  ["Application services", "Registered app telemetry, health, logs, and operational context."],
];

const nearScope = [
  ["More deployment patterns", "Additional AWS, Azure, GCP, MSK, Kubernetes, and Confluent Cloud reference patterns can be added as separate cards without changing the page structure."],
  ["More observability sources", "The pattern is ready for Datadog, New Relic, Dynatrace, Prometheus, Grafana, Loki, and customer-specific telemetry sources."],
  ["More Git providers", "GitHub is the current reference path; GitLab and Bitbucket can be shown as roadmap integrations when supported."],
  ["More incident workflows", "Slack and PagerDuty are shown now; Opsgenie, ServiceNow, Teams, and email routing can be added later."],
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
    <p className="mb-3 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-cyan-300/90">
      {children}
    </p>
  );
}

function SectionHeader({ eyebrow, title, children, center = false }: { eyebrow: string; title: string; children: ReactNode; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-2xl font-extrabold leading-[1.14] text-white sm:text-3xl lg:text-[2.2rem]">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{children}</p>
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
    <div className="sariva-card relative overflow-hidden rounded-[1.75rem] p-4">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/55">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="font-mono text-[0.7rem] text-slate-400">sariva / prod</div>
        </div>
        <div className="p-5">
          <div className="rounded-2xl border border-blue-300/20 bg-blue-500/10 p-4">
            <div className="font-mono text-xs leading-6 text-cyan-200">@sariva why is fraud-detector restarting?</div>
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Signal", "3 restarts in 15 minutes · checkpoint duration +280%"],
              ["Root cause", "TaskManager OOM during payment-events spike"],
              ["Action", "Open GitOps PR with memory change and rollback"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</div>
                <div className="mt-1 text-sm font-medium leading-6 text-slate-100">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Pill tone="green">Healthy path</Pill>
            <Pill tone="cyan">PR ready</Pill>
            <Pill>RBAC checked</Pill>
          </div>
        </div>
      </div>
    </div>
  );
}

function RotatingExamples() {
  return (
    <div className="sariva-example-stage mt-10">
      <div className="sariva-example-viewport">
        {rotatingExamples.map((item, index) => (
          <article key={item.title} className="sariva-example-card rounded-[1.6rem] p-5 sm:p-6" style={{ "--card-index": index } as CSSProperties}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full border border-blue-300/25 bg-blue-500/12 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-blue-100">
                {item.category}
              </span>
              <span className="sariva-card-arrow text-cyan-300">→</span>
            </div>
            <h3 className="mt-5 text-xl font-extrabold leading-tight text-white sm:text-2xl">{item.title}</h3>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/45 p-4 font-mono text-xs leading-6 text-cyan-100">
              {item.prompt}
            </div>
            <div className="mt-5 grid gap-4 text-sm leading-6 sm:grid-cols-2">
              <div>
                <div className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-slate-500">Signal</div>
                <p className="mt-1 text-slate-300">{item.signal}</p>
              </div>
              <div>
                <div className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-slate-500">Recommended action</div>
                <p className="mt-1 text-slate-200">{item.action}</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-300/18 bg-emerald-300/8 p-4 text-sm font-semibold leading-6 text-emerald-100">
              {item.outcome}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {rotatingExamples.map((item, index) => (
          <div key={item.title} className="sariva-example-chip rounded-2xl px-3 py-3" style={{ "--chip-index": index } as CSSProperties}>
            <div className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-cyan-200/80">{item.category}</div>
            <div className="mt-1 text-xs font-bold leading-5 text-slate-200">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


function ArchitecturePattern() {
  return (
    <div className="sariva-architecture mt-10 rounded-[2rem] p-5 sm:p-7 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-cyan-200">
            Reference architecture
          </div>
          <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-white sm:text-3xl">
            Deploy through GitOps. Observe through Sariva. Operate with governed context.
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Sariva fits into the customer runtime without replacing the deployment pipeline. GitHub Actions applies infrastructure changes, while Sariva provides workflow visibility, observability context, Kafka metadata, and incident routing.
          </p>

          <div className="mt-6 grid gap-3">
            {[
              ["Deployment stays in GitHub Actions", "Terraform apply runs through the customer-controlled CI/CD path."],
              ["Sariva provides operational intelligence", "Read cloud metrics, topics, consumer groups, app telemetry, and CloudWatch signals."],
              ["Teams work where they already are", "Slack, UI, API, and PagerDuty integrations support daily operations and incident response."],
            ].map(([title, body]) => (
              <div key={title} className="sariva-marketing-point rounded-2xl p-4">
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sariva-marketing-diagram rounded-[1.6rem] p-4 sm:p-5">
          <svg className="sariva-marketing-svg" viewBox="0 0 980 560" role="img" aria-label="Sariva reference architecture overview diagram">
            <defs>
              <linearGradient id="mPanel" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#112443" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#07111f" stopOpacity="0.98" />
              </linearGradient>
              <filter id="mBlueGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#3b82f6" floodOpacity="0.28" />
              </filter>
              <filter id="mCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#22d3ee" floodOpacity="0.25" />
              </filter>
              <filter id="mPurpleGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#a855f7" floodOpacity="0.25" />
              </filter>
              <marker id="mArrowBlueSmall" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#60a5fa" />
              </marker>
              <marker id="mArrowCyanSmall" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#22d3ee" />
              </marker>
              <marker id="mArrowSlateSmall" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
              </marker>
              <pattern id="mGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#94a3b8" strokeOpacity="0.055" strokeWidth="1" />
              </pattern>
            </defs>

            <rect x="8" y="8" width="964" height="544" rx="30" fill="#020817" opacity="0.55" />
            <rect x="8" y="8" width="964" height="544" rx="30" fill="url(#mGrid)" />
            <rect x="8" y="8" width="964" height="544" rx="30" fill="none" stroke="#60a5fa" strokeOpacity="0.20" />

            <text x="490" y="58" textAnchor="middle" className="m-kicker">Architecture overview</text>
            <text x="490" y="88" textAnchor="middle" className="m-heading">GitOps deployment with governed streaming operations</text>

            <rect x="70" y="206" width="170" height="156" rx="24" fill="url(#mPanel)" stroke="#60a5fa" strokeOpacity="0.42" />
            <rect x="102" y="228" width="76" height="26" rx="13" fill="#1d4ed8" fillOpacity="0.18" stroke="#60a5fa" strokeOpacity="0.38" />
            <text x="140" y="246" textAnchor="middle" className="m-pill">GitOps</text>
            <circle cx="155" cy="288" r="29" fill="#1e3a8a" fillOpacity="0.25" stroke="#60a5fa" strokeOpacity="0.50" />
            <text x="155" y="298" textAnchor="middle" className="m-icon">GH</text>
            <text x="155" y="338" textAnchor="middle" className="m-title">GitHub Actions</text>
            <text x="155" y="358" textAnchor="middle" className="m-small">Terraform apply</text>

            <rect x="365" y="168" width="250" height="224" rx="28" fill="url(#mPanel)" stroke="#22d3ee" strokeOpacity="0.44" filter="url(#mCyanGlow)" />
            <rect x="420" y="194" width="118" height="26" rx="13" fill="#155e75" fillOpacity="0.20" stroke="#22d3ee" strokeOpacity="0.34" />
            <text x="479" y="212" textAnchor="middle" className="m-pill">Customer VPC</text>
            <text x="490" y="270" textAnchor="middle" className="m-title-large">Sariva</text>
            <text x="490" y="298" textAnchor="middle" className="m-body">AI operations layer</text>

            <rect x="393" y="330" width="92" height="48" rx="14" fill="#021827" stroke="#22d3ee" strokeOpacity="0.40" />
            <text x="439" y="352" textAnchor="middle" className="m-small-strong">Observe</text>
            <text x="439" y="370" textAnchor="middle" className="m-micro">signals</text>

            <rect x="497" y="330" width="92" height="48" rx="14" fill="#110f28" stroke="#a855f7" strokeOpacity="0.40" />
            <text x="543" y="352" textAnchor="middle" className="m-small-strong">Govern</text>
            <text x="543" y="370" textAnchor="middle" className="m-micro">PRs + audit</text>

            <rect x="742" y="206" width="170" height="156" rx="24" fill="url(#mPanel)" stroke="#a855f7" strokeOpacity="0.50" filter="url(#mPurpleGlow)" />
            <rect x="768" y="228" width="118" height="26" rx="13" fill="#581c87" fillOpacity="0.22" stroke="#a855f7" strokeOpacity="0.35" />
            <text x="827" y="246" textAnchor="middle" className="m-pill">Managed streaming</text>
            <circle cx="827" cy="288" r="31" fill="#083344" stroke="#22d3ee" strokeOpacity="0.58" filter="url(#mCyanGlow)" />
            <text x="827" y="298" textAnchor="middle" className="m-icon">CC</text>
            <text x="827" y="338" textAnchor="middle" className="m-title">Confluent Cloud</text>
            <text x="827" y="358" textAnchor="middle" className="m-small">Kafka metrics + metadata</text>

            <rect x="326" y="444" width="108" height="46" rx="14" fill="url(#mPanel)" stroke="#34d399" strokeOpacity="0.34" />
            <text x="380" y="464" textAnchor="middle" className="m-small-strong">Apps</text>
            <text x="380" y="481" textAnchor="middle" className="m-micro">telemetry</text>

            <rect x="462" y="444" width="108" height="46" rx="14" fill="url(#mPanel)" stroke="#f472b6" strokeOpacity="0.34" />
            <text x="516" y="464" textAnchor="middle" className="m-small-strong">CloudWatch</text>
            <text x="516" y="481" textAnchor="middle" className="m-micro">logs + alarms</text>

            <rect x="598" y="444" width="122" height="46" rx="14" fill="url(#mPanel)" stroke="#a855f7" strokeOpacity="0.34" />
            <text x="659" y="464" textAnchor="middle" className="m-small-strong">Slack + PagerDuty</text>
            <text x="659" y="481" textAnchor="middle" className="m-micro">incident routing</text>

            <path d="M 240 245 C 330 130, 660 130, 742 245" className="m-line-deploy" markerEnd="url(#mArrowBlueSmall)" />
            <text x="490" y="144" textAnchor="middle" className="m-line-blue">deploy / apply</text>

            <path d="M 365 278 C 322 278, 286 278, 246 278" className="m-line-status" markerEnd="url(#mArrowSlateSmall)" />
            <text x="304" y="258" textAnchor="middle" className="m-line">workflow status</text>

            <path d="M 615 278 C 660 278, 700 278, 736 278" className="m-line-read" markerEnd="url(#mArrowCyanSmall)" />
            <text x="676" y="258" textAnchor="middle" className="m-line-cyan">read metrics</text>

            <path d="M 438 392 L 386 440" className="m-line-support" markerEnd="url(#mArrowCyanSmall)" />
            <path d="M 490 392 L 516 440" className="m-line-support" markerEnd="url(#mArrowCyanSmall)" />
            <path d="M 544 392 L 648 440" className="m-line-alert" markerEnd="url(#mArrowSlateSmall)" />

            <rect x="70" y="430" width="190" height="74" rx="18" fill="#07111f" stroke="#60a5fa" strokeOpacity="0.20" />
            <line x1="92" y1="456" x2="132" y2="456" className="m-line-deploy" markerEnd="url(#mArrowBlueSmall)" />
            <text x="145" y="461" className="m-micro">Deployment path</text>
            <line x1="92" y1="484" x2="132" y2="484" className="m-line-read" markerEnd="url(#mArrowCyanSmall)" />
            <text x="145" y="489" className="m-micro">Read path</text>
          </svg>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {[
          ["State backend", "S3 remote state and DynamoDB locking support safe Terraform workflows."],
          ["GitHub watcher", "Sariva tracks PRs, workflow runs, apply status, and deployment completion."],
          ["Kafka insight", "Read cloud metrics, topics, consumer groups, lag, and Kafka metadata."],
          ["Incident response", "Slack and PagerDuty integrations help route operational events."],
        ].map(([title, body]) => (
          <div key={title} className="sariva-arch-benefit rounded-2xl p-4">
            <strong>{title}</strong>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientIcon({ index }: { index: number }) {
  const icons = [
    (
      <svg key="slack" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4v7M4 7h7M17 20v-7M13 17h7" />
      </svg>
    ),
    (
      <svg key="cli" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16v10H4z" />
        <path d="M7 10l2 2-2 2M12 15h5" />
      </svg>
    ),
    (
      <svg key="api" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
        <path d="M14 5l-4 14" />
      </svg>
    ),
    (
      <svg key="mcp" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4v16M4 12h16" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="4" r="1.5" />
        <circle cx="12" cy="20" r="1.5" />
        <circle cx="4" cy="12" r="1.5" />
        <circle cx="20" cy="12" r="1.5" />
      </svg>
    ),
    (
      <svg key="gitops" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="7" cy="7" r="3" />
        <circle cx="17" cy="17" r="3" />
        <path d="M10 7h3a4 4 0 014 4v3" />
      </svg>
    ),
    (
      <svg key="web" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="12" rx="2" />
        <path d="M8 20h8M12 17v3" />
      </svg>
    ),
    (
      <svg key="obs" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 14h3l2-6 4 10 2-6h5" />
      </svg>
    ),
    (
      <svg key="cloud" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 18h10a4 4 0 00.5-7.97A6 6 0 006 9.5 4.5 4.5 0 007 18z" />
      </svg>
    ),
  ];

  return <div className="sariva-client-icon">{icons[index % icons.length]}</div>;
}

function IntegrationIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  if (normalized.includes("github")) {
    return (
      <div className="sariva-integration-icon github" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M9 19c-4 1.5-4-2-5-2.5M15 22v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.8-1.4 5.8-6.2A4.8 4.8 0 0019 7c.1-.4.6-1.8-.1-3.4 0 0-1.1-.3-3.5 1.3a12 12 0 00-6.4 0C6.6 3.3 5.5 3.6 5.5 3.6 4.8 5.2 5.3 6.6 5.4 7A4.8 4.8 0 004 10.4c0 4.8 3 5.9 5.8 6.2-.4.4-.6.8-.7 1.5V22" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("confluent")) {
    return (
      <div className="sariva-integration-icon confluent" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="7" />
          <path d="M12 5v14M5 12h14M7.8 7.8l8.4 8.4M16.2 7.8l-8.4 8.4" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("eks")) {
    return (
      <div className="sariva-integration-icon aws" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 3l7.5 4.3v8.6L12 20.2l-7.5-4.3V7.3L12 3z" />
          <path d="M12 7v10M8.5 9l7 6M15.5 9l-7 6" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("cloudwatch")) {
    return (
      <div className="sariva-integration-icon aws" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 16h3l2-7 4 10 2-6h5" />
          <path d="M4 5h16v14H4z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("s3")) {
    return (
      <div className="sariva-integration-icon aws" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M6 8c0-1.7 12-1.7 12 0v8c0 1.7-12 1.7-12 0V8z" />
          <path d="M6 8c0 1.7 12 1.7 12 0M6 12c0 1.7 12 1.7 12 0" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("dynamodb")) {
    return (
      <div className="sariva-integration-icon aws" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h6" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("slack")) {
    return (
      <div className="sariva-integration-icon slack" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M8 4v8M4 8h8M16 20v-8M12 16h8" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("pagerduty")) {
    return (
      <div className="sariva-integration-icon pagerduty" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M7 20V4h6.5a4.8 4.8 0 010 9.6H11V20" />
        </svg>
      </div>
    );
  }

  return (
    <div className="sariva-integration-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 4v16M4 12h16" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  );
}

function IntegrationsAndScope() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="sariva-card rounded-[1.7rem] p-6">
        <h3 className="text-xl font-extrabold text-white">Supported clients and integrations</h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {supportedClients.map(([title, body], index) => (
            <div key={title} className="sariva-client-card rounded-2xl p-4">
              <ClientIcon index={index} />
              <div>
                <div className="font-extrabold text-white">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {integrations.map(([title, body]) => (
            <div key={title} className="sariva-integration-card rounded-2xl p-4">
              <IntegrationIcon title={title} />
              <div>
                <div className="text-sm font-extrabold text-slate-100">{title}</div>
                <p className="mt-1 text-xs leading-5 text-slate-400">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sariva-section-panel rounded-[1.7rem] p-6">
        <h3 className="text-xl font-extrabold text-white">Near-term expansion scope</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          The landing page is structured so new deployment patterns and integrations can be added without redesigning the whole site.
        </p>
        <div className="mt-6 space-y-3">
          {nearScope.map(([title, body]) => (
            <div key={title} className="sariva-card-soft rounded-2xl p-4">
              <div className="text-sm font-extrabold text-white">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="sariva-shell min-h-screen overflow-hidden text-slate-100">
      <div className="sariva-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[720px]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06101f]/80 backdrop-blur-xl">
        <Container>
          <div className="flex h-[4.5rem] items-center justify-between gap-5">
            <a href="#top" className="flex items-center gap-3">
              <LogoMark />
              <div>
                <div className="font-display text-lg font-extrabold tracking-[-0.02em] text-white">Sariva</div>
                <div className="hidden text-xs text-slate-500 sm:block">AI operations layer</div>
              </div>
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="text-sm font-semibold text-slate-300 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a href="#contact" className="rounded-xl border border-blue-300/25 bg-blue-500/15 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500/25">
              Get early access
            </a>
          </div>
        </Container>
      </header>

      <section id="top" className="relative z-10 py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="mb-5 flex flex-wrap gap-3">
                <Pill>Kafka & Flink AI operator</Pill>
                <Pill tone="green">Enterprise-safe GitOps</Pill>
                <Pill tone="cyan">Self-hosted in your VPC</Pill>
              </div>
              <h1 className="max-w-4xl text-[2.35rem] font-extrabold leading-[1.04] text-white sm:text-[3rem] lg:text-[3.55rem]">
                Operate streaming infrastructure with confidence and control.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Sariva gives platform teams an AI operations layer for Kafka, Flink, Confluent Cloud, MSK, and cloud-native streaming platforms — turning incidents, runbooks, and GitOps changes into one governed workflow.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-center text-sm font-extrabold text-white shadow-[0_18px_54px_rgba(50,103,255,0.30)] transition hover:-translate-y-0.5">
                  Request early access
                </a>
                <a href="#platform" className="rounded-xl border border-white/12 bg-white/[0.045] px-6 py-3.5 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.07]">
                  View platform
                </a>
              </div>
              <div className="mt-9 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                {metrics.map(([value, label]) => (
                  <div key={value} className="sariva-card-soft rounded-2xl p-4">
                    <div className="font-display text-lg font-extrabold text-white">{value}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <CommandPanel />
          </div>
        </Container>
      </section>

      <section id="platform" className="relative z-10 py-14 sm:py-16">
        <Container>
          <div className="sariva-section-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <SectionHeader eyebrow="Platform" title="A controlled operations layer, not another dashboard.">
              Sariva connects live telemetry, Kafka/Flink expertise, cloud runbooks, Git history, and approval workflows so teams can move faster without bypassing control.
            </SectionHeader>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {platformCards.map((item) => (
                <article key={item.title} className="sariva-card rounded-[1.45rem] p-6">
                  <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyan-200">
                    {item.tag}
                  </div>
                  <h3 className="text-xl font-extrabold leading-tight text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="patterns" className="relative z-10 py-14 sm:py-16">
        <Container>
          <SectionHeader center eyebrow="Reference patterns" title="Designed for real deployment and observability paths.">
            Start with the AWS reference pattern, then expand the same section later with additional deployment models and integrations as Sariva grows.
          </SectionHeader>
          <ArchitecturePattern />
        </Container>
      </section>

      <section id="scenarios" className="relative z-10 py-14 sm:py-16">
        <Container>
          <SectionHeader center eyebrow="Operational scenarios" title="Real production questions, answered with evidence.">
            Each scenario shows how a platform team can ask a practical operations question, review the relevant signals, understand the impact, and move toward a safe, auditable resolution.
          </SectionHeader>
          <RotatingExamples />
        </Container>
      </section>

      <section id="use-cases" className="relative z-10 py-14 sm:py-16">
        <Container>
          <SectionHeader center eyebrow="Use cases" title="Built around the moments that slow platform teams down.">
            Sariva is aimed at production owners: Kafka admins, platform engineers, SRE teams, and cloud infrastructure leads.
          </SectionHeader>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map(([title, body]) => (
              <article key={title} className="sariva-card rounded-[1.35rem] p-5">
                <h3 className="text-base font-extrabold leading-tight text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="relative z-10 py-14 sm:py-16">
        <Container>
          <div className="sariva-section-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionHeader eyebrow="How it works" title="Fast answers for reads. Governed pull requests for writes.">
                Sariva is intentionally conservative. It helps teams diagnose quickly, then routes production changes through the systems they already trust.
              </SectionHeader>
              <div className="space-y-4">
                {[
                  ["01", "Register scope", "Connect only the clusters, topics, Flink jobs, repositories, observability sources, deployment agents, and runbook domains Sariva is allowed to access."],
                  ["02", "Ask naturally", "Use Slack, CLI, REST, or MCP while Sariva translates operational intent into Kafka, Flink, cloud, observability, and GitOps context."],
                  ["03", "Approve safely", "Read answers return with evidence. Write actions become PRs with diffs, rationale, RBAC checks, and rollback notes."],
                ].map(([step, title, body]) => (
                  <article key={step} className="sariva-card grid gap-5 rounded-[1.45rem] p-5 sm:grid-cols-[68px_1fr]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-300/25 bg-blue-500/15 font-mono text-sm font-bold text-cyan-200">
                      {step}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="integrations" className="relative z-10 py-14 sm:py-16">
        <Container>
          <SectionHeader center eyebrow="Integrations" title="Supported clients, platform integrations, and expansion path.">
            Sariva is built to meet platform teams where they already work while keeping future deployment patterns easy to add.
          </SectionHeader>
          <IntegrationsAndScope />
        </Container>
      </section>

      <section id="security" className="relative z-10 py-14 sm:py-16">
        <Container>
          <div className="sariva-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <SectionHeader eyebrow="Security & control" title="Enterprise authority without slowing teams down.">
                The design keeps a serious enterprise foundation with controlled blue, cyan, and green accents for progress, confidence, and growth.
              </SectionHeader>
              <div className="grid gap-3 sm:grid-cols-2">
                {security.map((item) => (
                  <div key={item} className="sariva-card-soft flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="relative z-10 border-t border-white/10 bg-[#081426]/90 py-14 sm:py-16">
        <Container>
          <div className="grid gap-9 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Bring Sariva into your streaming operations workflow.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                We are onboarding design partners who run Kafka, Flink, Confluent Cloud, MSK, or hybrid streaming platforms and want safer operational automation.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="mailto:hello@sariva.ai" className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-center text-sm font-extrabold text-white transition hover:-translate-y-0.5">
                  hello@sariva.ai
                </a>
                <a href="mailto:sales@sariva.ai" className="rounded-xl border border-white/12 bg-white/[0.045] px-6 py-3.5 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.07]">
                  sales@sariva.ai
                </a>
              </div>
            </div>
            <div className="sariva-card rounded-[1.6rem] p-6">
              <h3 className="text-xl font-extrabold text-white">Best fit</h3>
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
