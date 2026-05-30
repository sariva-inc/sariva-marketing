import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Solution } from '@/components/solution'
import { Capabilities } from '@/components/capabilities'
import { ProductVision } from '@/components/product-vision'
import { FounderNote } from '@/components/founder-note'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Problem />
      <Solution />
      <Capabilities />
      <ProductVision />
      <FounderNote />
      <ContactForm />
      <Footer />
    </main>
  )
}
