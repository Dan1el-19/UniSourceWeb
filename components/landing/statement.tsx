"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Statement() {
  const scope = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const lines = scope.current?.querySelectorAll("[data-statement-line]")
      const body = scope.current?.querySelector("[data-statement-body]")
      if (!lines?.length) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 65%",
          end: "center center",
          scrub: 0.5,
        },
      })
      tl.from(lines, {
        yPercent: 120,
        ease: "power2.out",
        stagger: 0.18,
      })
      if (body)
        tl.from(body, { autoAlpha: 0, y: 32, ease: "power2.out" }, "<+0.2")
    },
    { scope, dependencies: [reduced] }
  )

  return (
    <section
      id="about"
      ref={scope}
      aria-labelledby="statement-heading"
      className="relative bg-ink text-paper"
    >
      <div className="mx-auto flex min-h-svh max-w-[90rem] flex-col justify-center px-6 py-32 md:px-10 md:py-40">
        <p className="mb-12 font-mono text-[11px] tracking-[0.25em] text-paper/40 uppercase">
          01 — Statement
        </p>
        <h2
          id="statement-heading"
          className="font-heading text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[1.02] font-semibold tracking-[-0.03em]"
        >
          <span className="-mb-[0.2em] block overflow-hidden pb-[0.2em]">
            <span data-statement-line className="block">
              Everything you need.
            </span>
          </span>
          <span className="-mb-[0.2em] block overflow-hidden pb-[0.2em]">
            <span data-statement-line className="block text-paper/50">
              Connected by design.
            </span>
          </span>
        </h2>
        <p
          data-statement-body
          className="mt-14 max-w-xl text-base leading-relaxed text-paper/60 md:text-lg"
        >
          UniSource brings your data, infrastructure and tools into one private,
          coherent whole — designed as a single system, not assembled from
          parts.
        </p>
      </div>
    </section>
  )
}
