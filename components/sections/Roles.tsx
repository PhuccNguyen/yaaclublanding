"use client";

import { User, KeyRound, Building2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";

const ROLES = [
  {
    icon: User,
    chip: "bg-[var(--yaa-lime)] text-[var(--yaa-black)]",
    title: "Users",
    copy: "Discover, join and book your favorite sports activities.",
  },
  {
    icon: KeyRound,
    chip: "bg-[var(--yaa-purple)] text-[var(--yaa-off)]",
    title: "Club Owners",
    copy: "Grow your community and manage clubs effortlessly.",
  },
  {
    icon: Building2,
    chip: "bg-[var(--yaa-red)] text-[var(--yaa-off)]",
    title: "Venues / Organizers",
    copy: "List your venues, host events and reach more players.",
  },
];

export function Roles() {
  return (
    <section id="roles" className="bg-[var(--yaa-white)] pb-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal className="grid items-center gap-10 rounded-[32px] bg-[var(--yaa-cream)] px-6 py-14 md:px-12 lg:grid-cols-[34%_66%] lg:gap-12 lg:py-16">
          {/* Left: headline */}
          <div>
            <h2 className="font-display text-[clamp(30px,3.4vw,48px)] uppercase leading-[0.95]">
              Built for every role in the sports ecosystem.
            </h2>
          </div>

          {/* Right: three cards */}
          <div className="grid gap-5 sm:grid-cols-3">
            {ROLES.map((role) => (
              <Tilt key={role.title} max={7} className="rounded-[20px]">
                <div className="lift-card h-full rounded-[20px] border border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] p-6">
                  <span
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full ${role.chip}`}
                  >
                    <role.icon size={26} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl">{role.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--yaa-ink-60)]">
                    {role.copy}
                  </p>
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
