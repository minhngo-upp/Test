import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Menu, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const brand = {
  name: 'The Meal',
  purpose: 'The first personalized digital nutrition app designed to help you manage weight, disease, and everyday vitality.',
  cta: 'Get The Meal App',
  valueProps: [
    'Hyper-personalized Vietnamese nutrition coach',
    'Preventive health focus, not calorie policing',
    'Low-friction consistency system',
  ],
}

const navLinks = ['Features', 'Philosophy', 'Protocol', 'Plans']

const shufflerCards = ['Body Signal Mapping', 'Goal-Adaptive Menus', 'Routine-Aware Guidance']
const typewriterLines = [
  '07:42 Live: Suggested breakfast tuned for digestion score +12%',
  '11:20 Insight: Hydration nudge sent to reduce afternoon fatigue',
  '18:05 Shift: Dinner macro balance adjusted for skin recovery',
]
const scheduleDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="bg-background text-dark font-heading">
      <NoiseOverlay />
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Membership />
      <Footer />
    </div>
  )
}

function NoiseOverlay() {
  return (
    <svg className="noise-layer" aria-hidden="true">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.05" />
    </svg>
  )
}

function Navbar({ mobileOpen, setMobileOpen }) {
  const navRef = useRef(null)
  const heroSentinelRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        navRef.current?.classList.toggle('nav-solid', !entry.isIntersecting)
      },
      { threshold: 0.12 },
    )
    if (heroSentinelRef.current) observer.observe(heroSentinelRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={heroSentinelRef} className="absolute top-[30vh] h-2 w-full" />
      <header ref={navRef} className="floating-nav">
        <div className="font-semibold tracking-tight">{brand.name}</div>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover-lift">
              {link}
            </a>
          ))}
        </nav>
        <button className="magnetic-btn hidden md:inline-flex">{brand.cta}<span /></button>
        <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)}><Menu size={18} /></button>
      </header>
      {mobileOpen && (
        <div className="fixed top-24 left-1/2 z-40 w-[92%] -translate-x-1/2 rounded-[2rem] bg-background/95 p-5 shadow-cinema backdrop-blur-xl md:hidden">
          <div className="grid gap-3 text-sm">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover-lift">{link}</a>
            ))}
          </div>
          <button className="magnetic-btn mt-4 w-full">{brand.cta}<span /></button>
        </div>
      )}
    </>
  )
}

function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative flex min-h-[100dvh] items-end" style={{ backgroundImage: "linear-gradient(to top, rgba(10,10,20,0.95) 10%, rgba(10,10,20,0.3) 55%), url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=2000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-6xl px-5 pb-16 md:px-10 md:pb-24 lg:pb-28">
        <p className="hero-animate mb-4 font-data text-sm text-background/80">Neon Biotech Nutrition System — Vietnam</p>
        <h1 className="hero-animate text-4xl font-extrabold leading-[0.95] tracking-tight text-background md:text-7xl">
          Metabolism beyond
        </h1>
        <h2 className="hero-animate mt-2 text-6xl italic leading-[0.9] text-accent font-drama md:text-[11rem]">Boundaries.</h2>
        <p className="hero-animate mt-5 max-w-xl text-sm text-background/85 md:text-base">{brand.purpose}</p>
        <button className="magnetic-btn hero-animate mt-8">{brand.cta}<ArrowRight size={16} /><span /></button>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
      <div className="mb-10 flex items-center gap-2 font-data text-xs uppercase tracking-[0.25em] text-dark/70"><Sparkles size={14} /> Interactive Functional Artifacts</div>
      <div className="grid gap-6 lg:grid-cols-3">
        <DiagnosticShuffler />
        <TelemetryTypewriter />
        <ProtocolScheduler />
      </div>
    </section>
  )
}

