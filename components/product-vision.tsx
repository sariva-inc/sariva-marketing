export function ProductVision() {
  return (
    <section className="py-20 px-6 bg-card/30 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-foreground">Product Vision</h2>
          
          <div className="space-y-6">
            <div className="p-8 bg-background border border-accent/30 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-4">Intelligent Infrastructure Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sariva analyzes your existing infrastructure to identify gaps, inefficiencies, and opportunities for AI integration.
              </p>
            </div>

            <div className="p-8 bg-background border border-accent/30 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-4">Smart Recommendations Engine</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered recommendations guide you toward optimal architectures for your specific business needs and constraints.
              </p>
            </div>

            <div className="p-8 bg-background border border-accent/30 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-4">Automated Implementation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Reduce manual effort and human error by automating cloud and platform engineering decisions based on proven patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
