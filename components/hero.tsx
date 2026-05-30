import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Wordmark */}
        <div className="inline-block mb-4">
          <span className="text-sm font-mono text-accent tracking-widest">SARIVA.AI</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-balance text-foreground leading-tight">
          AI Platform Engineering for Intelligent Infrastructure
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          Sariva helps organizations design, automate, and scale AI-ready cloud platforms using AWS, platform engineering, and intelligent infrastructure patterns.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button 
            size="lg"
            className="bg-foreground text-background hover:bg-accent hover:text-background text-base px-8"
          >
            Join Waitlist
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent/10 text-base px-8"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}
