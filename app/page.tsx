"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================================
// Sariva — sariva.ai marketing landing page (v7)
// Royal dark theme. Background #001949 (compound 23, Royal Star of the Lion).
// All-Geist typography (no Instrument Serif). Pulse motif in hero.
// Same 11-section structure as v6; visual layer flipped dark.
// ============================================================================

// ── Palette (Royal — dark, numerology-validated) ────────────────────────────
const C = {
  // Backgrounds
  royal: "#001949",          // page bg — 23 → 5 (Royal Star of the Lion)
  royalOnyx: "#011A50",      // section alternation
  royalCarbon: "#012358",    // card surface — 19 → 1 (Sun)
  royalBorder: "#1B3458",    // borders — 21 → 3 / 23 → 5 (Royal Star via M2)
  royalBorderSoft: "#0F2A48", // soft dividers — 14 → 5 / 23 → 5

  // Text on dark
  mist: "#F8FAFC",           // headings — digit-sum 8 (life path)
  mistText: "#DCE5F0",       // body — digit-sum 5 (Sariva root)
  ash: "#B5C5D5",            // sub-text — 15 → 6 (Venus, trust)
  ashMuted: "#8A9DB7",       // mono labels — 24 → 6 (Venus)

  // Brand accent
  azul: "#2A48F0",           // primary accent — 23 → 5 (Royal Star of the Lion)
  brightMist: "#6E8DFA",     // accent words — 14 → 5
  pillText: "#A0B5F5",       // pill text — 10 → 1 (Sun)

  // Status
  green: "#22C55E",
} as const;

// ── Container ───────────────────────────────────────────────────────────────
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-6 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

// ── PulseMark — 3-ring brand glyph ──────────────────────────────────────────
function PulseMark({ size = 22, color = C.azul }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <circle cx="12" cy="12" r="10.5" fill="none" stroke={color} strokeWidth="1.25" opacity="0.42" />
      <circle cx="12" cy="12" r="7" fill="none" stroke={color} strokeWidth="1.25" opacity="0.72" />
      <circle cx="12" cy="12" r="3.25" fill={color} />
    </svg>
  );
}

// ── HeroPulseMotif — ambient brand element in hero background ───────────────
function HeroPulseMotif() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: "-200px", right: "-180px" }}
      width="680"
      height="680"
      viewBox="0 0 680 680"
      aria-hidden
    >
      <defs>
        <radialGradient id="heroPulseFade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.azul} stopOpacity="0.32" />
          <stop offset="60%" stopColor={C.azul} stopOpacity="0.08" />
          <stop offset="100%" stopColor={C.azul} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="340" cy="340" r="330" fill="none" stroke={C.azul} strokeWidth="1" opacity="0.09" />
      <circle cx="340" cy="340" r="260" fill="none" stroke={C.azul} strokeWidth="1" opacity="0.14" />
      <circle cx="340" cy="340" r="195" fill="none" stroke={C.azul} strokeWidth="1" opacity="0.22" />
      <circle cx="340" cy="340" r="130" fill="none" stroke={C.azul} strokeWidth="1" opacity="0.30" />
      <circle cx="340" cy="340" r="78" fill="url(#heroPulseFade)" />
      <circle cx="340" cy="340" r="24" fill={C.azul} opacity="0.62" />
    </svg>
  );
}

// ── Eyebrow ─────────────────────────────────────────────────────────────────
function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="block h-px w-7 shrink-0"
        style={{ background: C.azul }}
        aria-hidden
      />
      <span
        className="font-mono font-medium uppercase tracking-[0.14em]"
        style={{ color: C.ashMuted, fontSize: "0.76rem" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── SectionTitle — Geist 700, dark theme ────────────────────────────────────
function SectionTitle({ children, maxCh = 22 }: { children: React.ReactNode; maxCh?: number }) {
  return (
    <h2
      style={{
        fontSize: "clamp(1.85rem, 3vw, 2.6rem)",
        fontWeight: 700,
        letterSpacing: "-0.028em",
        lineHeight: 1.1,
        color: C.mist,
        maxWidth: `${maxCh}ch`,
      }}
    >
      {children}
    </h2>
  );
}

// ── CardTitle ───────────────────────────────────────────────────────────────
function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: "1.05rem",
        fontWeight: 600,
        letterSpacing: "-0.005em",
        lineHeight: 1.35,
        color: C.mist,
        marginBottom: "0.65rem",
      }}
    >
      {children}
    </h3>
  );
}

// ── Slack mock data ─────────────────────────────────────────────────────────
type Scenario = {
  key: string;
  tab: string;
  user: { name: string; initials: string; bg: string; time: string };
  userMsg: React.ReactNode;
  botTime: string;
  botMsg: React.ReactNode;
};

const Code = ({ children }: { children: React.ReactNode }) => (
  <code
    className="font-mono text-[0.85em] px-1.5 py-0.5 rounded"
    style={{ background: C.royal, border: `1px solid ${C.royalBorder}`, color: C.mist }}
  >
    {children}
  </code>
);

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold" style={{ color: C.mist }}>{children}</strong>
);

