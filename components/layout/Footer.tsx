"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { FOOTER_COLUMNS, soonHref } from "@/lib/navigation";

/* Brand glyphs drawn inline: this lucide build ships no social logos. */
function InstagramGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 2h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 0-1 1v2h3.2a.8.8 0 0 1 .78 1l-.75 3a.8.8 0 0 1-.78.6H14v7a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-7H8a1 1 0 0 1-1-1v-2.6a1 1 0 0 1 1-1h2V8a6 6 0 0 1 4-6z" />
    </svg>
  );
}

function YoutubeGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <path d="m10 15 5-3-5-3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.5 8.6L23 22h-6.9l-5.4-7-6.2 7H1.4l8-9.1L1 2h7l4.9 6.5L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim().length > 3) setSubscribed(true);
  }

  return (
    <footer className="bg-[var(--yaa-black)] text-[var(--yaa-cream)]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr] lg:gap-8">
        {/* Column 1: brand */}
        <div className="flex flex-col items-start gap-5">
          <Logo variant="inverted" orientation="horizontal" height={64} />
          <p className="max-w-[230px] text-sm leading-relaxed text-[var(--yaa-cream)]/70">
            More than a game, it&apos;s a community.
          </p>
          <div className="flex gap-3">
            {[
              { href: soonHref("Instagram"), label: "Instagram", Glyph: InstagramGlyph },
              { href: "https://www.facebook.com/YaaClub", label: "Facebook", Glyph: FacebookGlyph },
              { href: "https://x.com/YaaClubApp", label: "X", Glyph: XGlyph },
              { href: "https://www.youtube.com/@YaaClubApp", label: "YouTube", Glyph: YoutubeGlyph },
            ].map(({ href, label, Glyph }) => (
              <a
                key={label}
                href={href}
                aria-label={`Yaa Club on ${label}`}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--yaa-lime)] text-[var(--yaa-black)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Glyph />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-5 text-[13px] font-semibold tracking-wide text-[var(--yaa-cream)]">
              {col.title}
            </p>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--yaa-cream)]/70 transition-colors hover:text-[var(--yaa-lime)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Column 5: newsletter */}
        <div>
          <p className="mb-5 text-[13px] font-semibold tracking-wide text-[var(--yaa-cream)]">
            Stay Connected
          </p>
          <p className="mb-4 text-sm text-[var(--yaa-cream)]/70">
            Get the latest updates and exclusive offers.
          </p>
          {subscribed ? (
            <p className="rounded-full bg-[var(--yaa-lime)] px-5 py-3 text-sm font-semibold text-[var(--yaa-black)]">
              You are in. Welcome to the club.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center overflow-hidden rounded-full border border-[var(--yaa-cream)]/25 focus-within:border-[var(--yaa-lime)]"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="w-full bg-transparent px-5 py-3 text-sm text-[var(--yaa-cream)] outline-none placeholder:text-[var(--yaa-cream)]/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="m-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--yaa-lime)] text-[var(--yaa-black)] transition-transform duration-300 hover:scale-105"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--yaa-cream)]/15">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-[var(--yaa-cream)]/60 md:flex-row md:px-10">
          <p>© 2026 YaaClub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href={soonHref("Terms of Service")} className="transition-colors hover:text-[var(--yaa-lime)]">
              Terms of Service
            </Link>
            <Link href={soonHref("Privacy Policy")} className="transition-colors hover:text-[var(--yaa-lime)]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
