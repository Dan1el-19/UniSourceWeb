"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { AnimatedLines } from "@/components/effects/animated-lines"
import { Marquee } from "@/components/effects/marquee"
import { Button } from "@/components/ui/button"

export function FinalCta() {
  return (
    <section
      id="enter"
      aria-labelledby="enter-heading"
      className="relative flex min-h-svh flex-col justify-between bg-paper pt-32 text-ink md:pt-40"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 md:px-10">
        <AnimatedLines
          as="h2"
          id="enter-heading"
          lines={["Your data.", "Your infrastructure.", "Your ecosystem."]}
          className="font-heading text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[1.02] font-semibold tracking-[-0.03em]"
        />

        <div className="mt-16 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
          <p
            aria-hidden="true"
            className="font-heading text-[clamp(3rem,10vw,9rem)] leading-[0.85] font-bold tracking-[-0.04em] text-ink/10 uppercase"
          >
            UniSource
          </p>
          <Button className="w-fit">
            Enter UniSource
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </div>

      <footer className="mt-24">
        <Marquee
          duration={40}
          className="border-y border-line py-5 font-heading text-sm font-medium tracking-[0.3em] text-ink/45 uppercase"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8">
              Private — Seamless — Ecosystem
            </span>
          ))}
        </Marquee>
        <div className="flex flex-col gap-2 px-6 py-6 font-mono text-[11px] tracking-[0.2em] text-ink/40 uppercase md:flex-row md:items-center md:justify-between md:px-10">
          <p>© 2026 UniSource</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-ink focus-visible:underline focus-visible:underline-offset-4"
            >
              Privacy policy
            </Link>
            <p>Private by design</p>
          </div>
        </div>
      </footer>
    </section>
  )
}
