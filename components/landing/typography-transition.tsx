"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const LINES = ["BUILT", "TO STAY", "YOURS."]

export function TypographyTransition() {
  const scope = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const lines = gsap.utils.toArray<HTMLElement>("[data-big-line]")
      if (!lines.length) return

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=220%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })

      lines.forEach((line, i) => {
        const fromX = i % 2 === 0 ? -12 : 12
        tl.fromTo(
          line,
          { xPercent: fromX, letterSpacing: "0.32em", opacity: 0.25 },
          { xPercent: 0, letterSpacing: "-0.02em", opacity: 1, duration: 1 },
          i * 0.9
        )
      })
      tl.to({}, { duration: 0.6 }) // settle beat before the pin releases
    },
    { scope, dependencies: [reduced] }
  )

  return (
    <section
      ref={scope}
      aria-label="Built to stay yours"
      className="relative bg-ink text-paper"
    >
      <div className="flex h-svh flex-col items-center justify-center overflow-hidden px-6">
        <p className="absolute left-6 top-24 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40 md:left-10">
          04 — Principle
        </p>
        <div className="flex flex-col items-center">
          {LINES.map((line, i) => (
            <span
              key={line}
              data-big-line
              className="block whitespace-nowrap font-heading text-[clamp(3.75rem,15vw,14rem)] font-bold uppercase leading-[0.92] will-change-transform"
            >
              {i === 2 ? <span className="text-paper/40">{line}</span> : line}
            </span>
          ))}
        </div>
        <p className="absolute bottom-16 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40">
          No lock-in. No fine print.
        </p>
      </div>
    </section>
  )
}
