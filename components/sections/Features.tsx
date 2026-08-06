"use client";

import Image from "next/image";
import { Search, CalendarDays, ArrowRight, type LucideIcon } from "lucide-react";
import { MagneticButton } from "@/components/layout/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

/** A feature is illustrated either by a lucide line icon or a brand PNG mark. */
type Feature = { title: string; copy: string } & (
  | { icon: LucideIcon; tone: string }
  | { image: string }
);

const FEATURES: Feature[] = [
  {
    icon: Search,
    tone: "text-[var(--yaa-black)]",
    title: "Club Discovery",
    copy: "Find the right clubs and communities for your passion.",
  },
  {
    icon: CalendarDays,
    tone: "text-[var(--yaa-purple)]",
    title: "Sports Booking",
    copy: "Book courts, venues and classes in just a few taps.",
  },
  {
    image: "/icon_yaaclub/connect_icon_yaaclub.png",
    title: "Event Management",
    copy: "Create, promote and manage events with ease.",
  },
  {
    image: "/icon_yaaclub/global_icon_yaaclub.png",
    title: "Community Hub",
    copy: "Connect, chat and grow your community together.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-[var(--yaa-white)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:px-10 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-16 lg:py-24">
        {/* ── Left · headline + download ── */}
        <Reveal>
          <h2 className="font-display text-[clamp(30px,3.6vw,52px)] uppercase leading-[0.98]">
            Everything you need, all in one app
          </h2>
          <p className="mt-5 max-w-[340px] text-[15px] leading-relaxed text-[var(--yaa-ink-60)]">
            Explore, connect and manage your sports life seamlessly.
          </p>
          <div className="mt-8 flex flex-nowrap items-center gap-3">
            <MagneticButton variant="lime" href="#events">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                Explore Clubs <ArrowRight size={14} />
              </span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="#roles">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                For Organizers <ArrowRight size={14} />
              </span>
            </MagneticButton>
          </div>
        </Reveal>

        {/* ── Right · four centred feature columns (line icons + brand marks) ── */}
        <Reveal stagger={0.1} className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="group flex flex-col items-center px-2 text-center">
              <span className="flex h-[30px] items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                {"image" in feature ? (
                  <Image
                    src={feature.image}
                    alt=""
                    width={30}
                    height={30}
                    className="h-[30px] w-[30px] object-contain"
                  />
                ) : (
                  <feature.icon
                    size={30}
                    strokeWidth={1.8}
                    className={feature.tone}
                    aria-hidden="true"
                  />
                )}
              </span>
              <h3 className="mt-5 font-display text-lg">{feature.title}</h3>
              <p className="mt-2 max-w-[190px] text-[13.5px] leading-relaxed text-[var(--yaa-ink-60)]">
                {feature.copy}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
