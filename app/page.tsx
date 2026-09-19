import { SmoothScroll } from "@/components/effects/smooth-scroll"
import { Experience } from "@/components/landing/experience"
import { FinalCta } from "@/components/landing/final-cta"
import { Hero } from "@/components/landing/hero"
import { Navbar } from "@/components/landing/navbar"
import { Philosophy } from "@/components/landing/philosophy"
import { Statement } from "@/components/landing/statement"
import { TypographyTransition } from "@/components/landing/typography-transition"

export default function Page() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Philosophy />
        <Experience />
        <TypographyTransition />
        <FinalCta />
      </main>
    </SmoothScroll>
  )
}
