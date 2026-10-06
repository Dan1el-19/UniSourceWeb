import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { PrivacyPolicyContent } from "./privacy-policy-content"

const title = "Polityka prywatności aplikacji Blokserwis — UniSource"
const description =
  "Polityka prywatności aplikacji mobilnej Blokserwis na system Android."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "UniSource",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div lang="pl" className="flex min-h-svh flex-col bg-paper text-ink">
      <header className="border-b border-line">
        <nav
          aria-label="Nawigacja główna"
          className="flex items-center justify-between gap-6 px-6 py-5 md:px-10"
        >
          <Link
            href="/"
            className="font-heading text-lg font-semibold tracking-tight outline-none focus-visible:underline focus-visible:underline-offset-4"
          >
            UniSource
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-ink focus-visible:underline focus-visible:underline-offset-4"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 transition-transform group-hover:-translate-x-1"
            />
            Strona główna
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20 md:px-10 md:py-32">
        <p className="mb-8 font-mono text-[11px] tracking-[0.25em] text-ink/45 uppercase">
          Informacje prawne
        </p>
        <h1 className="font-heading text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
          Polityka prywatności aplikacji Blokserwis
        </h1>

        <article
          aria-label="Treść polityki prywatności"
          className="mt-12 border-t border-line pt-10 text-base leading-relaxed text-ink/65 md:mt-16 md:text-lg [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-2 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6"
        >
          <PrivacyPolicyContent />
        </article>
      </main>

      <footer className="flex flex-col gap-2 border-t border-line px-6 py-6 font-mono text-[11px] tracking-[0.2em] text-ink/40 uppercase md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 UniSource</p>
        <p>Private by design</p>
      </footer>
    </div>
  )
}
