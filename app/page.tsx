import type { CSSProperties, ReactNode } from "react";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Patterns", href: "#patterns" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "Integrations", href: "#integrations" },
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
      <div className="mb-7">
        <div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-cyan-200">
          AWS reference pattern
        </div>
        <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-white sm:text-3xl">
          Deployment architecture
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
          A governed reference pattern for GitOps deployment, Sariva workflow visibility, observability, alerting, and Confluent Cloud operations.
        </p>
      </div>

      <div className="sariva-svg-wrap">
        <svg className="sariva-architecture-svg" viewBox="0 0 2000 1080" role="img" aria-label="Sariva AWS reference deployment architecture diagram">
          <defs>
            <linearGradient id="sarivaPanelFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10213d" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#07111f" stopOpacity="0.96" />
            </linearGradient>
            <linearGradient id="sarivaSoftFill" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0f2746" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#07111f" stopOpacity="0.94" />
            </linearGradient>
            <filter id="sarivaBlueGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#3b82f6" floodOpacity="0.42" />
            </filter>
            <filter id="sarivaCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#22d3ee" floodOpacity="0.40" />
            </filter>
            <filter id="sarivaPurpleGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#a855f7" floodOpacity="0.34" />
            </filter>
            <marker id="sarivaArrowBlue" markerWidth="11" markerHeight="11" refX="10" refY="5.5" orient="auto">
              <path d="M0,0 L11,5.5 L0,11 Z" fill="#60a5fa" />
            </marker>
            <marker id="sarivaArrowCyan" markerWidth="11" markerHeight="11" refX="10" refY="5.5" orient="auto">
              <path d="M0,0 L11,5.5 L0,11 Z" fill="#22d3ee" />
            </marker>
            <marker id="sarivaArrowWhite" markerWidth="11" markerHeight="11" refX="10" refY="5.5" orient="auto">
              <path d="M0,0 L11,5.5 L0,11 Z" fill="#cbd5e1" />
            </marker>
            <pattern id="sarivaArchGrid" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#94a3b8" strokeOpacity="0.07" strokeWidth="1" />
            </pattern>
          </defs>

          <rect x="12" y="12" width="1976" height="1056" rx="38" fill="#020817" opacity="0.5" />
          <rect x="12" y="12" width="1976" height="1056" rx="38" fill="url(#sarivaArchGrid)" />
          <rect x="12" y="12" width="1976" height="1056" rx="38" fill="none" stroke="#60a5fa" strokeOpacity="0.22" />

          <rect x="70" y="330" width="235" height="310" rx="28" fill="url(#sarivaPanelFill)" stroke="#60a5fa" strokeOpacity="0.38" />
          <rect x="112" y="360" width="86" height="32" rx="16" fill="#1d4ed8" fillOpacity="0.18" stroke="#60a5fa" strokeOpacity="0.45" />
          <text x="155" y="381" textAnchor="middle" className="svg-pill">GitOps</text>
          <rect x="132" y="424" width="86" height="86" rx="24" fill="#1e3a8a" fillOpacity="0.28" stroke="#60a5fa" strokeOpacity="0.5" />
          <text x="175" y="477" textAnchor="middle" className="svg-icon-text">GH</text>
          <text x="188" y="560" textAnchor="middle" className="svg-title">GitHub Actions</text>
          <text x="188" y="595" textAnchor="middle" className="svg-body">CI/CD and GitOps trigger</text>

          <rect x="425" y="220" width="560" height="470" rx="30" fill="url(#sarivaPanelFill)" stroke="#60a5fa" strokeOpacity="0.38" />
          <rect x="462" y="250" width="190" height="34" rx="17" fill="#1d4ed8" fillOpacity="0.18" stroke="#60a5fa" strokeOpacity="0.45" />
          <text x="557" y="273" textAnchor="middle" className="svg-pill">Self-hosted · Amazon EKS</text>
          <text x="462" y="338" className="svg-heading">Sariva platform</text>
          <text x="462" y="378" className="svg-body">Coordinates GitOps, watches workflow status,</text>
          <text x="462" y="405" className="svg-body">and answers operational questions in the customer runtime.</text>

          <rect x="462" y="462" width="220" height="104" rx="20" fill="#021827" stroke="#22d3ee" strokeOpacity="0.55" />
          <text x="486" y="498" className="svg-subtitle-cyan">Deployment agent</text>
          <text x="486" y="532" className="svg-small">Generates IaC, opens PRs,</text>
          <text x="486" y="554" className="svg-small">coordinates GitOps changes.</text>

          <rect x="708" y="462" width="230" height="104" rx="20" fill="#110f28" stroke="#a855f7" strokeOpacity="0.55" />
          <text x="732" y="498" className="svg-subtitle-purple">GitHub workflow watcher</text>
          <text x="732" y="532" className="svg-small">Watches PRs, workflow runs,</text>
          <text x="732" y="554" className="svg-small">apply status and completion.</text>

          <rect x="462" y="592" width="220" height="104" rx="20" fill="#021827" stroke="#2dd4bf" strokeOpacity="0.55" />
          <text x="486" y="628" className="svg-subtitle-teal">Observability agent</text>
          <text x="486" y="662" className="svg-small">Queries telemetry, logs,</text>
          <text x="486" y="684" className="svg-small">metrics, and Kafka metadata.</text>

          <rect x="708" y="592" width="230" height="104" rx="20" fill="#0b1220" stroke="#94a3b8" strokeOpacity="0.28" />
          <text x="732" y="628" className="svg-subtitle">Interfaces</text>
          <text x="732" y="662" className="svg-small">API · Slack · UI</text>

          <rect x="1135" y="165" width="275" height="105" rx="22" fill="url(#sarivaSoftFill)" stroke="#34d399" strokeOpacity="0.48" />
          <rect x="1160" y="190" width="120" height="28" rx="14" fill="#064e3b" fillOpacity="0.34" stroke="#34d399" strokeOpacity="0.35" />
          <text x="1220" y="209" textAnchor="middle" className="svg-pill">Remote state</text>
          <text x="1160" y="242" className="svg-card-title">Amazon S3 state</text>
          <text x="1160" y="264" className="svg-small">Terraform remote state storage</text>

          <rect x="1135" y="310" width="275" height="105" rx="22" fill="url(#sarivaSoftFill)" stroke="#a855f7" strokeOpacity="0.45" />
          <rect x="1160" y="335" width="120" height="28" rx="14" fill="#581c87" fillOpacity="0.28" stroke="#a855f7" strokeOpacity="0.35" />
          <text x="1220" y="354" textAnchor="middle" className="svg-pill">State locking</text>
          <text x="1160" y="387" className="svg-card-title">DynamoDB lock</text>
          <text x="1160" y="409" className="svg-small">State locking and coordination</text>

          <rect x="1135" y="462" width="275" height="105" rx="22" fill="url(#sarivaSoftFill)" stroke="#22d3ee" strokeOpacity="0.48" />
          <rect x="1160" y="487" width="140" height="28" rx="14" fill="#155e75" fillOpacity="0.28" stroke="#22d3ee" strokeOpacity="0.35" />
          <text x="1230" y="506" textAnchor="middle" className="svg-pill">App telemetry</text>
          <text x="1160" y="539" className="svg-card-title">Applications / services</text>
          <text x="1160" y="561" className="svg-small">Health, logs, performance signals</text>

          <rect x="1135" y="610" width="275" height="105" rx="22" fill="url(#sarivaSoftFill)" stroke="#f472b6" strokeOpacity="0.48" />
          <rect x="1160" y="635" width="126" height="28" rx="14" fill="#831843" fillOpacity="0.28" stroke="#f472b6" strokeOpacity="0.35" />
          <text x="1223" y="654" textAnchor="middle" className="svg-pill">AWS telemetry</text>
          <text x="1160" y="687" className="svg-card-title">Amazon CloudWatch</text>
          <text x="1160" y="709" className="svg-small">Metrics, traces, alarms, dashboards</text>

          <rect x="1135" y="765" width="275" height="105" rx="22" fill="#160f2b" stroke="#a855f7" strokeOpacity="0.5" />
          <text x="1160" y="805" className="svg-card-title">Alert engine</text>
          <text x="1160" y="832" className="svg-small">Anomalies, policies, and incident routing</text>
          <rect x="1160" y="845" width="82" height="24" rx="12" fill="#0f172a" stroke="#94a3b8" strokeOpacity="0.28" />
          <text x="1201" y="862" textAnchor="middle" className="svg-small-strong">Slack</text>
          <rect x="1254" y="845" width="104" height="24" rx="12" fill="#0f172a" stroke="#94a3b8" strokeOpacity="0.28" />
          <text x="1306" y="862" textAnchor="middle" className="svg-small-strong">PagerDuty</text>

          <rect x="1660" y="365" width="250" height="285" rx="30" fill="url(#sarivaPanelFill)" stroke="#a855f7" strokeOpacity="0.55" filter="url(#sarivaPurpleGlow)" />
          <rect x="1694" y="397" width="150" height="34" rx="17" fill="#581c87" fillOpacity="0.34" stroke="#a855f7" strokeOpacity="0.42" />
          <text x="1769" y="420" textAnchor="middle" className="svg-pill">Managed streaming</text>
          <circle cx="1785" cy="500" r="40" fill="#083344" stroke="#22d3ee" strokeOpacity="0.72" filter="url(#sarivaCyanGlow)" />
          <text x="1785" y="511" textAnchor="middle" className="svg-icon-text">CC</text>
          <text x="1785" y="578" textAnchor="middle" className="svg-title">Confluent Cloud</text>
          <text x="1785" y="615" textAnchor="middle" className="svg-body">Streaming platform as a service</text>

          <path d="M 305 485 C 350 485, 370 485, 415 485" stroke="#cbd5e1" strokeWidth="2.3" fill="none" markerEnd="url(#sarivaArrowWhite)" />
          <text x="322" y="463" className="svg-line-label">trigger PR / pipeline</text>

          <path d="M 305 650 C 330 815, 500 825, 570 705" stroke="#c4b5fd" strokeWidth="2.2" fill="none" strokeDasharray="8 8" markerEnd="url(#sarivaArrowWhite)" />
          <text x="330" y="790" className="svg-line-label">workflow status</text>

          <path d="M 188 330 C 270 95, 1500 90, 1710 365" stroke="#60a5fa" strokeWidth="3.2" fill="none" markerEnd="url(#sarivaArrowBlue)" filter="url(#sarivaBlueGlow)" />
          <text x="390" y="132" className="svg-line-label-blue">Deployment / apply path · GitHub Actions → Terraform apply → Confluent Cloud</text>

          <path d="M 985 245 C 1045 235, 1076 220, 1125 218" stroke="#cbd5e1" strokeWidth="2.2" fill="none" markerEnd="url(#sarivaArrowWhite)" />
          <text x="1010" y="214" className="svg-line-label">store state</text>

          <path d="M 985 352 C 1046 356, 1076 362, 1125 362" stroke="#cbd5e1" strokeWidth="2.2" fill="none" markerEnd="url(#sarivaArrowWhite)" />
          <text x="1010" y="344" className="svg-line-label">acquire lock</text>

          <path d="M 985 515 C 1048 515, 1078 515, 1125 515" stroke="#22d3ee" strokeWidth="2.6" fill="none" markerEnd="url(#sarivaArrowCyan)" />
          <text x="1000" y="492" className="svg-line-label-cyan">query app telemetry</text>

          <path d="M 985 650 C 1048 650, 1078 662, 1125 662" stroke="#22d3ee" strokeWidth="2.6" fill="none" strokeDasharray="8 8" markerEnd="url(#sarivaArrowCyan)" />
          <text x="1000" y="635" className="svg-line-label-cyan">collect metrics and logs</text>

          <path d="M 1410 515 C 1500 515, 1555 515, 1650 515" stroke="#22d3ee" strokeWidth="2.7" fill="none" strokeDasharray="8 8" markerEnd="url(#sarivaArrowCyan)" />
          <text x="1435" y="470" className="svg-line-label-cyan">read cloud metrics, topics,</text>
          <text x="1435" y="492" className="svg-line-label-cyan">consumer groups, Kafka metadata</text>

          <path d="M 1410 818 C 1540 805, 1585 675, 1650 622" stroke="#c4b5fd" strokeWidth="2.2" fill="none" strokeDasharray="8 8" markerEnd="url(#sarivaArrowWhite)" />

          <rect x="70" y="735" width="280" height="112" rx="20" fill="#07111f" stroke="#60a5fa" strokeOpacity="0.24" />
          <line x1="98" y1="775" x2="150" y2="775" stroke="#60a5fa" strokeWidth="3" markerEnd="url(#sarivaArrowBlue)" />
          <text x="168" y="780" className="svg-small">Deployment / apply path</text>
          <line x1="98" y1="818" x2="150" y2="818" stroke="#22d3ee" strokeWidth="2.6" strokeDasharray="8 8" markerEnd="url(#sarivaArrowCyan)" />
          <text x="168" y="823" className="svg-small">Observability / read path</text>
        </svg>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        {[
          ["Secure by design", "Least privilege, network isolation, secrets management"],
          ["Observable", "Logs, metrics, traces, and Kafka metadata"],
          ["Governed operations", "State, locks, PRs, and audit history"],
          ["Integration-ready", "Slack, PagerDuty, GitHub, and AWS services"],
          ["Stream with confidence", "Enterprise-grade streaming on Confluent Cloud"],
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

function IntegrationsAndScope() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="sariva-card rounded-[1.7rem] p-6">
        <h3 className="text-xl font-extrabold text-white">Supported clients and integrations</h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {supportedClients.map(([title, body]) => (
            <div key={title} className="sariva-card-soft rounded-2xl p-4">
              <div className="font-extrabold text-white">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {integrations.map(([title, body]) => (
            <div key={title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
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
                <a key={item.href} href={item.href} className="text-sm font-semibold text-slate-300 transition hover:text-white">
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
