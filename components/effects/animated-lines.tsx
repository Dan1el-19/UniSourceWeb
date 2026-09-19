"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span"

type AnimatedLinesProps = {
  lines: string[]
  as?: Tag
  className?: string
  lineClassName?: string
  /** Play on mount instead of on scroll into view. */
  immediate?: boolean
  delay?: number
  stagger?: number
  start?: string
} & React.HTMLAttributes<HTMLElement>

/**
 * Multi-line display type where every line rises out of an overflow mask.
 * Lines are revealed with a calm stagger — on scroll by default, on mount
 * when `immediate` is set. Reduced motion leaves the text fully visible.
 */
export function AnimatedLines({
  lines,
  as: Tag = "div",
  className,
  lineClassName,
  immediate = false,
  delay = 0,
  stagger = 0.12,
  start = "top 82%",
  ...rest
}: AnimatedLinesProps) {
  const scope = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const targets = scope.current?.querySelectorAll("[data-line]")
      if (!targets?.length) return
      gsap.from(targets, {
        yPercent: 115,
        duration: 1.4,
        ease: "expo.out",
        delay,
        stagger,
        scrollTrigger: immediate
          ? undefined
          : { trigger: scope.current, start, once: true },
      })
    },
    { scope, dependencies: [reduced, immediate, delay] }
  )

  return (
    <Tag ref={scope as React.RefObject<never>} className={className} {...rest}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            data-line
            className={cn(
              "block pb-[0.1em] -mb-[0.1em] will-change-transform",
              lineClassName
            )}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
