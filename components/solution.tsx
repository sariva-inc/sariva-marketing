export function Solution() {
  const pillars = [
    "AI Integration",
    "Platform Engineering",
    "AWS Architecture",
    "Infrastructure Automation",
    "Reliability & Observability",
    "Security & Governance"
  ]

  return (
    <section className="py-20 px-6 bg-card/30 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Solution</h2>
            <p className="text-lg text-muted-foreground">
              Sariva combines intelligence with engineering excellence to transform your infrastructure:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="p-6 bg-background border border-border rounded-lg hover:border-accent/50 hover:bg-card/50 transition-all"
              >
                <div className="w-3 h-3 rounded-full bg-accent mb-4" />
                <p className="text-foreground font-medium">{pillar}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
