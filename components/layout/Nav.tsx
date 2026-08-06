"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { MagneticButton } from "./MagneticButton";
import { NAV_LINKS, soonHref } from "@/lib/navigation";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[76px] bg-[var(--yaa-white)] transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_1px_0_var(--yaa-ink-15)]"
          : "shadow-[0_1px_0_var(--yaa-ink-08)]"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10">
        <a href="#top" aria-label="Yaa Club home" className="shrink-0">
          <Logo variant="standard" orientation="horizontal" height={48} priority />
        </a>

        {/* nowrap + tighter gaps at lg keep the bar on ONE line down to 1024px */}
        <ul className="hidden items-center gap-4 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.label} className="shrink-0">
              <Link
                href={link.href}
                className="nav-link whitespace-nowrap text-[13px] font-medium text-[var(--yaa-black)] xl:text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex xl:gap-3">
          <Link
            href={soonHref("Log in")}
            className="whitespace-nowrap rounded-full border border-[var(--yaa-ink-15)] px-4 py-2.5 text-[13px] font-medium text-[var(--yaa-black)] transition-colors duration-300 hover:border-[var(--yaa-black)] xl:px-5 xl:text-sm"
          >
            Log in
          </Link>
          <MagneticButton
            variant="lime"
            magnetRadius={140}
            href="#download"
            className="whitespace-nowrap px-5! py-2.5! text-[11px]! xl:px-6! xl:text-xs!"
          >
            Get Started
          </MagneticButton>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] px-6 pb-8 pt-4 shadow-[0_12px_24px_var(--yaa-ink-08)] lg:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <Link
              href={soonHref("Log in")}
              className="rounded-full border border-[var(--yaa-black)] px-6 py-3 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <a
              href="#download"
              className="rounded-full bg-[var(--yaa-lime)] px-6 py-3 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
