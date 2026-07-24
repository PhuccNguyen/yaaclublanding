"use client";

import { Compass, CalendarCheck, Megaphone, MessagesSquare, Download } from "lucide-react";
import { MagneticButton } from "@/components/layout/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

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
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:px-10 lg:grid-cols-[1fr_1.9fr] lg:items-start lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-5 text-[var(--yaa-ink-60)]">The App</p>
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

        <Reveal stagger={0.12} className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`${i > 0 ? "lg:border-l lg:border-[var(--yaa-ink-15)] lg:pl-6" : ""}`}
            >
              <feature.icon size={26} className={feature.tone} aria-hidden="true" />
              <h3 className="mt-5 font-display text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--yaa-ink-60)]">
                {feature.copy}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
