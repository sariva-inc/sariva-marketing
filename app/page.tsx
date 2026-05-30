'use client'

import { useState, useEffect } from 'react'

const BrandMark = ({ size = 24 }: { size?: number }) => (
  <div
    className="rounded-md bg-[#0a0a0a]"
    style={{ width: size, height: size }}
    aria-label="Sariva brand mark"
  />
)

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 h-16 bg-[#fafaf9] backdrop-blur-md border-b border-[#e5e5e2]">
      <div className="max-w-container mx-auto px-section h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandMark size={24} />
          <span className="text-base font-medium text-[#0a0a0a]">Sariva</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#product" className="text-sm text-[#525252] hover:text-[#0a0a0a] transition-colors">
            Product
          </a>
          <a href="#capabilities" className="text-sm text-[#525252] hover:text-[#0a0a0a] transition-colors">
            Capabilities
          </a>
          <a href="#how-it-works" className="text-sm text-[#525252] hover:text-[#0a0a0a] transition-colors">
            How it works
          </a>
          <a href="#contact" className="text-sm text-[#525252] hover:text-[#0a0a0a] transition-colors">
            Contact
          </a>
        </div>

        <a
          href="#contact"
          className="px-4 py-2 bg-[#0a0a0a] text-white text-sm font-medium rounded-[6px] hover:bg-[#262626] transition-colors"
        >
          Get early access
        </a>
      </div>
    </nav>
  )
}

