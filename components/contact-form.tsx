'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ContactForm() {
  const [formState, setFormState] = useState({
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setSubmitted(true)
    setTimeout(() => {
      setFormState({ email: '', message: '' })
      setSubmitted(false)
    }, 2000)
  }

  return (
    <section className="py-20 px-6 bg-card/30 border-t border-border">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Get Started</h2>
            <p className="text-lg text-muted-foreground">
              Join our waitlist or connect with our team to discuss your infrastructure challenges.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@company.com"
                value={formState.email}
                onChange={handleChange}
                required
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your infrastructure goals..."
                value={formState.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors resize-none"
              />
            </div>

            <Button 
              type="submit"
              size="lg"
              className="w-full bg-accent text-background hover:bg-accent/90 font-semibold"
              disabled={submitted}
            >
              {submitted ? 'Message Sent!' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