const SCENARIOS: Scenario[] = [
  {
    key: "observability",
    tab: "Observability",
    user: { name: "Julia Kim", initials: "JK", bg: "#F97316", time: "10:42 AM" },
    userMsg: <>@Sariva what&apos;s the consumer lag on <Code>orders-topic</Code> in production?</>,
    botTime: "10:42 AM",
    botMsg: (
      <div className="space-y-1.5">
        <div>Here&apos;s the current consumer lag for <Code>orders-topic</Code>:</div>
        <div>Cluster: <Code>prod-kafka-cluster</Code> · Consumer group: <Code>order-processor</Code></div>
        <div>Total lag: <B>1,247 messages</B> · Partitions: 12 / 12 assigned</div>
        <div className="flex items-center gap-1.5">
          Status: <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: C.green }} /> Healthy
        </div>
        <div style={{ color: C.ash }}>Lag within normal range. Processing ~2.4k msgs/sec.</div>
      </div>
    ),
  },
  {
    key: "troubleshooting",
    tab: "Troubleshooting",
    user: { name: "Devon Patel", initials: "DP", bg: "#14B8A6", time: "11:18 AM" },
    userMsg: <>@Sariva why is <Code>flink-fraud-detector</Code> restarting?</>,
    botTime: "11:18 AM",
    botMsg: (
      <div className="space-y-1.5">
        <div>3 restarts in the last 15 min on <Code>flink-fraud-detector</Code> (<Code>prod-flink-1</Code>).</div>
        <div>Root cause: <B>OOMKilled</B> — task manager hit the 4 GB memory limit.</div>
        <div>Top input: <Code>payment-events</Code> at 8.2k msgs/sec (3× baseline).</div>
        <div>Suggested fix: raise <Code>taskmanager.memory.process.size</Code> 4 GB → 6 GB.</div>
        <div style={{ color: C.ash }}>Want me to open a PR? (<Code>infra/flink/fraud-detector.tf</Code>)</div>
      </div>
    ),
  },
  {
    key: "provisioning",
    tab: "Provisioning",
    user: { name: "Maya Chen", initials: "MC", bg: "#E11D48", time: "2:04 PM" },
    userMsg: <>@Sariva create a dev Kafka cluster for the payments team</>,
    botTime: "2:04 PM",
    botMsg: (
      <div className="space-y-1.5">
        <div>Planning <Code>dev-payments-kafka</Code>:</div>
        <div>Basic tier · us-east-1 · 3 brokers · KRaft · Schema Registry attached</div>
        <div>Cost estimate: <B>~$240 / month</B></div>
        <div>RBAC inherits from <Code>payments-team</Code> (existing).</div>
        <div style={{ color: C.ash }}>PR at <Code>infra/clusters/dev-payments-kafka.tf</Code>. Reply <Code>proceed</Code> to commit.</div>
      </div>
    ),
  },
];

function Avatar({ bg, letters }: { bg: string; letters: string }) {
  return (
    <div
      className="flex-shrink-0 rounded-md flex items-center justify-center font-semibold text-white"
      style={{ background: bg, width: 34, height: 34, fontSize: letters.length === 1 ? 15 : 12 }}
    >
      {letters}
    </div>
  );
}

function SlackMock() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [locked, setLocked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || paused || locked) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % SCENARIOS.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, locked]);

  const s = SCENARIOS[active];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {SCENARIOS.map((sc, i) => {
          const isActive = i === active;
          return (
            <button
              key={sc.key}
              onClick={() => {
                setActive(i);
                setLocked(true);
              }}
              className="px-3.5 py-1.5 rounded-full text-[0.82rem] font-medium transition-colors"
              style={{
                background: isActive ? C.mist : "transparent",
                color: isActive ? C.royal : C.ash,
                border: `1px solid ${isActive ? C.mist : C.royalBorder}`,
              }}
              aria-pressed={isActive}
            >
              {sc.tab}
            </button>
          );
        })}
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: C.royalCarbon,
          border: `1px solid ${C.royalBorder}`,
          boxShadow:
            "0 24px 48px -24px rgba(0,0,0,0.5), 0 60px 120px -50px rgba(42,72,240,0.22)",
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ background: C.royalOnyx, borderBottom: `1px solid ${C.royalBorder}` }}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22C55E" }} />
          </div>
          <span className="font-mono text-[0.72rem]" style={{ color: C.ashMuted }}>
            #kafka-ops
          </span>
        </div>

        <div className="p-5 space-y-4 text-[0.88rem]" style={{ color: C.mistText }}>
          <div className="flex gap-3">
            <Avatar bg={s.user.bg} letters={s.user.initials} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold" style={{ color: C.mist }}>{s.user.name}</span>
                <span className="text-[0.72rem]" style={{ color: C.ashMuted }}>{s.user.time}</span>
              </div>
              <div className="leading-[1.55]">{s.userMsg}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Avatar bg={C.azul} letters="S" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold" style={{ color: C.mist }}>Sariva</span>
                <span
                  className="text-[0.6rem] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: C.royalBorder, color: C.mistText }}
                >
                  APP
                </span>
                <span className="text-[0.72rem]" style={{ color: C.ashMuted }}>{s.botTime}</span>
              </div>
              <div className="leading-[1.55]">{s.botMsg}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMsg("");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("ok");
    setMsg("Thanks — we'll be in touch.");
    setEmail("");
  };

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="flex-1 px-4 py-3 rounded-md text-[0.92rem] outline-none transition-colors focus:border-[#6E8DFA]"
          style={{
            background: "rgba(248, 250, 252, 0.04)",
            border: `1px solid ${C.royalBorder}`,
            color: C.mist,
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-md font-medium text-[0.92rem] transition-opacity disabled:opacity-60"
          style={{ background: C.azul, color: "#FFFFFF" }}
        >
          {status === "loading" ? "Sending…" : "Notify me"}
        </button>
      </div>
      {msg && (
        <p
          className="mt-3 text-[0.82rem]"
          style={{ color: status === "ok" ? "#86EFAC" : "#FCA5A5" }}
          role="status"
        >
          {msg}
        </p>
      )}
    </form>
  );
}

