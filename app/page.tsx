"use client";

import { useEffect, useRef, useState } from "react";
import { Instrument_Serif } from "next/font/google";

// ============================================================================
// Sariva — sariva.ai marketing landing page (v5)
// Typography fix: Instrument Serif strictly for hero h1 + section h2 only.
// Card titles in Geist semibold. Single italic accent in hero only.
// Competitive section reframed educational (not aggressive). Interceptor
// roadmap surfaced on the Datadog card per D-22-AJ.
// ============================================================================

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// ── Palette ─────────────────────────────────────────────────────────────────
const C = {
  cloud: "#FAFAF9",
  chalk: "#F4F4F1",
  surface: "#FFFFFF",
  ink: "#0A0A0A",
  ink2: "#262626",
  ink3: "#525252",
  ink4: "#737373",
  line: "#E5E5E2",
  lineSoft: "#EFEFEC",
  azul: "#2A48F0",
  azulDeep: "#1E36C9",
  azulSoft: "#EEF1FE",
  green: "#16A34A",
} as const;

// ── Container ───────────────────────────────────────────────────────────────
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-6 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

// ── PulseMark — 3-ring Pulse glyph, stronger contrast (D-22-AN) ─────────────
function PulseMark({ size = 22, color = C.azul }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <circle cx="12" cy="12" r="10.5" fill="none" stroke={color} strokeWidth="1.25" opacity="0.28" />
      <circle cx="12" cy="12" r="7" fill="none" stroke={color} strokeWidth="1.25" opacity="0.6" />
      <circle cx="12" cy="12" r="3.25" fill={color} />
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
        style={{ color: C.ink3, fontSize: "0.76rem" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── SectionTitle — Instrument Serif, h2 only ────────────────────────────────
function SectionTitle({ children, maxCh = 22 }: { children: React.ReactNode; maxCh?: number }) {
  return (
    <h2
      className={instrumentSerif.className}
      style={{
        fontSize: "clamp(1.85rem, 3vw, 2.6rem)",
        fontWeight: 400,
        letterSpacing: "-0.015em",
        lineHeight: 1.12,
        color: C.ink,
        maxWidth: `${maxCh}ch`,
      }}
    >
      {children}
    </h2>
  );
}

// ── CardTitle — Geist semibold (assertive, technical) ───────────────────────
function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: "1.05rem",
        fontWeight: 600,
        letterSpacing: "-0.005em",
        lineHeight: 1.35,
        color: C.ink,
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
    style={{ background: C.chalk, border: `1px solid ${C.line}`, color: C.ink2 }}
  >
    {children}
  </code>
);

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold" style={{ color: C.ink }}>{children}</strong>
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
        <div style={{ color: C.ink3 }}>Lag within normal range. Processing ~2.4k msgs/sec.</div>
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
        <div style={{ color: C.ink3 }}>Want me to open a PR? (<Code>infra/flink/fraud-detector.tf</Code>)</div>
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
        <div style={{ color: C.ink3 }}>PR at <Code>infra/clusters/dev-payments-kafka.tf</Code>. Reply <Code>proceed</Code> to commit.</div>
      </div>
    ),
  },
];

// ── Avatar ──────────────────────────────────────────────────────────────────
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