function DiagnosticShuffler() {
  const [cards, setCards] = useState(shufflerCards)

  useEffect(() => {
    const id = setInterval(() => {
      setCards((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <article className="feature-card">
      <h3 className="text-lg font-bold">{brand.valueProps[0]}</h3>
      <p className="mt-2 text-sm text-dark/70">Adaptive intelligence layers reorder as your body data evolves.</p>
      <div className="relative mt-8 h-52">
        {cards.map((card, index) => (
          <div key={card} className="absolute w-full rounded-[1.5rem] border border-dark/10 bg-white p-4 font-data text-sm shadow transition-all duration-700" style={{ top: `${index * 20}px`, zIndex: 30 - index, transform: `scale(${1 - index * 0.05})`, transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            #{index + 1} {card}
          </div>
        ))}
      </div>
    </article>
  )
}

function TelemetryTypewriter() {
  const [displayed, setDisplayed] = useState('')
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const current = typewriterLines[lineIndex % typewriterLines.length]
    let char = 0
    const timer = setInterval(() => {
      char += 1
      setDisplayed(current.slice(0, char))
      if (char >= current.length) {
        clearInterval(timer)
        setTimeout(() => {
          setDisplayed('')
          setLineIndex((l) => l + 1)
        }, 1100)
      }
    }, 35)
    return () => clearInterval(timer)
  }, [lineIndex])

  return (
    <article className="feature-card">
      <h3 className="text-lg font-bold">{brand.valueProps[1]}</h3>
      <p className="mt-2 text-sm text-dark/70">Preventive telemetry that improves the day before symptoms stack up.</p>
      <div className="mt-8 rounded-[1.5rem] border border-dark/10 bg-dark p-5 font-data text-xs text-background">
        <div className="mb-4 flex items-center gap-2 text-accent"><span className="pulse-dot" />Live Feed</div>
        <p className="min-h-16 leading-relaxed">{displayed}<span className="blink-cursor">|</span></p>
      </div>
    </article>
  )
}

function ProtocolScheduler() {
  const [activeDay, setActiveDay] = useState(2)
  const cursorRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.9 })
      tl.set(cursorRef.current, { opacity: 1, x: -20, y: 8 })
      for (const index of [1, 3, 5]) {
        tl.to(cursorRef.current, { x: 28 + index * 42, y: 42, duration: 0.45, ease: 'power2.inOut' })
          .to(`.day-${index}`, { scale: 0.95, duration: 0.08 })
          .to(`.day-${index}`, { scale: 1, backgroundColor: '#7B61FF', color: '#F0EFF4', duration: 0.2 }, '<')
          .add(() => setActiveDay(index))
      }
      tl.to(cursorRef.current, { x: 218, y: 114, duration: 0.45 })
        .to('.save-btn', { scale: 0.95, duration: 0.08 })
        .to('.save-btn', { scale: 1, duration: 0.2 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
    }, cardRef)
    return () => ctx.revert()
  }, [])

  return (
    <article ref={cardRef} className="feature-card">
      <h3 className="text-lg font-bold">{brand.valueProps[2]}</h3>
      <p className="mt-2 text-sm text-dark/70">Scheduling that bends to real Vietnamese meals, not rigid templates.</p>
      <div className="relative mt-8 rounded-[1.5rem] border border-dark/10 bg-white p-4 font-data text-xs">
        <div className="mb-3 grid grid-cols-7 gap-2">
          {scheduleDays.map((day, i) => (
            <div key={`${day}-${i}`} className={`day-${i} flex h-9 items-center justify-center rounded-xl border border-dark/10 ${activeDay === i ? 'bg-accent text-background' : ''}`}>{day}</div>
          ))}
        </div>
        <button className="save-btn magnetic-btn mt-2 !py-2">Save Routine<span /></button>
        <svg ref={cursorRef} viewBox="0 0 24 24" className="pointer-events-none absolute left-1 top-1 h-5 w-5 fill-accent opacity-0"><path d="M3 2l7 17 3-6 6-3z" /></svg>
      </div>
    </article>
  )
}

function Philosophy() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifest-line', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 36,
        opacity: 0,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="philosophy" ref={ref} className="relative overflow-hidden bg-dark px-5 py-24 text-background md:px-10">
      <img src="https://images.unsplash.com/photo-1517638851339-a711cfcf3279?auto=format&fit=crop&w=1800&q=80" alt="Bioluminescent texture" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="relative mx-auto max-w-5xl">
        <p className="manifest-line text-sm text-background/80">Most nutrition platforms focus on: generic calorie tracking and rigid macro policing.</p>
        <p className="manifest-line mt-6 max-w-4xl text-5xl leading-[0.95] md:text-7xl">
          We focus on: <span className="font-drama italic text-accent">signal-led adaptation</span> for Vietnamese life rhythms.
        </p>
      </div>
    </section>
  )
}

