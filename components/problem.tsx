export function Problem() {
  const issues = [
    "Fragmented infrastructure blocks AI adoption",
    "Manual operations create bottlenecks and errors",
    "Security gaps risk enterprise data",
    "Lack of platform standards limits scalability"
  ]

  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">The Challenge</h2>
            <p className="text-lg text-muted-foreground">
              AI adoption is blocked by fundamental infrastructure problems:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {issues.map((issue, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-foreground">{issue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
