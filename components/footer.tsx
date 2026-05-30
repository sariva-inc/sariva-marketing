export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-12 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left side */}
          <div className="space-y-4">
            <p className="text-sm font-mono text-accent tracking-widest">Sariva.ai</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI platform engineering for intelligent infrastructure.
            </p>
          </div>

          {/* Right side */}
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="flex gap-6">
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Twitter
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
            </div>

            <p className="text-xs text-muted-foreground">
              © {currentYear} Sariva. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