// ── NavDropdown ─────────────────────────────────────────────────────────────
type NavItem = { href: string; title: string; description?: string };

function NavDropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    []
  );

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 transition-colors hover:text-white"
        style={{ color: open ? "#FFFFFF" : C.ash, fontSize: "0.86rem" }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          aria-hidden
          style={{
            transition: "transform 200ms",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            opacity: 0.7,
          }}
        >
          <path
            d="M2 4 L6 8 L10 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2" style={{ zIndex: 100 }}>
          <div
            className="rounded-[10px] overflow-hidden"
            style={{
              background: C.royalCarbon,
              border: `1px solid ${C.royalBorder}`,
              boxShadow:
                "0 20px 50px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(42,72,240,0.10)",
              minWidth: "300px",
            }}
          >
            {items.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 transition-colors"
                style={{
                  borderTop: i > 0 ? `1px solid ${C.royalBorderSoft}` : "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="font-medium text-[0.88rem]" style={{ color: C.mist }}>
                  {item.title}
                </div>
                {item.description && (
                  <div
                    className="text-[0.76rem] mt-0.5 leading-[1.45]"
                    style={{ color: C.ash }}
                  >
                    {item.description}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Support matrix data ─────────────────────────────────────────────────────
const SUPPORT_MATRIX: { label: string; items: string }[] = [
  {
    label: "Kafka flavors",
    items: "Confluent Cloud · Confluent Platform · Apache Kafka (self-managed) · AWS MSK · Strimzi · Confluent for Kubernetes (CFK) · Redpanda",
  },
  {
    label: "Stream processing",
    items: "Apache Flink · Confluent Flink · Tableflow + Apache Iceberg · Schema Registry (Confluent + Apicurio) · Confluent Connect (managed + self-hosted)",
  },
  {
    label: "Clouds",
    items: "AWS (deepest integration) · GCP · Azure · multi-cloud / hybrid",
  },
  {
    label: "Networking",
    items: "AWS PrivateLink · VPC Peering · Transit Gateway · mTLS · IRSA · public endpoints",
  },
  {
    label: "Security",
    items: "Field Level Encryption (FLE) · RBAC · ACLs · API key rotation · AWS KMS · Confluent Cloud audit logs",
  },
  {
    label: "Interfaces",
    items: "Slack · CLI · REST API · MCP server (for Claude Code, Cursor, Confluent Streaming Agents) — Microsoft Teams + web UI on roadmap",
  },
  {
    label: "Git providers",
    items: "GitHub · GitHub Enterprise — GitLab + Bitbucket on roadmap",
  },
  {
    label: "Deployment",
    items: "Helm chart on customer EKS / GKE / AKS · Terraform-backed · GitOps pull-request flow",
  },
];

// ── Toil section data ───────────────────────────────────────────────────────
const TOIL_ITEMS: { title: string; body: string; estimate: string }[] = [
  {
    title: "Standing up Confluent for Kubernetes (CFK) on AWS EKS",
    body:
      "IRSA roles, storage classes, brokers, controllers, Kafka Connect, Schema Registry, monitoring stack, certificates, mTLS. Then making it survive a rolling upgrade. Then replicating it across staging and production with the same configuration drift-free.",
    estimate: "3–5 days the first time, 1–2 days per cluster after",
  },
  {
    title: "Configuring networking for Confluent Cloud",
    body:
      "PrivateLink endpoints across VPCs, security group routing, DNS resolution for the bootstrap, NLB target health, Transit Gateway routes, IAM policies for cross-account access. Most of it is YAML and console clicking copy-pasted from a runbook someone wrote two quarters ago.",
    estimate: "About a week per environment, longer if anything goes wrong",
  },
  {
    title: "Enabling Tableflow and Field Level Encryption",
    body:
      "Iceberg catalog wiring, S3 bucket permissions, KMS key policies, FLE encryption rules per topic, key rotation schedules, schema-to-encryption mapping. Every team learns this from scratch — there's no canonical template that fits a real production deployment.",
    estimate: "2–4 days per topic family, plus the rotation runbook",
  },
  {
    title: "Writing production-grade Terraform for Confluent Cloud",
    body:
      "Most teams write one cluster's worth of Terraform inline, then copy-paste it for the next cluster. Production-scale structure — modules per resource type, environments via workspaces, secrets in a remote backend, state locking, drift detection, dependency graphs — rarely happens until something breaks expensively.",
    estimate: "A multi-week project that gets deferred indefinitely",
  },
];

// ────────────────────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div className="font-sans antialiased" style={{ background: C.royal, color: C.mist }}>
      {/* ─────────────────────── NAV ─────────────────────── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(0, 25, 73, 0.82)", borderBottom: `1px solid ${C.royalBorder}` }}
      >
        <Container>
          <div className="flex items-center justify-between h-14">
            <a href="#top" className="inline-flex items-center gap-2.5" style={{ color: C.mist }}>
              <PulseMark size={22} color={C.azul} />
              <span style={{ fontSize: "1.15rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Sariva
              </span>
            </a>
            <div
              className="hidden md:flex items-center gap-7 text-[0.86rem]"
              style={{ color: C.ash }}
            >
              <NavDropdown
                label="Product"
                items={[
                  { href: "#product", title: "Overview", description: "The streaming ops problem" },
                  { href: "#toil", title: "Toil", description: "Where SRE hours actually go" },
                  { href: "#capabilities", title: "Capabilities", description: "Two agents and the runbook library" },
                  { href: "#coverage", title: "Support matrix", description: "Flavors, clouds, git providers" },
                  { href: "#how-it-works", title: "How it works", description: "Channel to cluster in three steps" },
                ]}
              />
              <NavDropdown
                label="Why Sariva"
                items={[
                  { href: "#different", title: "A different layer", description: "Vs gateways, UIs, observability" },
                  { href: "#confluent", title: "Confluent ecosystem", description: "Where Sariva sits with Streaming Agents" },
                  { href: "#use-cases", title: "Use cases", description: "Six common moments" },
                  { href: "#trust", title: "Trust & Control", description: "Self-hosted, RBAC, audited" },
                ]}
              />
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://docs.sariva.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[0.86rem] transition-colors hover:text-white"
                style={{ color: C.ash }}
              >
                Docs
                <span aria-hidden style={{ fontSize: "0.78em", opacity: 0.7 }}>↗</span>
              </a>
              <a
                href="#contact"
                className="px-3.5 py-1.5 rounded-md text-[0.82rem] font-medium transition-opacity hover:opacity-90"
                style={{ background: C.azul, color: "#FFFFFF" }}
              >
                Get early access
              </a>
            </div>
          </div>
        </Container>
      </nav>

      {/* ─────────────────────── HERO ─────────────────────── */}
      <section
        id="top"
        className="relative overflow-hidden"
        style={{ background: C.royal }}
      >
        <HeroPulseMotif />
        <Container className="relative pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="mb-6">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full font-mono font-semibold text-[0.72rem] uppercase tracking-[0.16em]"
                  style={{
                    background: "rgba(42, 72, 240, 0.22)",
                    color: C.pillText,
                    border: "1px solid rgba(42, 72, 240, 0.45)",
                  }}
                >
                  Ops AI · Kafka &amp; Flink
                </span>
              </div>
              <h1
                style={{
                  fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.028em",
                  lineHeight: 1.06,
                  color: C.mist,
                  marginBottom: "1.5rem",
                }}
              >
                Operate{" "}
                <span style={{ color: C.brightMist }}>Kafka</span>
                {" "}and{" "}
                <span style={{ color: C.brightMist }}>Flink</span>
                {" "}through conversation.
              </h1>
              <p
                className="leading-[1.65] max-w-[38em] mb-7"
                style={{ fontSize: "1rem", color: C.ash }}
              >
                Sariva is the AI operator for Apache Kafka and Apache Flink — a senior
                streaming engineer in your Slack, CLI, REST, and MCP surfaces. Ask in
                plain English. Diagnose incidents end-to-end. Execute changes through
                GitOps with a full audit trail. Self-hosted in your VPC.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="#contact"
                  className="px-4 py-2.5 rounded-md text-[0.9rem] font-medium transition-opacity hover:opacity-90"
                  style={{ background: C.azul, color: "#FFFFFF" }}
                >
                  Get early access →
                </a>
                <a
                  href="mailto:hello@sariva.ai"
                  className="px-4 py-2.5 rounded-md text-[0.9rem] font-mono font-medium transition-colors"
                  style={{ border: `1px solid ${C.royalBorder}`, color: C.mist, background: "transparent" }}
                >
                  hello@sariva.ai
                </a>
              </div>
            </div>

            <div className="w-full">
              <SlackMock />
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────── PRODUCT ─────────────────────── */}
      <section id="product" style={{ background: C.royal, borderTop: `1px solid ${C.royalBorderSoft}` }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="The problem" />
          <SectionTitle maxCh={26}>
            Streaming ops is harder than it looks.
          </SectionTitle>

          <p
            className="mt-6 leading-[1.7] max-w-[62ch]"
            style={{ fontSize: "1.02rem", color: C.mistText }}
          >
            Kafka and Flink power the most critical pipelines in modern infrastructure —
            payments, fraud detection, audit logs, machine learning feature stores. When
            they break, revenue stops. When they degrade, customers churn silently. And
            the engineers who can fix them are scarce, expensive, and burnt out.
          </p>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {[
              {
                tag: "The fragmentation problem",
                body:
                  "Your streaming stack lives across Confluent Cloud, kubectl, Prometheus, CloudWatch, Schema Registry, GitHub, and three Slack threads from last quarter. Diagnosing a single incident means jumping between five tools to assemble a picture, then a sixth to act on it.",
              },
              {
                tag: "The expertise problem",
                body:
                  "Kafka, Flink, and the streaming ecosystem demand specialist knowledge — partitions, KRaft, ISRs, watermarks, ACLs, FLE, PrivateLink, Tableflow. One senior streaming engineer costs $150–200K/year. Most teams have one, on call 24/7. Operations stop when they're on vacation.",
              },
              {
                tag: "The change problem",
                body:
                  "Every change cascades. A topic partition increase reshuffles consumer assignment. An ACL grant rolls fleet-wide. A Schema Registry update breaks a downstream consumer two weeks later. Without an audit trail and a rollback path, you can't safely move fast.",
              },
            ].map((p, i) => (
              <div key={i}>
                <div
                  className="font-mono font-medium uppercase tracking-[0.12em] mb-3"
                  style={{ color: C.brightMist, fontSize: "0.74rem" }}
                >
                  {p.tag}
                </div>
                <p className="leading-[1.65]" style={{ fontSize: "0.94rem", color: C.ash }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mt-12 leading-[1.7] max-w-[62ch]"
            style={{ fontSize: "1.02rem", color: C.mistText }}
          >
            Sariva collapses these three problems into one interface — conversation,
            with full context, every action audited, every change executed through your
            GitOps repo. It speaks the language of platform engineers — partitions, lag,
            commits, ACLs, IRSA, mTLS, KRaft, retention, FLE, Tableflow — and translates
            intent into safe, reversible operations.
          </p>
        </Container>
      </section>

      {/* ─────────────────────── TOIL ─────────────────────── */}
      <section id="toil" style={{ background: C.royalOnyx }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Toil" />
          <SectionTitle maxCh={28}>
            Where the hours actually go.
          </SectionTitle>
          <p
            className="mt-6 leading-[1.7] max-w-[62ch]"
            style={{ fontSize: "1rem", color: C.mistText }}
          >
            Streaming infrastructure is unforgiving, but the work behind it is
            repetitive. Most of what an SRE or Kafka engineer does in a week is
            well-understood, well-documented, and the same as last week — just slow and
            error-prone by hand. These are the tasks Sariva absorbs.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {TOIL_ITEMS.map((item, i) => (
              <article
                key={i}
                className="rounded-[10px] p-6"
                style={{ background: C.royalCarbon, border: `1px solid ${C.royalBorder}` }}
              >
                <div
                  className="font-mono font-semibold mb-3"
                  style={{ color: C.brightMist, fontSize: "0.78rem" }}
                >
                  0{i + 1}
                </div>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-[0.9rem] leading-[1.65] mb-4" style={{ color: C.ash }}>
                  {item.body}
                </p>
                <div
                  className="font-mono text-[0.74rem] pt-3"
                  style={{ color: C.ashMuted, borderTop: `1px solid ${C.royalBorder}` }}
                >
                  <span style={{ color: C.brightMist, marginRight: "0.5em" }}>↳</span>
                  {item.estimate}
                </div>
              </article>
            ))}
          </div>

          <p
            className="mt-12 leading-[1.7] max-w-[62ch]"
            style={{ fontSize: "1rem", color: C.mistText }}
          >
            Sariva does this work — or guides you through it step by step — in minutes,
            not days. Every action is a runbook. Every change is a PR. Every decision is
            auditable. The patterns we encode today are the ones your team would have
            written eventually, but now don&apos;t have to.
          </p>
        </Container>
      </section>

      {/* ─────────────────────── CAPABILITIES ─────────────────────── */}
      <section id="capabilities" style={{ background: C.royal }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Capabilities" />
          <SectionTitle>Two agents. One conversation.</SectionTitle>

          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {[
              {
                tag: "Observability Agent",
                title: "Ask anything about what's running.",
                body:
                  "Consumer lag, broker health, partition skew, Flink job state, connector status, Schema Registry compatibility, KRaft controller behavior. Pulls live from Confluent Cloud Metrics, Prometheus, Kafka Exporter, and CloudWatch.",
                bullets: [
                  "Live consumer group lag",
                  "Broker & cluster health",
                  "Flink job & checkpoint state",
                  "Opt-in proactive alerts",
                ],
              },
              {
                tag: "Deployment Agent",
                title: "Make changes safely, with an audit trail.",
                body:
                  "Topic creation, ACL grants, connector deployment, Flink statement submission, Tableflow setup, MSK → Confluent Cloud migration. Generates Terraform, opens a pull request in your GitOps repo, never holds long-lived cloud credentials.",
                bullets: [
                  "Terraform-backed, multi-cloud",
                  "GitOps pull-request flow",
                  "RBAC enforced, fully audited",
                  "Capability intake lifecycle",
                ],
              },
              {
                tag: "Knowledge Base",
                title: "Runbooks that ship with the platform.",
                body:
                  "Validated playbooks for Kafka, Flink, networking, FLE, Tableflow, onboarding, and managed connectors — invoked by the agents when a known failure pattern is detected. Tier-promoted only after a second independent occurrence.",
                bullets: [
                  "8 runbook categories shipped",
                  "Validated against real incidents",
                  "Versioned, indexed, tiered",
                  "Extensible per customer",
                ],
              },
            ].map((card, i) => (
              <article
                key={i}
                className="rounded-[10px] p-6 transition-transform hover:-translate-y-0.5"
                style={{ background: C.royalCarbon, border: `1px solid ${C.royalBorder}` }}
              >
                <span
                  className="inline-block font-mono font-medium text-[0.66rem] uppercase tracking-[0.12em] px-2 py-1 rounded mb-4"
                  style={{ background: "rgba(42, 72, 240, 0.22)", color: C.pillText, border: "1px solid rgba(42, 72, 240, 0.35)" }}
                >
                  {card.tag}
                </span>
                <CardTitle>{card.title}</CardTitle>
                <p className="text-[0.9rem] leading-[1.6] mb-4" style={{ color: C.ash }}>
                  {card.body}
                </p>
                <ul className="font-mono text-[0.78rem] space-y-1.5" style={{ color: C.ashMuted }}>
                  {card.bullets.map((b, j) => (
                    <li key={j}>— {b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── COVERAGE (support matrix) ─────────────────────── */}
      <section id="coverage" style={{ background: C.royalOnyx }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Support matrix" />
          <SectionTitle maxCh={30}>
            What we support, explicitly.
          </SectionTitle>
          <p
            className="mt-5 leading-[1.65] max-w-[60ch]"
            style={{ fontSize: "0.95rem", color: C.mistText }}
          >
            No fine print, no asterisks. If something is on the roadmap, we say so.
            Below is the full surface Sariva operates against today.
          </p>

          <div
            className="mt-10 rounded-[10px] overflow-hidden"
            style={{ background: C.royalCarbon, border: `1px solid ${C.royalBorder}` }}
          >
            {SUPPORT_MATRIX.map((row, i) => (
              <div
                key={row.label}
                className="grid md:grid-cols-[210px_1fr] gap-2 md:gap-8 px-5 md:px-7 py-5"
                style={{
                  borderTop: i === 0 ? "none" : `1px solid ${C.royalBorderSoft}`,
                }}
              >
                <div
                  className="font-mono font-medium uppercase tracking-[0.12em]"
                  style={{ color: C.brightMist, fontSize: "0.72rem", paddingTop: "0.1rem" }}
                >
                  {row.label}
                </div>
                <div
                  className="text-[0.92rem] leading-[1.6]"
                  style={{ color: C.mistText }}
                >
                  {row.items}
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-8 font-mono text-[0.78rem]"
            style={{ color: C.ashMuted }}
          >
            ↳ Missing a flavor, cloud, or git provider? Email{" "}
            <a
              href="mailto:hello@sariva.ai"
              style={{ color: C.brightMist, textDecoration: "underline" }}
            >
              hello@sariva.ai
            </a>
            {" "}— roadmap is driven by design partners.
          </p>
        </Container>
      </section>

      {/* ─────────────────────── WHY SARIVA ─────────────────────── */}
      <section id="different" style={{ background: C.royal }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Why Sariva" />
          <SectionTitle maxCh={30}>
            A different layer of the stack.
          </SectionTitle>
          <p
            className="mt-6 leading-[1.7] max-w-[62ch]"
            style={{ fontSize: "1rem", color: C.mistText }}
          >
            Streaming infrastructure has gateways, exploration UIs, and observability
            tools — each excellent at what it does. Sariva isn&apos;t trying to replace
            them. We sit alongside them as the operations layer: the senior engineer
            who reads the dashboard, runs the runbook, and ships the fix.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {[
              {
                vs: "vs Governance proxies",
                them: "Conduktor",
                title: "Gateway proxies live in the data path.",
                body:
                  "Conduktor and similar gateways sit between producers, consumers, and brokers — adding encryption, masking, audit, and chargeback. That's data-plane governance, and it's valuable. Sariva sits beside the cluster as an operator — diagnosing why a Flink job is restarting, walking the PrivateLink diagnostic chain, opening a PR to fix the broken Terraform. Different layer, complementary tools.",
              },
              {
                vs: "vs Exploration UIs",
                them: "Lenses.io",
                title: "UIs visualize. Sariva resolves.",
                body:
                  "Lenses.io, Confluent Control Center, and Kafka UI are excellent at showing topology, lag charts, message browsers, and lineage. They tell you what's running. Sariva is the autonomous operator that responds when the dashboard turns red — investigates root cause, applies the right runbook, drafts the PR, and ships the fix.",
              },
              {
                vs: "vs Observability suites",
                them: "Datadog DSM",
                title: "Observability informs. Sariva acts.",
                body:
                  "Datadog DSM traces messages through pipelines with per-stage latency — powerful, but it requires the full Datadog APM stack and bills per host. Sariva consumes your existing observability as input today. Post-beta we ship native end-to-end app tracing via Kafka client interceptors — one config line per app, no code change, no per-host pricing — bundled into the operations layer.",
              },
            ].map((c, i) => (
              <article
                key={i}
                className="rounded-[10px] p-6"
                style={{ background: C.royalCarbon, border: `1px solid ${C.royalBorder}` }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className="font-mono font-medium text-[0.66rem] uppercase tracking-[0.12em] px-2 py-1 rounded"
                    style={{ background: "rgba(42, 72, 240, 0.22)", color: C.pillText, border: "1px solid rgba(42, 72, 240, 0.35)" }}
                  >
                    {c.vs}
                  </span>
                  <span
                    className="font-mono text-[0.7rem] text-right whitespace-nowrap"
                    style={{ color: C.ashMuted, paddingTop: "0.25rem" }}
                  >
                    {c.them}
                  </span>
                </div>
                <CardTitle>{c.title}</CardTitle>
                <p className="text-[0.9rem] leading-[1.65]" style={{ color: C.ash }}>
                  {c.body}
                </p>
              </article>
            ))}
          </div>

          <p
            className="mt-10 leading-[1.65] max-w-[62ch]"
            style={{ fontSize: "0.98rem", color: C.mistText }}
          >
            Sariva isn&apos;t a gateway, a dashboard, or a metrics tier. We operate
            across all of them.
          </p>
        </Container>
      </section>

      {/* ─────────────────────── CONFLUENT ECOSYSTEM ─────────────────────── */}
      <section id="confluent" style={{ background: C.royalOnyx }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Confluent ecosystem" />
          <SectionTitle maxCh={32}>
            Sariva operates the platform. Streaming Agents run on it.
          </SectionTitle>
          <p
            className="mt-6 leading-[1.7] max-w-[64ch]"
            style={{ fontSize: "1rem", color: C.mistText }}
          >
            Confluent ships incredible infrastructure — Confluent Cloud, Flink on
            Confluent Cloud, Tableflow + Iceberg, the Streaming Agents framework. Sariva
            is purpose-built for teams that run Confluent at scale and need AI-native
            operations to match. We deploy your topics through GitOps. We diagnose your
            Flink job restarts. We watch your Tableflow sync health. We expose every
            tool through MCP so Streaming Agents can call Sariva from within Flink SQL.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {[
              {
                tag: "Multi-flavor first-class",
                body:
                  "Confluent Cloud, Confluent Platform on EKS, Confluent for Kubernetes, and Confluent Flink — all supported from day one alongside Apache Kafka, MSK, Strimzi, and Redpanda.",
              },
              {
                tag: "Tableflow + Iceberg ops",
                body:
                  "Streaming-to-table sync, schema evolution, sync lag — territory no other operator covers. Tableflow runbooks ship with the platform; agents diagnose Iceberg consistency issues automatically.",
              },
              {
                tag: "MCP closes the loop",
                body:
                  "Sariva's MCP server lets Confluent Streaming Agents call Sariva tools from inside Flink SQL — connecting stream processing to the ops layer. Diagnosis tools, runbook execution, deployment proposals — all callable from a Flink job.",
              },
            ].map((tile, i) => (
              <div
                key={i}
                className="rounded-[10px] p-6"
                style={{ background: C.royalCarbon, border: `1px solid ${C.royalBorder}` }}
              >
                <div
                  className="font-mono font-medium text-[0.68rem] uppercase tracking-[0.14em] mb-3"
                  style={{ color: C.brightMist }}
                >
                  {tile.tag}
                </div>
                <p className="text-[0.92rem] leading-[1.65]" style={{ color: C.ash }}>
                  {tile.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── USE CASES ─────────────────────── */}
      <section id="use-cases" style={{ background: C.royal }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Use cases" />
          <SectionTitle maxCh={28}>
            What it looks like in practice.
          </SectionTitle>
          <p
            className="mt-5 leading-[1.65] max-w-[58ch]"
            style={{ fontSize: "0.95rem", color: C.mistText }}
          >
            Six common moments in a streaming team&apos;s week. Each one is a Slack
            message away from resolution.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {[
              {
                tag: "Consumer lag spike",
                q: "@sariva orders-topic lag is at 2× baseline",
                a: "Surfaces the root cause — hot partition from skewed `customer_id` hashing. Suggests a partitioning strategy with the cost / downtime tradeoff. Opens a PR if you say yes.",
              },
              {
                tag: "Flink job OOM",
                q: "@sariva why is fraud-detector restarting?",
                a: "Diagnoses OOMKilled at 4 GB during peak load. Identifies `payment-events` as the 3× input spike. Proposes raising `taskmanager.memory.process.size` to 6 GB. PR includes the rollback plan.",
              },
              {
                tag: "PrivateLink failure",
                q: "@sariva producers can't reach CC after the AWS maintenance",
                a: "Walks the diagnostic chain — NLB target health, endpoint service status, Confluent network attachment, DNS resolution. Surfaces stale ENI on the customer side. Includes the fix.",
              },
              {
                tag: "Schema break",
                q: "@sariva the deploy is failing on schema compatibility",
                a: "Pinpoints the breaking change — `customer_id` type widened to long. Lists impacted consumer groups. Proposes a backward-compatible migration path with the version pinning steps.",
              },
              {
                tag: "MSK → CC migration",
                q: "@sariva plan a migration of payments-cluster from MSK to Confluent Cloud",
                a: "Generates the full plan — replication setup, topic mapping, consumer cutover sequence, rollback paths, cost delta. Three-stage execution with a PR per stage. KB-DEP-009 runbook applied.",
              },
              {
                tag: "New connector",
                q: "@sariva add an S3 sink for analytics topics",
                a: "Picks the right connector class. Generates the Terraform for the connector, IAM role, S3 bucket policy. Opens a PR with cost estimate, RBAC checks, and the rollback steps.",
              },
            ].map((u, i) => (
              <article
                key={i}
                className="rounded-[10px] p-6"
                style={{ background: C.royalCarbon, border: `1px solid ${C.royalBorder}` }}
              >
                <div
                  className="font-mono font-medium text-[0.66rem] uppercase tracking-[0.12em] mb-4 inline-block px-2 py-1 rounded"
                  style={{ background: "rgba(42, 72, 240, 0.22)", color: C.pillText, border: "1px solid rgba(42, 72, 240, 0.35)" }}
                >
                  {u.tag}
                </div>
                <div
                  className="font-mono text-[0.86rem] mb-3 leading-[1.55]"
                  style={{ color: C.mist }}
                >
                  <span style={{ color: C.brightMist }}>›</span> {u.q}
                </div>
                <p className="text-[0.9rem] leading-[1.65]" style={{ color: C.ash }}>
                  {u.a}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── HOW IT WORKS ─────────────────────── */}
      <section id="how-it-works" style={{ background: C.royalOnyx }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="How it works" />
          <SectionTitle>From channel to cluster in three steps.</SectionTitle>

          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {[
              {
                step: "Step 1",
                title: "Register your environment",
                body:
                  "Connect Confluent Cloud organizations, Kafka and Flink clusters, EKS, and observability sources through an explicit onboarding flow. No auto-discovery — Sariva only operates what you register.",
              },
              {
                step: "Step 2",
                title: "Talk to Sariva",
                body:
                  "Ask questions, request changes, investigate incidents in Slack, CLI, REST, or MCP. Sariva understands streaming-specific concepts and disambiguates across environments before acting. Every action is RBAC-checked and logged.",
              },
              {
                step: "Step 3",
                title: "Execute or review",
                body:
                  "Read operations return instantly with context. Write operations open a pull request against your GitOps repo, with the diff, the rationale, and the runbook reference. You approve. Sariva applies.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-[10px] p-6"
                style={{ background: C.royalCarbon, border: `1px solid ${C.royalBorder}` }}
              >
                <div
                  className="font-mono font-medium text-[0.7rem] uppercase tracking-[0.14em] mb-3"
                  style={{ color: C.brightMist }}
                >
                  {s.step}
                </div>
                <CardTitle>{s.title}</CardTitle>
                <p className="text-[0.9rem] leading-[1.65]" style={{ color: C.ash }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── TRUST & CONTROL ─────────────────────── */}
      <section id="trust" style={{ background: C.royal }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Trust & Control" />
          <SectionTitle>Designed for platform teams that own production.</SectionTitle>

          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {[
              {
                title: "Self-hosted in your VPC",
                body: "Deployed via Helm into your EKS, GKE, or AKS cluster. Data and credentials never leave your perimeter.",
              },
              {
                title: "Explicit registration only",
                body: "No silent cluster discovery, no surprise log access. Every resource Sariva can touch is registered by you.",
              },
              {
                title: "RBAC & audit",
                body: "Role-based authorization per Slack user, mapped to your IdP. Every read and write is structured-logged.",
              },
              {
                title: "No long-lived cloud credentials",
                body: "Deployment Agent commits to GitHub at runtime; cloud credentials live with your CI runners, not the platform.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[10px] p-6"
                style={{ background: C.royalCarbon, border: `1px solid ${C.royalBorder}` }}
              >
                <CardTitle>{item.title}</CardTitle>
                <p className="text-[0.9rem] leading-[1.65]" style={{ color: C.ash }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── CONTACT ─────────────────────── */}
      <section id="contact" style={{ background: C.royalOnyx, borderTop: `1px solid ${C.royalBorderSoft}` }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Contact" />
          <SectionTitle>Get in touch.</SectionTitle>

          <div className="grid md:grid-cols-3 gap-3 mt-10">
            {[
              { label: "General", email: "hello@sariva.ai", hint: "Questions, intros, anything else." },
              { label: "Sales", email: "sales@sariva.ai", hint: "Early access, pricing, design partners." },
              { label: "Help", email: "help@sariva.ai", hint: "Existing customers and pilots." },
            ].map((card) => (
              <a
                key={card.email}
                href={`mailto:${card.email}`}
                className="block rounded-[10px] p-5 transition-transform hover:-translate-y-0.5"
                style={{ background: C.royalCarbon, border: `1px solid ${C.royalBorder}` }}
              >
                <div
                  className="font-mono font-medium text-[0.66rem] uppercase tracking-[0.14em] mb-2"
                  style={{ color: C.ashMuted }}
                >
                  {card.label}
                </div>
                <div className="font-semibold text-[1rem] mb-1.5" style={{ color: C.mist }}>
                  {card.email}
                </div>
                <div className="text-[0.82rem]" style={{ color: C.ash }}>
                  {card.hint}
                </div>
              </a>
            ))}
          </div>

          <div
            className="mt-8 rounded-2xl p-7 md:p-10 relative overflow-hidden"
            style={{
              background: C.royalCarbon,
              border: `1px solid ${C.royalBorder}`,
              boxShadow: "0 0 0 1px rgba(42, 72, 240, 0.14), 0 30px 60px -20px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                top: "-100px",
                right: "-80px",
                width: "320px",
                height: "320px",
                background: "radial-gradient(closest-side, rgba(42, 72, 240, 0.22), transparent)",
              }}
              aria-hidden
            />
            <div className="relative grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div>
                <h3
                  style={{
                    color: C.mist,
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                    marginBottom: "0.5rem",
                  }}
                >
                  Or get notified when we open up.
                </h3>
                <p className="text-[0.9rem] leading-[1.6]" style={{ color: C.ash }}>
                  We&apos;ll email when Sariva is available for new design partners.
                  No marketing list, no noise.
                </p>
              </div>
              <NotifyForm />
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────── FOOTER ─────────────────────── */}
      <footer style={{ background: C.royal, borderTop: `1px solid ${C.royalBorder}` }}>
        <Container className="py-8">
          <div className="grid md:grid-cols-3 gap-4 items-start md:items-center text-center md:text-left">
            <div className="inline-flex items-center gap-2 md:justify-start justify-center">
              <PulseMark size={20} color={C.azul} />
              <span
                style={{ fontSize: "1.05rem", fontWeight: 600, color: C.mist, letterSpacing: "-0.01em" }}
              >
                Sariva
              </span>
            </div>
            <div
              className="font-mono text-[0.72rem] flex flex-col md:items-center gap-0.5"
              style={{ color: C.ashMuted }}
            >
              <span>Sariva Inc. · Ontario, Canada</span>
              <span>© {new Date().getFullYear()} Sariva Inc.</span>
            </div>
            <div className="font-mono text-[0.78rem] md:text-right" style={{ color: C.ash }}>
              <a href="mailto:hello@sariva.ai" className="hover:text-white transition-colors">
                hello@sariva.ai
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
