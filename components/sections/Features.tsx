"use client";

import { Compass, CalendarCheck, Megaphone, MessagesSquare, Download } from "lucide-react";
import { MagneticButton } from "@/components/layout/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";

const FEATURES = [
  {
    icon: Compass,
    tone: "text-[var(--yaa-black)]",
    title: "Club Discovery",
    copy: "Find clubs near you by sport, level and vibe. Preview before you join.",
  },
  {
    icon: CalendarCheck,
    tone: "text-[var(--yaa-purple)]",
    title: "Sports Booking",
    copy: "Book courts, classes and coaches in seconds. Pay once, play often.",
  },
  {
    icon: Megaphone,
    tone: "text-[var(--yaa-red)]",
    title: "Event Management",
    copy: "Create events, manage sign-ups and check members in from one screen.",
  },
  {
    icon: MessagesSquare,
    tone: "text-[var(--yaa-black)]",
    title: "Community Hub",
    copy: "Chat with your crew, share results and keep every season connected.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-[var(--yaa-white)]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 md:px-10 lg:grid-cols-[1fr_1.9fr] lg:items-start lg:gap-16 lg:py-28">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] uppercase">
            Everything you need, all in one app.
          </h2>
          <p className="mt-5 max-w-[380px] text-base leading-relaxed text-[var(--yaa-ink-60)]">
            Stop juggling group chats, spreadsheets and booking sites. Yaa Club
            puts your whole sports life in your pocket.
          </p>
          <div className="mt-8">
            <MagneticButton variant="lime" href="#download">
              <span className="inline-flex items-center gap-2">
                Download the App <Download size={16} />
              </span>
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal stagger={0.12} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Tilt key={feature.title} max={6} className="rounded-[20px]">
              <div className="lift-card h-full rounded-[20px] border border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] p-6">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--yaa-cream)]">
                  <feature.icon size={26} className={feature.tone} aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl">{feature.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--yaa-ink-60)]">
                  {feature.copy}
                </p>
              </div>
            </Tilt>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
