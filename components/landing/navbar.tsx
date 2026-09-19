"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useLenis } from "lenis/react"
import { ArrowUpRight } from "lucide-react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

const LINKS = [
  { label: "About", href: "#philosophy" },
  { label: "Experience", href: "#experience" },
]

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const lenis = useLenis()
  const reduced = useReducedMotion()

  const overlayRef = useRef<HTMLDivElement>(null)
  const menuTl = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      if (reduced || !overlayRef.current) return
      const links = overlayRef.current.querySelectorAll("[data-menu-link]")
      const tl = gsap.timeline({ paused: true })
      tl.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, ease: "power2.out" }
      ).fromTo(
        links,
        { yPercent: 60, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", stagger: 0.08 },
        "<+0.1"
      )
      menuTl.current = tl
    },
    { dependencies: [reduced] }
  )

  // Hide on scroll down, return on scroll up.
  useGSAP(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY.current && y > 96)
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  })

  const toggleMenu = (next: boolean) => {
    setOpen(next)
    if (reduced) return
    if (next) {
      menuTl.current?.play()
      lenis?.stop()
    } else {
      menuTl.current?.reverse()
      lenis?.start()
    }
  }

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    toggleMenu(false)
    const target = document.querySelector(href)
    if (!target) return
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { duration: 1.6 })
    } else {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 mix-blend-difference text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-6 py-5 md:px-10"
        >
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="font-heading text-lg font-semibold tracking-tight outline-none focus-visible:underline focus-visible:underline-offset-4"
          >
            UniSource
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-white/70 transition-colors duration-300 outline-none hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#enter"
              onClick={(e) => handleNavClick(e, "#enter")}
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/40 px-4 py-1.5 text-sm transition-colors duration-300 outline-none hover:border-white hover:bg-white hover:text-black focus-visible:border-white"
            >
              Enter
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => toggleMenu(!open)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={cn(
                "h-px w-6 bg-white transition-transform duration-300",
                open && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-white transition-transform duration-300",
                open && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "invisible fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 opacity-0 md:hidden",
          open && !reduced && "visible opacity-100"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              data-menu-link
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-heading text-5xl font-semibold tracking-tight text-paper outline-none focus-visible:underline"
            >
              <span className="mr-4 font-mono text-xs text-paper/40">
                0{i + 1}
              </span>
              {link.label}
            </a>
          ))}
          <a
            data-menu-link
            href="#enter"
            onClick={(e) => handleNavClick(e, "#enter")}
            className="mt-6 inline-flex items-center gap-2 font-heading text-5xl font-semibold tracking-tight text-paper outline-none focus-visible:underline"
          >
            Enter
            <ArrowUpRight className="size-8" />
          </a>
        </nav>
        <p
          data-menu-link
          className="absolute bottom-10 left-8 font-mono text-xs uppercase tracking-widest text-paper/40"
        >
          Private. Seamless. Ecosystem.
        </p>
      </div>
    </>
  )
}
