"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { AnimatedLines } from "@/components/effects/animated-lines"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger, useGSAP)

function SkeletonBar({ className }: { className?: string }) {
  return <div className={cn("h-2 rounded-full bg-ink/8", className)} />
}

export function Experience() {
  const scope = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const frame = scope.current?.querySelector("[data-frame]")
      const fragments = gsap.utils.toArray<HTMLElement>("[data-fragment]")
      if (!frame) return

      // Clip-path rise of the app frame on entry.
      gsap.fromTo(
        frame,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 78%", once: true },
        }
      )

      // Gentle depth: fragments drift at different speeds while scrolling.
      fragments.forEach((el) => {
        const speed = Number(el.dataset.speed ?? 1)
        gsap.fromTo(
          el,
          { y: 60 * speed },
          {
            y: -60 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        )
      })
    },
    { scope, dependencies: [reduced] }
  )

  return (
    <section
      id="experience"
      ref={scope}
      aria-labelledby="experience-heading"
      className="relative overflow-hidden bg-paper px-6 py-32 text-ink md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/40">
          03 — Experience
        </p>
        <AnimatedLines
          as="h2"
          id="experience-heading"
          lines={["One surface.", "Zero friction."]}
          className="font-heading text-[clamp(2.75rem,7vw,7rem)] font-semibold leading-[1.0] tracking-[-0.03em]"
        />
        <p className="mt-10 max-w-xl text-base leading-relaxed text-ink/55 md:text-lg">
          Not a dashboard, not another tab. UniSource feels less like software
          you operate and more like a place your things simply live.
        </p>

        {/* product composition */}
        <div className="relative mt-24 md:mt-32">
          {/* floating fragment — left */}
          <div
            data-fragment
            data-speed="1.6"
            className="absolute -left-2 top-10 z-10 hidden w-44 rounded-md border border-line bg-white/90 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] backdrop-blur-sm lg:block"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
              Status
            </p>
            <p className="mt-2 font-heading text-sm font-semibold">
              Private by default
            </p>
            <SkeletonBar className="mt-3 w-2/3" />
          </div>

          {/* floating fragment — right */}
          <div
            data-fragment
            data-speed="2.2"
            className="absolute -right-2 bottom-16 z-10 hidden w-52 rounded-md border border-line bg-white/90 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] backdrop-blur-sm lg:block"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
              Sync
            </p>
            <p className="mt-2 font-heading text-sm font-semibold">
              Everything, in one place
            </p>
            <SkeletonBar className="mt-3 w-1/2" />
            <SkeletonBar className="mt-2 w-3/4" />
          </div>

          {/* app frame */}
          <div
            data-frame
            className="relative mx-auto max-w-4xl overflow-hidden rounded-lg border border-line bg-white shadow-[0_60px_120px_-60px_rgba(0,0,0,0.35)]"
          >
            {/* window bar */}
            <div className="flex items-center gap-3 border-b border-line px-5 py-3">
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-ink/15" />
                <span className="size-2 rounded-full bg-ink/15" />
                <span className="size-2 rounded-full bg-ink/15" />
              </div>
              <div className="mx-auto flex h-6 w-56 items-center justify-center rounded-full bg-ink/5 font-mono text-[10px] tracking-wide text-ink/50">
                unisource
              </div>
              <span className="w-10" />
            </div>

            <div className="flex">
              {/* sidebar */}
              <div className="hidden w-52 shrink-0 flex-col gap-5 border-r border-line p-5 sm:flex">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-ink" />
                  <span className="font-heading text-xs font-bold tracking-tight">
                    UniSource
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <SkeletonBar className="w-3/4 bg-ink/20" />
                  <SkeletonBar className="w-1/2" />
                  <SkeletonBar className="w-2/3" />
                  <SkeletonBar className="w-1/2" />
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <SkeletonBar className="w-1/2" />
                  <SkeletonBar className="w-2/3" />
                </div>
              </div>

              {/* main panel */}
              <div className="min-h-[26rem] flex-1 p-6 md:p-8">
                <div className="flex items-end justify-between gap-6">
                  <div className="flex flex-1 flex-col gap-3">
                    <SkeletonBar className="h-3 w-1/3 bg-ink/25" />
                    <SkeletonBar className="h-6 w-2/3 rounded-md bg-ink/15" />
                  </div>
                  <SkeletonBar className="h-8 w-20 rounded-full bg-ink/10" />
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {["w-full", "w-full", "w-2/3", "w-3/4", "w-full", "w-1/2"].map(
                    (w, i) => (
                      <div
                        key={i}
                        className="flex h-24 flex-col justify-end gap-2 rounded-md border border-line p-3"
                      >
                        <SkeletonBar className={w} />
                        <SkeletonBar className="w-1/3" />
                      </div>
                    )
                  )}
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <SkeletonBar className="w-full" />
                  <SkeletonBar className="w-5/6" />
                  <SkeletonBar className="w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