const Hero = () => {
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const scenarios = [
    {
      title: 'Observability',
      user: { name: 'Julia Kim', avatar: 'JK', color: '#F97316', time: '10:42 AM' },
      messages: [
        {
          type: 'user',
          text: '@Sariva what\'s the consumer lag on `orders-topic` in production?',
        },
        {
          type: 'sariva',
          text: (
            <div>
              <div>Here's the current consumer lag for `orders-topic`:</div>
              <div className="mt-2 text-sm">
                <div>Cluster: `prod-kafka-cluster` · Consumer group: `order-processor`</div>
                <div className="mt-1">Total lag: <strong>1,247 messages</strong> · Partitions: 12 / 12 assigned ·</div>
                <div>Status: <span style={{ color: '#16a34a' }}>●</span> Healthy (green dot)</div>
                <div className="mt-1">Lag is within normal range. Processing rate ~2.4k msgs/sec.</div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      title: 'Troubleshooting',
      user: { name: 'Devon Patel', avatar: 'DP', color: '#14B8A6', time: '11:18 AM' },
      messages: [
        {
          type: 'user',
          text: '@Sariva why is `flink-fraud-detector` restarting?',
        },
        {
          type: 'sariva',
          text: (
            <div>
              <div>3 restarts in the last 15 min on `flink-fraud-detector` (cluster `prod-flink-1`).</div>
              <div className="mt-2 text-sm">
                <div>Root cause: <strong>OOMKilled</strong> — task manager hit the 4 GB memory limit.</div>
                <div className="mt-1">Top input: `payment-events` at 8.2k msgs/sec (3× baseline).</div>
                <div className="mt-1">Suggested fix: raise `taskmanager.memory.process.size` from 4 GB → 6 GB.</div>
                <div className="mt-1">Want me to open a PR with the change? (`infra/flink/fraud-detector.tf`)</div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      title: 'Provisioning',
      user: { name: 'Maya Chen', avatar: 'MC', color: '#e11d48', time: '2:04 PM' },
      messages: [
        {
          type: 'user',
          text: '@Sariva create a dev Kafka cluster for the payments team',
        },
        {
          type: 'sariva',
          text: (
            <div>
              <div>Planning `dev-payments-kafka`:</div>
              <div className="mt-2 text-sm">
                <div>Basic tier · us-east-1 · 3 brokers · KRaft mode · Schema Registry attached</div>
                <div className="mt-1">Cost estimate: <strong>~$240 / month</strong></div>
                <div className="mt-1">RBAC inherits from `payments-team` group (existing).</div>
                <div className="mt-1">I'll open a PR at `infra/clusters/dev-payments-kafka.tf`. Reply `proceed` and I'll commit.</div>
              </div>
            </div>
          ),
        },
      ],
    },
  ]

  const currentScenario = scenarios[activeTab]

  return (
    <section className="bg-[#fafaf9] relative overflow-hidden py-section px-section">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1100px 500px at 85% -10%, rgba(238, 241, 254, 0.6) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-container mx-auto relative z-10">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div>
            <div className="eyebrow mb-4">AI PLATFORM · FOR STREAMING INFRASTRUCTURE</div>

            <h1 className="text-[clamp(2.4rem,9vw,4.2rem)] leading-[1.05] tracking-[-0.03em] font-semibold text-[#0a0a0a] mb-6">
              Operate <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#eef1fe] -z-10" style={{ height: '0.36em', top: '0.45em' }}>
                </span>
                Kafka
              </span>
              {' '}and <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#eef1fe] -z-10" style={{ height: '0.36em', top: '0.45em' }}>
                </span>
                Flink
              </span>
              {' '}through conversation.
            </h1>

            <p className="text-[1.15rem] text-[#525252] leading-relaxed max-w-[36em] mb-8">
              Sariva is an AI operator for Apache Kafka and Apache Flink. Available today in Slack, CLI, and REST API — Microsoft Teams and web UI on the roadmap. Ask questions in plain English. Get answers with context. Execute changes with an audit trail.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href="#contact"
                className="px-5 py-3 bg-[#0a0a0a] text-white font-medium text-sm rounded-[6px] hover:bg-[#262626] transition-colors"
              >
                Get early access →
              </a>
              <a
                href="mailto:hello@sariva.ai"
                className="px-5 py-3 border border-[#e5e5e2] text-[#0a0a0a] font-medium text-sm rounded-[6px] font-mono hover:border-[#0a0a0a] transition-colors"
              >
                hello@sariva.ai
              </a>
            </div>
          </div>

          {/* Right Column - Slack Mock */}
          <div className="hidden md:block">
            {/* Tabs */}
            <div className="flex gap-3 mb-6">
              {scenarios.map((scenario, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    activeTab === idx
                      ? 'bg-[#0a0a0a] text-white'
                      : 'bg-[#f4f4f1] text-[#525252] hover:bg-[#e5e5e2]'
                  }`}
                  aria-pressed={activeTab === idx}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            {/* Slack Window */}
            <div
              className="bg-white border border-[#e5e5e2] rounded-2xl shadow-lg overflow-hidden"
              style={{
                boxShadow: '0 20px 40px -20px rgba(10,10,10,0.18), 0 50px 100px -40px rgba(42,72,240,0.18)',
                transform: 'rotate(-0.3deg)',
              }}
            >
              {/* Chrome */}
              <div className="bg-[#f4f4f1] border-b border-[#e5e5e2] px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-xs text-[#737373]">#kafka-ops</div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 text-sm" style={{ minHeight: '280px' }}>
                {currentScenario.messages.map((msg, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                      style={{ backgroundColor: msg.type === 'user' ? currentScenario.user.color : '#2a48f0' }}
                    >
                      {msg.type === 'user' ? currentScenario.user.avatar : 'S'}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#0a0a0a]">
                        {msg.type === 'user' ? currentScenario.user.name : 'Sariva'}
                        {msg.type === 'sariva' && <span className="text-[#737373] font-normal ml-2">APP</span>}
                        <span className="text-[#737373] font-normal ml-2 text-xs">
                          {msg.type === 'user' ? currentScenario.user.time : currentScenario.user.time}
                        </span>
                      </div>
                      <div className="text-[#525252] mt-1 font-family-sans">{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Section01Product = () => {
  return (
    <section id="product" className="bg-[#fafaf9] py-section px-section">
      <div className="max-w-container mx-auto">
        <div className="flex gap-2 items-baseline mb-6">
          <span className="section-number">01</span>
          <span className="eyebrow">PRODUCT</span>
        </div>

        <h2 className="text-[clamp(1.65rem,5vw,2.55rem)] leading-[1.1] tracking-[-0.03em] font-semibold text-[#0a0a0a] mb-12 max-w-[22ch]">
          The gap between knowing your streaming platform and asking it a question — gone.
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <p className="text-base leading-relaxed text-[#525252]">
            Streaming infrastructure is unforgiving. A consumer group falls behind, a Flink job fails over, a Schema Registry compatibility check breaks a deploy — and the answer is buried across Confluent Cloud, kubectl, Prometheus, CloudWatch, and three Slack threads from last quarter.
          </p>
          <p className="text-base leading-relaxed text-[#525252]">
            Sariva sits between your team and the streaming stack. It speaks the language of platform engineers — partitions, lag, commits, ACLs, IRSA, mTLS, KRaft, retention, FLE — and translates intent into safe, audited operations. Self-hosted in your VPC. Explicit about what it touches. Never auto-discovers.
          </p>
        </div>
      </div>
    </section>
  )
}

const Section02Capabilities = () => {
  const cards = [
    {
      tag: 'OBSERVABILITY AGENT',
      title: 'Ask anything about what\'s running.',
      body: 'Consumer lag, broker health, partition skew, Flink job state, connector status, Schema Registry compatibility, KRaft controller behavior. Pulls live from Confluent Cloud Metrics, Prometheus, Kafka Exporter, CloudWatch — answers in your interface of choice with the metric, the cluster, and the next action.',
      features: [
        'Live consumer group lag',
        'Broker & cluster health',
        'Flink job & checkpoint state',
        'Opt-in proactive alerts',
      ],
    },
    {
      tag: 'DEPLOYMENT AGENT',
      title: 'Make changes safely, with an audit trail.',
      body: 'Topic creation, ACL grants, connector deployment, Flink statement submission, Tableflow, MSK→Confluent Cloud migration. Generates Terraform, opens a pull request in your GitOps repo, and never holds long-lived cloud credentials at runtime.',
      features: [
        'Terraform-backed, multi-cloud',
        'GitOps pull-request flow',
        'RBAC enforced, fully audited',
        'Capability intake lifecycle',
      ],
    },
    {
      tag: 'KNOWLEDGE BASE',
      title: 'Runbooks that ship with the platform.',
      body: 'Validated playbooks for Kafka, Flink, networking, FLE, Tableflow, onboarding, managed connectors — invoked by the agents when a known failure pattern is detected. Tier-promoted only after a second independent occurrence resolves with the procedure.',
      features: [
        'Observability · Deployment · Flink',
        'Networking · FLE · Tableflow',
        'Versioned, indexed, tiered',
        'Extensible per customer',
      ],
    },
  ]

  return (
    <section id="capabilities" className="bg-[#f4f4f1] py-section px-section">
      <div className="max-w-container mx-auto">
        <div className="flex gap-2 items-baseline mb-6">
          <span className="section-number">02</span>
          <span className="eyebrow">CAPABILITIES</span>
        </div>

        <h2 className="text-[clamp(1.65rem,5vw,2.55rem)] leading-[1.1] tracking-[-0.03em] font-semibold text-[#0a0a0a] mb-12 max-w-[22ch]">
          Two agents. One conversation.
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e5e5e2] rounded-[10px] p-8 hover:translate-y-[-2px] hover:border-[#0a0a0a] transition-all"
            >
              <div className="inline-block bg-[#eef1fe] text-[#2a48f0] px-3 py-1 rounded-[3px] font-mono text-xs font-medium mb-4">
                {card.tag}
              </div>
              <h3 className="font-semibold text-[#0a0a0a] text-lg mb-3">{card.title}</h3>
              <p className="text-sm text-[#525252] leading-relaxed mb-6">{card.body}</p>
              <div className="space-y-2">
                {card.features.map((feature, fidx) => (
                  <div key={fidx} className="text-xs font-mono text-[#737373] flex gap-2">
                    <span>–</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Section03HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Register your environment',
      body: 'Connect Confluent Cloud organizations, Kafka/Flink clusters, EKS, and observability sources through an explicit onboarding flow. No auto-discovery — Sariva only operates what you register.',
    },
    {
      number: '02',
      title: 'Talk to Sariva',
      body: 'Ask questions, request changes, investigate incidents in Slack, CLI, or via API. Sariva understands streaming-specific concepts and disambiguates across environments before acting. Every action is RBAC-checked and logged.',
    },
    {
      number: '03',
      title: 'Execute or review',
      body: 'Read operations return instantly with context. Write operations open a pull request against your GitOps repo, with the diff, the rationale, and the runbook reference. You approve. Sariva applies.',
    },
  ]

  return (
    <section id="how-it-works" className="bg-[#fafaf9] py-section px-section">
      <div className="max-w-container mx-auto">
        <div className="flex gap-2 items-baseline mb-6">
          <span className="section-number">03</span>
          <span className="eyebrow">HOW IT WORKS</span>
        </div>

        <h2 className="text-[clamp(1.65rem,5vw,2.55rem)] leading-[1.1] tracking-[-0.03em] font-semibold text-[#0a0a0a] mb-12 max-w-[22ch]">
          From channel to cluster in three steps.
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx}>
              <div className="text-4xl font-mono font-medium text-[#2a48f0] mb-4">{step.number}</div>
              <h3 className="font-semibold text-[#0a0a0a] text-lg mb-3">{step.title}</h3>
              <p className="text-sm text-[#525252] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Section04TrustControl = () => {
  const items = [
    {
      title: 'Self-hosted in your VPC',
      body: 'Deployed via Helm into your EKS, GKE, or AKS cluster. Data and credentials never leave your perimeter.',
    },
    {
      title: 'Explicit registration only',
      body: 'No silent cluster discovery, no surprise log access. Every resource Sariva can touch is registered by you.',
    },
    {
      title: 'RBAC & audit',
      body: 'Role-based authorization per Slack user, mapped to your IdP. Every read and write is structured-logged.',
    },
    {
      title: 'No long-lived cloud credentials',
      body: 'Deployment Agent commits to GitHub at runtime; cloud credentials live with your CI runners, not the platform.',
    },
  ]

  return (
    <section className="bg-[#f4f4f1] py-section px-section">
      <div className="max-w-container mx-auto">
        <div className="flex gap-2 items-baseline mb-6">
          <span className="section-number">04</span>
          <span className="eyebrow">TRUST & CONTROL</span>
        </div>

        <h2 className="text-[clamp(1.65rem,5vw,2.55rem)] leading-[1.1] tracking-[-0.03em] font-semibold text-[#0a0a0a] mb-12 max-w-[22ch]">
          Designed for platform teams that own production.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e5e5e2] rounded-[10px] p-8 hover:border-[#0a0a0a] transition-all"
            >
              <h3 className="font-semibold text-[#0a0a0a] text-base mb-3">{item.title}</h3>
              <p className="text-sm text-[#525252] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Section05Contact = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="bg-[#fafaf9] py-section px-section">
      <div className="max-w-container mx-auto">
        <div className="flex gap-2 items-baseline mb-6">
          <span className="section-number">05</span>
          <span className="eyebrow">CONTACT</span>
        </div>

        <h2 className="text-[clamp(1.65rem,5vw,2.55rem)] leading-[1.1] tracking-[-0.03em] font-semibold text-[#0a0a0a] mb-12">
          Get in touch.
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'GENERAL', email: 'hello@sariva.ai', hint: 'Questions, intros, anything else.' },
            { label: 'SALES', email: 'sales@sariva.ai', hint: 'Early access, pricing, design partners.' },
            { label: 'HELP', email: 'help@sariva.ai', hint: 'Existing customers and pilots.' },
          ].map((contact, idx) => (
            <a
              key={idx}
              href={`mailto:${contact.email}`}
              className="block bg-white border border-[#e5e5e2] rounded-[10px] p-8 hover:border-[#0a0a0a] transition-all"
            >
              <div className="font-mono text-xs font-medium uppercase text-[#737373] mb-3">{contact.label}</div>
              <div className="text-base font-semibold text-[#0a0a0a] mb-1">{contact.email}</div>
              <div className="text-xs text-[#737373]">{contact.hint}</div>
            </a>
          ))}
        </div>

        {/* Notify Banner */}
        <div className="bg-[#0a0a0a] rounded-2xl p-[clamp(2rem,4vw,3rem)] text-white">
          <div className="grid md:grid-cols-[1fr_1fr] gap-8">
            <div>
              <h3 className="text-[1.5rem] font-semibold mb-3">Or get notified when we open up.</h3>
              <p className="text-sm opacity-60">We'll email you when Sariva is available for new design partners. No marketing list, no noise.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="hello@company.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-white/[0.06] border border-[#525252] rounded-[6px] text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-3 bg-[#2a48f0] text-white font-medium rounded-[6px] hover:bg-[#1a3bd4] disabled:opacity-60 transition-colors"
              >
                {status === 'loading' ? 'Sending...' : 'Notify me'}
              </button>
              {status === 'success' && (
                <div className="text-sm text-green-400">Thanks — we'll be in touch.</div>
              )}
              {status === 'error' && (
                <div className="text-sm text-red-400">Please enter a valid email.</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-[#fafaf9] border-t border-[#e5e5e2] py-10 px-section">
      <div className="max-w-container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex items-center gap-3">
            <BrandMark size={40} />
            <span className="font-medium text-[#0a0a0a]">Sariva</span>
          </div>

          <div className="space-y-2 text-xs font-mono text-[#737373]">
            <div className="font-medium text-[#0a0a0a]">Sariva Inc.</div>
            <div>Ontario, Canada</div>
            <div>© 2026 Sariva Inc.</div>
          </div>

          <a
            href="mailto:hello@sariva.ai"
            className="font-mono text-sm text-[#525252] hover:text-[#0a0a0a] transition-colors text-right md:text-left"
          >
            hello@sariva.ai
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <>
      <Nav />
      <main className="bg-[#fafaf9]">
        <Hero />
        <Section01Product />
        <Section02Capabilities />
        <Section03HowItWorks />
        <Section04TrustControl />
        <Section05Contact />
        <Footer />
      </main>
    </>
  )
}
