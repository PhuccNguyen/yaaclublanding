import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { IMAGES } from "@/lib/image-manifest";

export const metadata: Metadata = {
  title: "Coming soon | Yaa Club",
  description: "This part of Yaa Club is in training. Check back soon.",
};

/* X (Twitter) mark — this lucide build ships no social logos. */
function XGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.5 8.6L23 22h-6.9l-5.4-7-6.2 7H1.4l8-9.1L1 2h7l4.9 6.5L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z" />
    </svg>
  );
}

const KNOWN: Record<string, string> = {
  Communities: "Find your people. Clubs, crews and communities for every sport are almost here.",
  "List a Venue": "Turn your courts into a clubhouse. Venue tools are warming up.",
  "Host an Event": "Create, promote and fill events in minutes. This is nearly ready.",
  "Manage Events": "Sign-ups, check-ins and rosters in one place. Coming very soon.",
  Resources: "Guides and playbooks for organizers are being written right now.",
  "About Us": "The story behind wellbeing that works. Almost ready to share.",
  Careers: "Build the future of community sport with us. Roles posting soon.",
  Blog: "Field notes on play, community and wellbeing. Publishing shortly.",
  "Contact Us": "We would love to hear from you. This channel opens soon.",
};

export default async function ComingSoon({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const title = page && page.trim().length > 0 ? page : "Something new";
  const copy =
    (page && KNOWN[page]) ??
    "We are putting this one through its warm-up. It will be ready to play soon.";

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--yaa-black)] text-[var(--yaa-cream)]">
      {/* Real sports background */}
      <Image
        src={IMAGES.comingSoonBg}
        alt=""
        fill
        priority
        className="object-cover opacity-45"
        sizes="100vw"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--yaa-black)] via-[var(--yaa-black)]/70 to-[var(--yaa-black)]/40" />

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-6 md:px-10">
        <Link href="/" aria-label="Yaa Club home">
          <Logo variant="inverted" orientation="horizontal" height={30} priority />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--yaa-cream)]/30 px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--yaa-lime)] hover:text-[var(--yaa-lime)]"
        >
          <ArrowLeft size={15} /> Back home
        </Link>
      </header>

      {/* Centered content */}
      <section className="relative z-10 mx-auto flex w-full max-w-[900px] flex-1 flex-col items-center justify-center px-5 pb-24 text-center">
        {/* "COMING SOON" is the headline; the page name sits below it */}
        <h1 className="font-display text-[clamp(46px,10vw,118px)] uppercase leading-[0.88]">
          Coming soon
        </h1>
        <span className="eyebrow mt-6 rounded-full bg-[var(--yaa-lime)] px-4 py-1.5 text-[var(--yaa-black)]">
          {title}
        </span>
        <p className="mt-6 max-w-[520px] text-base leading-relaxed text-[var(--yaa-cream)]/75">
          {copy}
        </p>

        <p className="mt-10 max-w-[460px] text-sm leading-relaxed text-[var(--yaa-cream)]/75">
          Follow us for the latest updates on the app and to connect with the
          community.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://x.com/YaaClubApp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--yaa-lime)] px-7 py-3.5 text-sm font-semibold text-[var(--yaa-black)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <XGlyph /> Follow us on X
          </a>
          <Link
            href="/#download"
            className="rounded-full border border-[var(--yaa-cream)]/40 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-[var(--yaa-lime)] hover:text-[var(--yaa-lime)]"
          >
            Get the app
          </Link>
        </div>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-8 text-center text-xs text-[var(--yaa-cream)]/50 md:px-10">
        © 2026 YaaClub. Wellbeing that works.
      </footer>
    </main>
  );
}