// ── Slack mock ──────────────────────────────────────────────────────────────
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
                background: isActive ? C.ink : "transparent",
                color: isActive ? "#FFFFFF" : C.ink3,
                border: `1px solid ${isActive ? C.ink : C.line}`,
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
          background: C.surface,
          border: `1px solid ${C.line}`,
          boxShadow:
            "0 24px 48px -24px rgba(10,10,10,0.16), 0 60px 120px -50px rgba(42,72,240,0.16)",
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ background: C.chalk, borderBottom: `1px solid ${C.line}` }}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22C55E" }} />
          </div>
          <span className="font-mono text-[0.72rem]" style={{ color: C.ink4 }}>
            #kafka-ops
          </span>
        </div>

        <div className="p-5 space-y-4 text-[0.88rem]" style={{ color: C.ink2 }}>
          <div className="flex gap-3">
            <Avatar bg={s.user.bg} letters={s.user.initials} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold" style={{ color: C.ink }}>{s.user.name}</span>
                <span className="text-[0.72rem]" style={{ color: C.ink4 }}>{s.user.time}</span>
              </div>
              <div className="leading-[1.55]">{s.userMsg}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Avatar bg={C.azul} letters="S" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold" style={{ color: C.ink }}>Sariva</span>
                <span
                  className="text-[0.6rem] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: C.chalk, color: C.ink3 }}
                >
                  APP
                </span>
                <span className="text-[0.72rem]" style={{ color: C.ink4 }}>{s.botTime}</span>
              </div>
              <div className="leading-[1.55]">{s.botMsg}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Notify form ─────────────────────────────────────────────────────────────
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
          className="flex-1 px-4 py-3 rounded-md text-[0.92rem] outline-none"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            color: "#FFFFFF",
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

