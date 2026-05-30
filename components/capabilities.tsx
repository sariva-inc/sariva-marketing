export function Capabilities() {
  const capabilities = [
    {
      title: "AI-Ready Cloud Architecture",
      description: "Design cloud infrastructures optimized for AI workloads with native scalability and performance."
    },
    {
      title: "AWS Platform Engineering",
      description: "Build on AWS with proven patterns that scale, securing your infrastructure from the ground up."
    },
    {
      title: "Infrastructure Automation",
      description: "Eliminate manual operations with intelligent automation that reduces errors and accelerates deployment."
    },
    {
      title: "LLMOps / MLOps Foundation",
      description: "Establish reproducible pipelines for AI models with versioning, monitoring, and governance."
    },
    {
      title: "Reliability & Observability",
      description: "Gain complete visibility into your systems with proactive monitoring and self-healing capabilities."
    },
    {
      title: "Security & Governance",
      description: "Embed compliance and security controls throughout your infrastructure lifecycle."
    }
  ]

  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12">Capabilities</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, idx) => (
            <div 
              key={idx}
              className="p-8 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-1 h-full min-h-24 bg-gradient-to-b from-accent to-accent/30 rounded-full mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
