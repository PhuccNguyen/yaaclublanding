"use client";

import { User, KeyRound, Building2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ROLES = [
  {
    icon: User,
    chip: "bg-[var(--yaa-lime)] text-[var(--yaa-black)]",
    rotate: "lg:-rotate-2",
    title: "Users",
    copy: "Join clubs, book sessions and never miss a game night again.",
  },
  {
    icon: KeyRound,
    chip: "bg-[var(--yaa-purple)] text-[var(--yaa-off)]",
    rotate: "",
    title: "Club Owners",
    copy: "Grow members, fill sessions and run your club from one dashboard.",
  },
  {
    icon: Building2,
    chip: "bg-[var(--yaa-red)] text-[var(--yaa-off)]",
    rotate: "lg:rotate-2",
    title: "Venues / Organizers",
    copy: "List courts, host events and keep every booking in sync.",
  },
];

export function Roles() {
  return (
    <section id="roles" className="bg-[var(--yaa-white)] pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal className="rounded-[32px] bg-[var(--yaa-cream)] px-6 py-16 md:px-14">
          <p className="eyebrow mb-5 text-center text-[var(--yaa-ink-60)]">
            One Platform
          </p>
          <h2 className="mx-auto max-w-[720px] text-center font-display text-[clamp(30px,3.6vw,52px)] uppercase">
            Built for every role in the sports ecosystem.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {ROLES.map((role) => (
              <div
                key={role.title}
                className={`flex flex-col items-center text-center ${role.rotate}`}
              >
                <span
                  className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${role.chip}`}
                >
                  <role.icon size={30} aria-hidden="true" />
                </span>
                <h3 className="font-display text-2xl">{role.title}</h3>
                <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-[var(--yaa-ink-60)]">
                  {role.copy}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
