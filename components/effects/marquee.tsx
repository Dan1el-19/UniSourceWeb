"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

type MarqueeProps = {
  children: React.ReactNode
  className?: string
  /** Seconds for one loop. */
  duration?: number
  reverse?: boolean
}

/**
 * Infinite linear marquee. Content is duplicated once so the loop point is
 * invisible; animation is skipped entirely under reduced motion.
 */
export function Marquee({
  children,
  className,
  duration = 36,
  reverse = false,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !trackRef.current) return
      gsap.fromTo(
        trackRef.current,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 }
      )
    },
    { dependencies: [reduced, duration, reverse] }
  )

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div ref={trackRef} className="inline-flex w-max will-change-transform">
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