// ────────────────────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div className="font-sans antialiased" style={{ background: C.cloud, color: C.ink }}>
      {/* ─────────────────────── NAV ─────────────────────── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(250,250,249,0.82)", borderBottom: `1px solid ${C.line}` }}
      >
        <Container>
          <div className="flex items-center justify-between h-14">
            <a href="#top" className="inline-flex items-center gap-2.5" style={{ color: C.ink }}>
              <PulseMark size={22} color={C.azul} />
              <span
                className={instrumentSerif.className}
                style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "-0.01em" }}
              >
                Sariva
              </span>
            </a>
            <div className="hidden md:flex items-center gap-7 text-[0.88rem]" style={{ color: C.ink3 }}>
              <a href="#product" className="hover:text-black transition-colors">Product</a>
              <a href="#capabilities" className="hover:text-black transition-colors">Capabilities</a>
              <a href="#coverage" className="hover:text-black transition-colors">Coverage</a>
              <a href="#different" className="hover:text-black transition-colors">Why Sariva</a>
              <a href="#use-cases" className="hover:text-black transition-colors">Use cases</a>
              <a href="#contact" className="hover:text-black transition-colors">Contact</a>
            </div>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-md text-[0.82rem] font-medium transition-opacity hover:opacity-90"
              style={{ background: C.ink, color: "#FFFFFF" }}
            >
              Get early access
            </a>
          </div>
        </Container>
      </nav>

      {/* ─────────────────────── HERO ─────────────────────── */}
      <section
        id="top"
        className="relative overflow-hidden"
        style={{
          background: `${C.cloud} radial-gradient(900px 420px at 88% -10%, ${C.azulSoft} 0%, transparent 55%)`,
        }}
      >
        <Container className="pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="mb-6">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full font-mono font-semibold text-[0.72rem] uppercase tracking-[0.16em]"
                  style={{
                    background: C.azulSoft,
                    color: C.azul,
                    border: `1px solid rgba(42,72,240,0.22)`,
                  }}
                >
                  Ops AI · Kafka &amp; Flink
                </span>
              </div>
              <h1
                className={instrumentSerif.className}
                style={{
                  fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.08,
                  color: C.ink,
                  marginBottom: "1.5rem",
                }}
              >
                Operate{" "}
                <span style={{ color: C.azul }}>Kafka</span>
                {" "}and{" "}
                <span style={{ color: C.azul }}>Flink</span>
                {" "}through <em style={{ fontStyle: "italic" }}>conversation</em>.
              </h1>
              <p
                className="leading-[1.65] max-w-[38em] mb-7"
                style={{ fontSize: "1rem", color: C.ink3 }}
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
                  style={{ background: C.ink, color: "#FFFFFF" }}
                >
                  Get early access →
                </a>
                <a
                  href="mailto:hello@sariva.ai"
                  className="px-4 py-2.5 rounded-md text-[0.9rem] font-mono font-medium transition-colors hover:bg-[#F4F4F1]"
                  style={{ border: `1px solid ${C.line}`, color: C.ink, background: "transparent" }}
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
      <section id="product" style={{ background: C.cloud, borderTop: `1px solid ${C.lineSoft}` }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="The problem" />
          <SectionTitle maxCh={26}>
            Streaming ops is harder than it looks.
          </SectionTitle>

          <p
            className="mt-6 leading-[1.7] max-w-[62ch]"
            style={{ fontSize: "1.02rem", color: C.ink3 }}
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
                  style={{ color: C.azul, fontSize: "0.74rem" }}
                >
                  {p.tag}
                </div>
                <p className="leading-[1.65]" style={{ fontSize: "0.94rem", color: C.ink3 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mt-12 leading-[1.7] max-w-[62ch]"
            style={{ fontSize: "1.02rem", color: C.ink2 }}
          >
            Sariva collapses these three problems into one interface — conversation,
            with full context, every action audited, every change executed through your
            GitOps repo. It speaks the language of platform engineers — partitions, lag,
            commits, ACLs, IRSA, mTLS, KRaft, retention, FLE, Tableflow — and translates
            intent into safe, reversible operations.
          </p>
        </Container>
      </section>

      {/* ─────────────────────── CAPABILITIES ─────────────────────── */}
      <section id="capabilities" style={{ background: C.chalk }}>
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
                style={{
                  background: C.surface,
                  border: `1px solid ${C.line}`,
                }}
              >
                <span
                  className="inline-block font-mono font-medium text-[0.66rem] uppercase tracking-[0.12em] px-2 py-1 rounded mb-4"
                  style={{ background: C.azulSoft, color: C.azul }}
                >
                  {card.tag}
                </span>
                <CardTitle>{card.title}</CardTitle>
                <p className="text-[0.9rem] leading-[1.6] mb-4" style={{ color: C.ink3 }}>
                  {card.body}
                </p>
                <ul className="font-mono text-[0.78rem] space-y-1.5" style={{ color: C.ink4 }}>
                  {card.bullets.map((b, j) => (
                    <li key={j}>— {b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── COVERAGE ─────────────────────── */}
      <section id="coverage" style={{ background: C.cloud }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Coverage" />
          <SectionTitle maxCh={28}>
            Built for the full Kafka and Flink stack.
          </SectionTitle>
          <p
            className="mt-5 leading-[1.65] max-w-[58ch]"
            style={{ fontSize: "0.95rem", color: C.ink3 }}
          >
            Multi-flavor, multi-cloud, multi-channel. No other operator covers this
            surface — PrivateLink, FLE, Flink ops, and Tableflow are where competitors
            stop.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
            {[
              {
                title: "Streaming platforms",
                body:
                  "Confluent Cloud · Confluent Platform · Apache Kafka · AWS MSK · Strimzi · CFK · Redpanda.",
              },
              {
                title: "Stream processing",
                body:
                  "Apache Flink · Confluent Flink · Tableflow + Iceberg · Schema Registry · Confluent Connect.",
              },
              {
                title: "Networking",
                body:
                  "PrivateLink · VPC Peering · Transit Gateway · mTLS · IRSA. End-to-end connectivity diagnosis.",
              },
              {
                title: "Security & encryption",
                body:
                  "Field Level Encryption (FLE) · RBAC · ACLs · API key rotation · KMS integration.",
              },
              {
                title: "Interfaces",
                body:
                  "Slack · CLI · REST API · MCP server for Claude Code, Cursor, and Confluent Streaming Agents.",
              },
              {
                title: "Deployment",
                body:
                  "Helm chart on customer EKS · Terraform · GitOps pull-request flow · multi-cloud (AWS, GCP, Azure).",
              },
            ].map((tile, i) => (
              <div
                key={i}
                className="rounded-[10px] p-5"
                style={{ background: C.surface, border: `1px solid ${C.line}` }}
              >
                <div
                  className="font-mono font-medium text-[0.68rem] uppercase tracking-[0.14em] mb-2"
                  style={{ color: C.azul }}
                >
                  {tile.title}
                </div>
                <p className="text-[0.88rem] leading-[1.6]" style={{ color: C.ink3 }}>
                  {tile.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── WHY SARIVA (reframed — educational) ─────────────────────── */}
      <section id="different" style={{ background: C.chalk }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Why Sariva" />
          <SectionTitle maxCh={30}>
            A different layer of the stack.
          </SectionTitle>
          <p
            className="mt-6 leading-[1.7] max-w-[62ch]"
            style={{ fontSize: "1rem", color: C.ink3 }}
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
                them: "Lenses · Control Center",
                title: "UIs visualize. Sariva resolves.",
                body:
                  "Lenses.io, Confluent Control Center, and Kafka UI are excellent at showing topology, lag charts, message browsers, and lineage. They tell you what's running. Sariva is the autonomous operator that responds when the dashboard turns red — investigates root cause, applies the right runbook, drafts the PR, and ships the fix.",
              },
              {
                vs: "vs Observability suites",
                them: "Datadog DSM · Grafana",
                title: "Observability informs. Sariva acts.",
                body:
                  "Datadog DSM traces messages through pipelines with per-stage latency — powerful, but it requires the full Datadog APM stack and bills per host. Sariva consumes your existing observability as input today. Post-beta we ship native end-to-end app tracing via Kafka client interceptors — one config line per app, no code change, no per-host pricing — bundled into the operations layer.",
              },
            ].map((c, i) => (
              <article
                key={i}
                className="rounded-[10px] p-6"
                style={{ background: C.surface, border: `1px solid ${C.line}` }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span
                    className="font-mono font-medium text-[0.66rem] uppercase tracking-[0.12em] px-2 py-1 rounded"
                    style={{ background: C.azulSoft, color: C.azul }}
                  >
                    {c.vs}
                  </span>
                  <span
                    className="font-mono text-[0.7rem]"
                    style={{ color: C.ink4 }}
                  >
                    {c.them}
                  </span>
                </div>
                <CardTitle>{c.title}</CardTitle>
                <p className="text-[0.9rem] leading-[1.65]" style={{ color: C.ink3 }}>
                  {c.body}
                </p>
              </article>
            ))}
          </div>

          <p
            className="mt-10 leading-[1.65] max-w-[62ch]"
            style={{ fontSize: "0.98rem", color: C.ink2 }}
          >
            Sariva isn&apos;t a gateway, a dashboard, or a metrics tier. We operate
            across all of them.
          </p>
        </Container>
      </section>

      {/* ─────────────────────── CONFLUENT ECOSYSTEM ─────────────────────── */}
      <section style={{ background: C.cloud }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Confluent ecosystem" />
          <SectionTitle maxCh={32}>
            Sariva operates the platform. Streaming Agents run on it.
          </SectionTitle>
          <p
            className="mt-6 leading-[1.7] max-w-[64ch]"
            style={{ fontSize: "1rem", color: C.ink3 }}
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
                style={{ background: C.surface, border: `1px solid ${C.line}` }}
              >
                <div
                  className="font-mono font-medium text-[0.68rem] uppercase tracking-[0.14em] mb-3"
                  style={{ color: C.azul }}
                >
                  {tile.tag}
                </div>
                <p className="text-[0.92rem] leading-[1.65]" style={{ color: C.ink3 }}>
                  {tile.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── USE CASES ─────────────────────── */}
      <section id="use-cases" style={{ background: C.chalk }}>
        <Container className="py-16 md:py-20">
          <Eyebrow label="Use cases" />
          <SectionTitle maxCh={28}>
            What it looks like in practice.
          </SectionTitle>
          <p
            className="mt-5 leading-[1.65] max-w-[58ch]"
            style={{ fontSize: "0.95rem", color: C.ink3 }}
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
                style={{ background: C.surface, border: `1px solid ${C.line}` }}
              >
                <div
                  className="font-mono font-medium text-[0.66rem] uppercase tracking-[0.12em] mb-4 inline-block px-2 py-1 rounded"
                  style={{ background: C.azulSoft, color: C.azul }}
                >
                  {u.tag}
                </div>
                <div
                  className="font-mono text-[0.86rem] mb-3 leading-[1.55]"
                  style={{ color: C.ink }}
                >
                  <span style={{ color: C.azul }}>›</span> {u.q}
                </div>
                <p className="text-[0.9rem] leading-[1.65]" style={{ color: C.ink3 }}>
                  {u.a}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── HOW IT WORKS ─────────────────────── */}
      <section id="how-it-works" style={{ background: C.cloud }}>
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
                style={{ background: C.surface, border: `1px solid ${C.line}` }}
              >
                <div
                  className="font-mono font-medium text-[0.7rem] uppercase tracking-[0.14em] mb-3"
                  style={{ color: C.azul }}
                >
                  {s.step}
                </div>
                <CardTitle>{s.title}</CardTitle>
                <p className="text-[0.9rem] leading-[1.65]" style={{ color: C.ink3 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── TRUST & CONTROL ─────────────────────── */}
      <section style={{ background: C.chalk }}>
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
                style={{ background: C.surface, border: `1px solid ${C.line}` }}
              >
                <CardTitle>{item.title}</CardTitle>
                <p className="text-[0.9rem] leading-[1.65]" style={{ color: C.ink3 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── CONTACT ─────────────────────── */}
      <section id="contact" style={{ background: C.cloud, borderTop: `1px solid ${C.lineSoft}` }}>
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
                style={{ background: C.surface, border: `1px solid ${C.line}` }}
              >
                <div
                  className="font-mono font-medium text-[0.66rem] uppercase tracking-[0.14em] mb-2"
                  style={{ color: C.ink4 }}
                >
                  {card.label}
                </div>
                <div className="font-semibold text-[1rem] mb-1.5" style={{ color: C.ink }}>
                  {card.email}
                </div>
                <div className="text-[0.82rem]" style={{ color: C.ink4 }}>
                  {card.hint}
                </div>
              </a>
            ))}
          </div>

          <div
            className="mt-8 rounded-2xl p-7 md:p-10"
            style={{ background: C.ink }}
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                    marginBottom: "0.5rem",
                  }}
                >
                  Or get notified when we open up.
                </h3>
                <p className="text-[0.9rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.6)" }}>
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
      <footer style={{ background: C.cloud, borderTop: `1px solid ${C.line}` }}>
        <Container className="py-8">
          <div className="grid md:grid-cols-3 gap-4 items-start md:items-center text-center md:text-left">
            <div className="inline-flex items-center gap-2 md:justify-start justify-center">
              <PulseMark size={20} color={C.azul} />
              <span
                className={instrumentSerif.className}
                style={{ fontSize: "1.1rem", fontWeight: 400, color: C.ink, letterSpacing: "-0.01em" }}
              >
                Sariva
              </span>
            </div>
            <div className="font-mono text-[0.72rem] flex flex-col md:items-center gap-0.5" style={{ color: C.ink4 }}>
              <span>Sariva Inc. · Ontario, Canada</span>
              <span>© {new Date().getFullYear()} Sariva Inc.</span>
            </div>
            <div className="font-mono text-[0.78rem] md:text-right" style={{ color: C.ink3 }}>
              <a href="mailto:hello@sariva.ai" className="hover:text-black transition-colors">
                hello@sariva.ai
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
