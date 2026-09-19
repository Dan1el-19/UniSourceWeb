"use client"

import dynamic from "next/dynamic"
import { useRef, useSyncExternalStore } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { AnimatedLines } from "@/components/effects/animated-lines"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const UniSourceScene = dynamic(
  () => import("@/components/effects/unisource-scene"),
  {
    ssr: false,
  }
)

let webglCached: boolean | null = null

function detectWebGL(): boolean {
  if (webglCached === null) {
    try {
      const canvas = document.createElement("canvas")
      webglCached = Boolean(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      )
    } catch {
      webglCached = false
    }
  }
  return webglCached
}

const subscribeNoop = () => () => {}

function useWebGL(): boolean {
  return useSyncExternalStore(subscribeNoop, detectWebGL, () => false)
}

export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const webgl = useWebGL()

  useGSAP(
    () => {
      if (reduced) return
      const title = scope.current?.querySelector("[data-hero-title]")
      const scene = scope.current?.querySelector("[data-hero-scene]")
      const meta = scope.current?.querySelectorAll("[data-hero-meta]")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })
      if (title) tl.to(title, { yPercent: -18, scale: 0.96, ease: "none" }, 0)
      if (scene) tl.to(scene, { yPercent: 24, opacity: 0.35, ease: "none" }, 0)
      if (meta?.length)
        tl.to(meta, { autoAlpha: 0, y: -24, ease: "none", stagger: 0.05 }, 0)
    },
    { scope, dependencies: [reduced] }
  )

  return (
    <section
      id="top"
      ref={scope}
      className="relative h-svh overflow-hidden bg-paper text-ink"
    >
      {/* subtle vertical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden grid-cols-4 px-10 md:grid"
      >
        <div className="border-l border-line/60" />
        <div className="border-l border-line/60" />
        <div className="border-l border-line/60" />
        <div className="border-r border-l border-line/60" />
      </div>

      {/* 3D layer */}
      <div
        data-hero-scene
        className="absolute inset-x-0 top-[8%] h-[70%] md:top-0 md:right-[4%] md:left-[36%] md:h-full"
      >
        {webgl ? (
          <UniSourceScene />
        ) : (
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10 bg-[radial-gradient(circle_at_35%_30%,#e4e3df,#b9b8b3_70%)]"
          />
        )}
      </div>

      {/* top meta row */}
      <p
        data-hero-meta
        className="absolute top-24 left-6 font-mono text-[11px] tracking-[0.25em] text-ink/45 uppercase md:left-10"
      >
        A private ecosystem
      </p>
      <p
        data-hero-meta
        className="absolute top-24 right-6 hidden font-mono text-[11px] tracking-[0.25em] text-ink/45 uppercase md:right-10 md:block"
      >
        Est. MMXXVI
      </p>

      {/* slogan */}
      <div className="absolute bottom-[34%] left-6 md:bottom-[32%] md:left-10">
        <AnimatedLines
          as="p"
          immediate
          delay={1}
          stagger={0.16}
          lines={["Private.", "Seamless.", "Ecosystem."]}
          className="font-heading text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1.04] font-medium tracking-[-0.02em]"
        />
      </div>

      {/* giant wordmark, bleeding off the bottom edge */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-6 translate-y-[16%] md:left-10">
        <AnimatedLines
          as="h1"
          immediate
          delay={0.25}
          stagger={0}
          lines={["UNISOURCE"]}
          aria-label="UniSource"
          className="px-0 font-heading text-[clamp(3rem,16vw,22rem)] leading-[0.8] font-bold tracking-[-0.045em] whitespace-nowrap uppercase"
          lineClassName="text-left"
        />
      </div>

      {/* scroll cue */}
      <div
        data-hero-meta
        className="absolute right-6 bottom-8 flex items-center gap-3 md:right-10"
      >
        <span className="font-mono text-[11px] tracking-[0.25em] text-ink/45 uppercase">
          Scroll
        </span>
        <span
          aria-hidden="true"
          className="relative h-10 w-px overflow-hidden bg-ink/15"
        >
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[hero-scroll-cue_1.8s_ease-in-out_infinite] bg-ink/70" />
        </span>
      </div>
    </section>
  )
}
