"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const IDEAS = [
  {
    title: "Private",
    body: "Your data never becomes someone else's product. It stays where it belongs — with you.",
  },
  {
    title: "Seamless",
    body: "One surface for everything. Connected underneath, invisible in use.",
  },
  {
    title: "Yours",
    body: "Your infrastructure, your rules, your ecosystem. Ownership without ceremony.",
  },
]

export function Philosophy() {
  const scope = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const words = gsap.utils.toArray<HTMLElement>("[data-idea]")
      const stage = scope.current?.querySelector("[data-stage]")
      if (!words.length || !stage) return

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=260%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        words[0],
        { yPercent: 45, autoAlpha: 0, color: "#f3f2ee" },
        { yPercent: 0, autoAlpha: 1, duration: 0.7 },
        0
      )
      tl.to(words[0], { yPercent: -45, autoAlpha: 0, duration: 0.7 }, 1.4)
      tl.fromTo(
        words[1],
        { yPercent: 45, autoAlpha: 0, color: "#f3f2ee" },
        { yPercent: 0, autoAlpha: 1, duration: 0.7 },
        1.8
      )
      tl.to(words[1], { yPercent: -45, autoAlpha: 0, duration: 0.7 }, 3.2)
      tl.fromTo(
        words[2],
        { yPercent: 45, autoAlpha: 0, color: "#f3f2ee" },
        { yPercent: 0, autoAlpha: 1, duration: 0.7 },
        3.6
      )
      // Hand over to the light experience section as the pin releases.
      tl.to(stage, { backgroundColor: "#f3f2ee", duration: 1 }, 4.2)
      tl.to(words[2], { color: "#0b0b0b", duration: 1 }, 4.2)
      const counter = scope.current?.querySelector("[data-idea-index]")
      if (counter) {
        tl.to(counter, { color: "#0b0b0b", duration: 1 }, 4.2)
        tl.call(() => {
          counter.textContent = "02 / 03"
        }, [], 1.8)
        tl.call(() => {
          counter.textContent = "03 / 03"
        }, [], 3.6)
      }
      const descs = gsap.utils.toArray<HTMLElement>("[data-idea-desc]")
      if (descs.length) {
        tl.to(descs, { color: "#0b0b0bb3", duration: 1 }, 4.2)
      }
    },
    { scope, dependencies: [reduced] }
  )

  if (reduced) {
    // Static, fully readable variant — no pin, no scrub.
    return (
      <section
        id="philosophy"
        aria-labelledby="philosophy-heading"
        className="bg-ink px-6 py-32 text-paper md:px-10"
      >
        <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40">
          02 — Philosophy
        </p>
        <h2 id="philosophy-heading" className="sr-only">
          Philosophy
        </h2>
        <div className="mx-auto flex max-w-[90rem] flex-col gap-24">
          {IDEAS.map((idea, i) => (
            <div key={idea.title}>
              <p className="font-mono text-xs text-paper/40">
                0{i + 1} / 03
              </p>
              <h3 className="mt-4 font-heading text-5xl font-semibold tracking-tight md:text-7xl">
                {idea.title}
              </h3>
              <p className="mt-4 max-w-md text-paper/60">{idea.body}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="philosophy"
      ref={scope}
      aria-labelledby="philosophy-heading"
      className="relative bg-ink"
    >
      <h2 id="philosophy-heading" className="sr-only">
        Philosophy — Private, Seamless, Yours
      </h2>
      <div data-stage className="relative h-svh overflow-hidden bg-ink">
        <p className="absolute left-6 top-24 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40 md:left-10">
          02 — Philosophy
        </p>
        <p
          data-idea-index
          className="absolute right-6 top-24 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40 md:right-10"
        >
          01 / 03
        </p>
        {IDEAS.map((idea) => (
          <div
            key={idea.title}
            data-idea
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center px-6 text-center",
              "opacity-0" // GSAP owns visibility; this only avoids a flash before hydration
            )}
          >
            <h3 className="font-heading text-[clamp(3.5rem,13vw,11rem)] font-semibold leading-none tracking-[-0.04em]">
              {idea.title}
            </h3>
            <p data-idea-desc className="mt-8 max-w-md text-paper/55 md:text-lg">
              {idea.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
