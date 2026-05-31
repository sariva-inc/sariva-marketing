"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================================
// Sariva — sariva.ai marketing landing page
// Self-contained: drop into app/page.tsx of the Next.js project
// Assumes Tailwind + Geist fonts configured in layout.tsx (v0 default)
// ============================================================================

// ── Palette (Chaldean-aligned) ──────────────────────────────────────────────
const C = {
  cloud: "#FAFAF9",      // root 5 — primary background
  chalk: "#F4F4F1",      // root 5 — soft section background
  surface: "#FFFFFF",    // cards
  ink: "#0A0A0A",        // root 8 — primary text
  ink2: "#262626",       // body emphasis on dark
  ink3: "#525252",       // secondary text, eyebrow labels
  ink4: "#737373",       // tertiary text
  line: "#E5E5E2",       // borders
  azul: "#2A48F0",       // root 8 — accent (Star of the Magi compound 17)
  azulSoft: "#EEF1FE",   // marker highlight
  green: "#16A34A",      // status dot
} as const;

// ── Reusable container — 1180px max-width with fluid padding ────────────────
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-6 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

// ── Section eyebrow ("01" + "PRODUCT") ──────────────────────────────────────
function Eyebrow({ number, label }: { number?: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-9">
      {number && (
        <span
          className="font-mono font-semibold tracking-tight leading-none"
          style={{
            color: C.azul,
            fontSize: "clamp(1.5rem, 2.5vw, 1.85rem)",
          }}
        >
          {number}
        </span>
      )}
      <span
        className="font-mono font-medium uppercase tracking-[0.1em]"
        style={{
          color: C.ink3,
          fontSize: "clamp(0.92rem, 1.1vw, 1.05rem)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Section title (consistent across all sections) ──────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-semibold tracking-[-0.03em] leading-[1.1] max-w-[22ch]"
      style={{ fontSize: "clamp(1.65rem, 3.4vw, 2.55rem)", color: C.ink }}
    >
      {children}
    </h2>
  );
}

// ── Marker-style highlighter for hero "Kafka" and "Flink" ───────────────────
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(transparent 58%, ${C.azulSoft} 58%, ${C.azulSoft} 92%, transparent 92%)`,
      }}
    >
      {children}
    </span>
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
        <div style={{ color: C.ink3 }}>Lag is within normal range. Processing rate ~2.4k msgs/sec.</div>
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
        <div>3 restarts in the last 15 min on <Code>flink-fraud-detector</Code> (cluster <Code>prod-flink-1</Code>).</div>
        <div>Root cause: <B>OOMKilled</B> — task manager hit the 4 GB memory limit.</div>
        <div>Top input: <Code>payment-events</Code> at 8.2k msgs/sec (3× baseline).</div>
        <div>Suggested fix: raise <Code>taskmanager.memory.process.size</Code> from 4 GB → 6 GB.</div>
        <div style={{ color: C.ink3 }}>Want me to open a PR with the change? (<Code>infra/flink/fraud-detector.tf</Code>)</div>
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
        <div>Basic tier · us-east-1 · 3 brokers · KRaft mode · Schema Registry attached</div>
        <div>Cost estimate: <B>~$240 / month</B></div>
        <div>RBAC inherits from <Code>payments-team</Code> group (existing).</div>
        <div style={{ color: C.ink3 }}>I&apos;ll open a PR at <Code>infra/clusters/dev-payments-kafka.tf</Code>. Reply <Code>proceed</Code> and I&apos;ll commit.</div>
      </div>
    ),
  },
];

// ── Avatar — colored square with white initials/letter ──────────────────────
function Avatar({ bg, letters }: { bg: string; letters: string }) {
  return (
    <div
      className="flex-shrink-0 rounded-md flex items-center justify-center font-semibold text-white"
      style={{ background: bg, width: 36, height: 36, fontSize: letters.length === 1 ? 16 : 13 }}
    >
      {letters}
    </div>
  );
}

// ── Slack mock with auto-rotating tabs ──────────────────────────────────────
function SlackMock() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [locked, setLocked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      {/* Tab pills */}
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
              className="px-3.5 py-1.5 rounded-full text-[0.85rem] font-medium transition-colors"
              style={{
                background: isActive ? C.ink : C.chalk,
                color: isActive ? "#FFFFFF" : C.ink3,
                border: isActive ? `1px solid ${C.ink}` : `1px solid ${C.line}`,
              }}
              aria-pressed={isActive}
            >
              {sc.tab}
            </button>
          );
        })}
      </div>

      {/* Slack window */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: C.surface,
          border: `1px solid ${C.line}`,
          transform: "rotate(-0.3deg)",
          boxShadow:
            "0 20px 40px -20px rgba(10,10,10,0.18), 0 50px 100px -40px rgba(42,72,240,0.18)",
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ background: C.chalk, borderBottom: `1px solid ${C.line}` }}
        >
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "#EF4444" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#F59E0B" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#22C55E" }} />
          </div>
          <span className="font-mono text-[0.78rem]" style={{ color: C.ink4 }}>
            #kafka-ops
          </span>
        </div>

        {/* Messages */}
        <div className="p-5 space-y-4 text-[0.92rem]" style={{ color: C.ink2 }}>
          {/* User message */}
          <div className="flex gap-3">
            <Avatar bg={s.user.bg} letters={s.user.initials} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold" style={{ color: C.ink }}>{s.user.name}</span>
                <span className="text-[0.78rem]" style={{ color: C.ink4 }}>{s.user.time}</span>
              </div>
              <div>{s.userMsg}</div>
            </div>
          </div>

          {/* Bot message */}
          <div className="flex gap-3">
            <Avatar bg={C.azul} letters="S" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold" style={{ color: C.ink }}>Sariva</span>
                <span
                  className="text-[0.65rem] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: C.chalk, color: C.ink3 }}
                >
                  APP
                </span>
                <span className="text-[0.78rem]" style={{ color: C.ink4 }}>{s.botTime}</span>
              </div>
              {s.botMsg}
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
    // Simulated submit — replace with real API call later
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
          className="flex-1 px-4 py-3 rounded-md text-[0.95rem] outline-none"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            color: "#FFFFFF",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-md font-medium text-[0.95rem] transition-opacity disabled:opacity-60"
          style={{ background: C.azul, color: "#FFFFFF" }}
        >
          {status === "loading" ? "Sending…" : "Notify me"}
        </button>
      </div>
      {msg && (
        <p
          className="mt-3 text-[0.85rem]"
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
        style={{ background: "rgba(250,250,249,0.85)", borderBottom: `1px solid ${C.line}` }}
      >
        <Container>
          <div className="flex items-center justify-between h-16">
            <a href="#top" className="font-medium text-[1.05rem]" style={{ color: C.ink }}>
              Sariva
            </a>
            <div className="hidden md:flex items-center gap-7 text-[0.9rem]" style={{ color: C.ink3 }}>
              <a href="#product" className="hover:text-black transition-colors">Product</a>
              <a href="#capabilities" className="hover:text-black transition-colors">Capabilities</a>
              <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
              <a href="#contact" className="hover:text-black transition-colors">Contact</a>
            </div>
            <a
              href="#contact"
              className="px-4 py-2 rounded-md text-[0.85rem] font-medium transition-opacity hover:opacity-90"
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
          background: `${C.cloud} radial-gradient(1100px 500px at 85% -10%, ${C.azulSoft} 0%, transparent 60%)`,
        }}
      >
        <Container className="py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="mb-8">
                <span
                  className="inline-flex items-center px-4 py-1.5 rounded-full font-mono font-medium text-[0.82rem] uppercase tracking-[0.1em]"
                  style={{
                    background: C.azulSoft,
                    color: C.azul,
                    border: `1px solid rgba(42,72,240,0.22)`,
                  }}
                >
                  AI Platform · For Streaming Infrastructure
                </span>
              </div>
              <h1
                className="font-semibold tracking-[-0.03em] leading-[1.05] mb-7"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", color: C.ink }}
              >
                Operate <Highlight>Kafka</Highlight> and <Highlight>Flink</Highlight> through conversation.
              </h1>
              <p
                className="text-[1.1rem] leading-[1.6] max-w-[36em] mb-9"
                style={{ color: C.ink3 }}
              >
                Sariva is an AI operator for Apache Kafka and Apache Flink. Available today
                in Slack, CLI, and REST API — Microsoft Teams and web UI on the roadmap.
                Ask questions in plain English. Get answers with context. Execute changes
                with an audit trail.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="px-5 py-3 rounded-md text-[0.95rem] font-medium transition-opacity hover:opacity-90"
                  style={{ background: C.ink, color: "#FFFFFF" }}
                >
                  Get early access →
                </a>
                <a
                  href="mailto:hello@sariva.ai"
                  className="px-5 py-3 rounded-md text-[0.95rem] font-mono font-medium transition-colors"
                  style={{ border: `1px solid ${C.line}`, color: C.ink, background: "transparent" }}
                >
                  hello@sariva.ai
                </a>
              </div>
            </div>

            {/* Right: Slack mock */}
            <div className="w-full">
              <SlackMock />
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────── SECTION 01 · PRODUCT ─────────────────────── */}
      <section id="product" style={{ background: C.cloud }}>
        <Container className="py-20 md:py-28">
          <Eyebrow number="01" label="Product" />
          <SectionTitle>
            The gap between knowing your streaming platform and asking it a question — gone.
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mt-10 text-[1.02rem] leading-[1.7]" style={{ color: C.ink3 }}>
            <p>
              Streaming infrastructure is unforgiving. A consumer group falls behind, a
              Flink job fails over, a Schema Registry compatibility check breaks a deploy
              — and the answer is buried across Confluent Cloud, kubectl, Prometheus,
              CloudWatch, and three Slack threads from last quarter.
            </p>
            <p>
              Sariva sits between your team and the streaming stack. It speaks the
              language of platform engineers — partitions, lag, commits, ACLs, IRSA,
              mTLS, KRaft, retention, FLE — and translates intent into safe, audited
              operations. Self-hosted in your VPC. Explicit about what it touches.
              Never auto-discovers.
            </p>
          </div>
        </Container>
      </section>

      {/* ─────────────────────── SECTION 02 · CAPABILITIES ─────────────────────── */}
      <section id="capabilities" style={{ background: C.chalk }}>
        <Container className="py-20 md:py-28">
          <Eyebrow number="02" label="Capabilities" />
          <SectionTitle>Two agents. One conversation.</SectionTitle>

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {[
              {
                tag: "Observability Agent",
                title: "Ask anything about what's running.",
                body:
                  "Consumer lag, broker health, partition skew, Flink job state, connector status, Schema Registry compatibility, KRaft controller behavior. Pulls live from Confluent Cloud Metrics, Prometheus, Kafka Exporter, CloudWatch — answers in your interface of choice with the metric, the cluster, and the next action.",
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
                  "Topic creation, ACL grants, connector deployment, Flink statement submission, Tableflow, MSK→Confluent Cloud migration. Generates Terraform, opens a pull request in your GitOps repo, and never holds long-lived cloud credentials at runtime.",
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
                  "Validated playbooks for Kafka, Flink, networking, FLE, Tableflow, onboarding, managed connectors — invoked by the agents when a known failure pattern is detected. Tier-promoted only after a second independent occurrence resolves with the procedure.",
                bullets: [
                  "Observability · Deployment · Flink",
                  "Networking · FLE · Tableflow",
                  "Versioned, indexed, tiered",
                  "Extensible per customer",
                ],
              },
            ].map((card, i) => (
              <article
                key={i}
                className="rounded-[10px] p-7 transition-all hover:-translate-y-0.5"
                style={{
                  background: C.surface,
                  border: `1px solid ${C.line}`,
                }}
              >
                <span
                  className="inline-block font-mono font-medium text-[0.7rem] uppercase tracking-[0.08em] px-2 py-1 rounded mb-5"
                  style={{ background: C.azulSoft, color: C.azul }}
                >
                  {card.tag}
                </span>
                <h3 className="text-[1.18rem] font-semibold leading-snug mb-3" style={{ color: C.ink }}>
                  {card.title}
                </h3>
                <p className="text-[0.95rem] leading-[1.65] mb-5" style={{ color: C.ink3 }}>
                  {card.body}
                </p>
                <ul className="font-mono text-[0.82rem] space-y-1.5" style={{ color: C.ink4 }}>
                  {card.bullets.map((b, j) => (
                    <li key={j}>— {b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── SECTION 03 · HOW IT WORKS ─────────────────────── */}
      <section id="how-it-works" style={{ background: C.cloud }}>
        <Container className="py-20 md:py-28">
          <Eyebrow number="03" label="How it works" />
          <SectionTitle>From channel to cluster in three steps.</SectionTitle>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-14 mt-12">
            {[
              {
                n: "01",
                title: "Register your environment",
                body:
                  "Connect Confluent Cloud organizations, Kafka/Flink clusters, EKS, and observability sources through an explicit onboarding flow. No auto-discovery — Sariva only operates what you register.",
              },
              {
                n: "02",
                title: "Talk to Sariva",
                body:
                  "Ask questions, request changes, investigate incidents in Slack, CLI, or via API. Sariva understands streaming-specific concepts and disambiguates across environments before acting. Every action is RBAC-checked and logged.",
              },
              {
                n: "03",
                title: "Execute or review",
                body:
                  "Read operations return instantly with context. Write operations open a pull request against your GitOps repo, with the diff, the rationale, and the runbook reference. You approve. Sariva applies.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div
                  className="font-mono font-semibold text-[1.4rem] mb-3"
                  style={{ color: C.azul }}
                >
                  {s.n}
                </div>
                <h3 className="text-[1.15rem] font-semibold mb-3" style={{ color: C.ink }}>
                  {s.title}
                </h3>
                <p className="text-[0.98rem] leading-[1.65]" style={{ color: C.ink3 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── SECTION 04 · TRUST & CONTROL ─────────────────────── */}
      <section style={{ background: C.chalk }}>
        <Container className="py-20 md:py-28">
          <Eyebrow number="04" label="Trust & Control" />
          <SectionTitle>Designed for platform teams that own production.</SectionTitle>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
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
                className="rounded-[10px] p-7"
                style={{ background: C.surface, border: `1px solid ${C.line}` }}
              >
                <h3 className="text-[1.1rem] font-semibold mb-2.5" style={{ color: C.ink }}>
                  {item.title}
                </h3>
                <p className="text-[0.95rem] leading-[1.65]" style={{ color: C.ink3 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── SECTION 05 · CONTACT ─────────────────────── */}
      <section id="contact" style={{ background: C.cloud }}>
        <Container className="py-20 md:py-28">
          <Eyebrow number="05" label="Contact" />
          <SectionTitle>Get in touch.</SectionTitle>

          {/* Three contact cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {[
              { label: "General", email: "hello@sariva.ai", hint: "Questions, intros, anything else." },
              { label: "Sales", email: "sales@sariva.ai", hint: "Early access, pricing, design partners." },
              { label: "Help", email: "help@sariva.ai", hint: "Existing customers and pilots." },
            ].map((card) => (
              <a
                key={card.email}
                href={`mailto:${card.email}`}
                className="block rounded-[10px] p-6 transition-all hover:-translate-y-0.5"
                style={{ background: C.surface, border: `1px solid ${C.line}` }}
              >
                <div
                  className="font-mono font-medium text-[0.72rem] uppercase tracking-[0.1em] mb-2"
                  style={{ color: C.ink4 }}
                >
                  {card.label}
                </div>
                <div className="font-semibold text-[1.05rem] mb-2" style={{ color: C.ink }}>
                  {card.email}
                </div>
                <div className="text-[0.88rem]" style={{ color: C.ink4 }}>
                  {card.hint}
                </div>
              </a>
            ))}
          </div>

          {/* Notify banner */}
          <div
            className="mt-10 rounded-2xl p-8 md:p-12"
            style={{ background: C.ink }}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
              <div>
                <h3 className="text-[1.5rem] font-semibold leading-snug mb-3" style={{ color: "#FFFFFF" }}>
                  Or get notified when we open up.
                </h3>
                <p className="text-[0.95rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.6)" }}>
                  We&apos;ll email you when Sariva is available for new design partners.
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
        <Container className="py-10">
          <div className="grid md:grid-cols-3 gap-6 items-start md:items-center text-center md:text-left">
            <div className="font-medium text-[1rem]" style={{ color: C.ink }}>
              Sariva
            </div>
            <div className="font-mono text-[0.78rem] flex flex-col md:items-center gap-1" style={{ color: C.ink4 }}>
              <span>Sariva Inc.</span>
              <span>Ontario, Canada</span>
              <span>© {new Date().getFullYear()} Sariva Inc.</span>
            </div>
            <div className="font-mono text-[0.85rem] md:text-right" style={{ color: C.ink3 }}>
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
