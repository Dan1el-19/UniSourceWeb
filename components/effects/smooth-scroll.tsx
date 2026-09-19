"use client"

import { useEffect } from "react"
import { ReactLenis } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    // Layout shifts after font swap can leave stale trigger positions.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  if (reduced) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  )
}
