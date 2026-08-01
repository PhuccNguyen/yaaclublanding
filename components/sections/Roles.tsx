"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { User, Store, MapPin, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { soonHref } from "@/lib/navigation";

const ROLES = [
  {
    icon: User,
    color: "var(--yaa-lime)",
    iconText: "text-[var(--yaa-black)]",
    title: "Users",
    copy: "Discover, join and book your favorite sports activities.",
  },
  {
    icon: Store,
    color: "var(--yaa-purple)",
    iconText: "text-[var(--yaa-off)]",
    title: "Club Owners",
    copy: "Grow your community and manage clubs effortlessly.",
  },
  {
    icon: MapPin,
    color: "var(--yaa-red)",
    iconText: "text-[var(--yaa-off)]",
    title: "Venues / Organizers",
    copy: "List your venues, host events and reach more players.",
  },
];

export function Roles() {
  return (
    <section
      id="roles"
      className="scroll-mt-[84px] bg-[var(--yaa-white)] pb-16 pt-4 md:pb-20 lg:pb-28 lg:pt-10"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal className="grid gap-10 rounded-[26px] bg-[var(--yaa-cream)] p-6 sm:p-9 md:rounded-[40px] md:p-12 lg:grid-cols-[33%_58%] lg:items-center lg:gap-10 lg:p-16">
          {/* ── Left · headline + support + colour legend ── */}
          <div>
            <h2 className="font-display text-[clamp(28px,3.2vw,46px)] uppercase leading-[0.96]">
              Built for every role in the sports ecosystem
            </h2>
            <p className="mt-5 max-w-[360px] text-[15px] leading-relaxed text-[var(--yaa-ink-60)]">
              One platform, three ways to play. Join in, run a club, or open
              your venue.
            </p>
            <div className="mt-7 flex items-center gap-2" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--yaa-lime)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--yaa-purple)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--yaa-red)]" />
            </div>
          </div>

          {/* ── Right · three premium role cards ── */}
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {ROLES.map((role) => (
              <Link
                key={role.title}
                href={soonHref(role.title)}
                style={{ "--role": role.color } as CSSProperties}
                className="group flex h-full flex-col rounded-[24px] border-[2.5px] border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--role)] hover:shadow-[0_26px_50px_var(--yaa-ink-15)] sm:p-7"
              >
                <span
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${role.iconText}`}
                  style={{ background: role.color }}
                >
                  <role.icon size={26} aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl sm:flex sm:min-h-[2lh] sm:items-start">
                  {role.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--yaa-ink-60)]">
                  {role.copy}
                </p>
                <span
                  className="mt-6 flex h-10 w-10 items-center justify-center self-start rounded-full border-[2.5px] border-[var(--yaa-ink-15)] text-[var(--yaa-black)] transition-colors duration-300 group-hover:border-[var(--role)] sm:mt-auto"
                  aria-hidden="true"
                >
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