function Protocol() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.protocol-card').forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            if (i > 0) return
            const prev = self.trigger.previousElementSibling
            if (prev) gsap.to(prev, { scale: 0.9, filter: 'blur(20px)', opacity: 0.5, duration: 0.4, ease: 'power2.inOut' })
          },
        })
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  const steps = useMemo(
    () => [
      ['01', 'Capture Baseline Signals', 'Initialize your metabolism, disease-risk, and habit profile in minutes.'],
      ['02', 'Compose Vietnamese-First Protocol', 'Generate meal plans and nudges tuned to your energy curve and schedule.'],
      ['03', 'Refine Continuously', 'Weekly adaptations rebalance digestion, skin/hair, and long-term weight outcomes.'],
    ],
    [],
  )

  return (
    <section id="protocol" ref={wrapRef} className="px-5 py-20 md:px-10">
      {steps.map(([num, title, desc], idx) => (
        <article key={num} className="protocol-card mb-8 flex min-h-[90vh] flex-col justify-between rounded-[2.5rem] border border-dark/10 bg-background p-7 shadow-cinema md:p-12">
          <div className="font-data text-xs">STEP {num}</div>
          <div>
            <h3 className="text-3xl font-bold md:text-5xl">{title}</h3>
            <p className="mt-4 max-w-xl text-dark/70">{desc}</p>
          </div>
          <div className="h-40 rounded-[1.5rem] border border-dark/10 bg-white p-5">
            {idx === 0 && <div className="motif-orbit" />}
            {idx === 1 && <div className="scan-grid" />}
            {idx === 2 && <svg viewBox="0 0 300 70" className="h-full w-full"><path className="wave-path" d="M0 35 L40 35 L55 15 L75 55 L95 25 L115 35 L300 35" /></svg>}
          </div>
        </article>
      ))}
    </section>
  )
}

function Membership() {
  const tiers = [
    { name: 'Essential', price: 'Free', detail: 'Core tracking + daily suggestions' },
    { name: 'Performance', price: '$12/mo', detail: 'Advanced personalization + routine AI', featured: true },
    { name: 'Enterprise', price: 'Custom', detail: 'Clinic and employer wellness deployment' },
  ]

  return (
    <section id="plans" className="mx-auto max-w-6xl px-5 py-20 md:px-10">
      <div className="grid gap-5 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.name} className={`rounded-[2rem] border p-7 ${tier.featured ? 'scale-[1.02] border-accent bg-primary text-background ring-2 ring-accent/30' : 'border-dark/10 bg-white'}`}>
            <h4 className="text-xl font-bold">{tier.name}</h4>
            <p className="mt-4 text-3xl font-extrabold">{tier.price}</p>
            <p className="mt-3 text-sm opacity-80">{tier.detail}</p>
            <button className="magnetic-btn mt-7 w-full">{brand.cta}<span /></button>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="rounded-t-[4rem] bg-primary px-5 py-14 text-background md:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <h5 className="text-2xl font-bold">{brand.name}</h5>
          <p className="mt-3 text-sm text-background/75">Precision Vietnamese nutrition operating system.</p>
        </div>
        <div><p className="mb-3 font-semibold">Product</p><div className="space-y-2 text-sm text-background/80"><p>Features</p><p>Protocol</p><p>Pricing</p></div></div>
        <div><p className="mb-3 font-semibold">Company</p><div className="space-y-2 text-sm text-background/80"><p>About</p><p>Research</p><p>Contact</p></div></div>
        <div><p className="mb-3 font-semibold">Legal</p><div className="space-y-2 text-sm text-background/80"><p>Terms</p><p>Privacy</p><p className="mt-4 inline-flex items-center gap-2 font-data"><span className="pulse-dot !bg-emerald-400" />System Operational</p></div></div>
      </div>
    </footer>
  )
}

export default App
