"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { FEATURED_EVENTS, type YaaEvent } from "@/lib/events";
import { soonHref } from "@/lib/navigation";

const AVATAR_TONES = [
  "bg-[var(--yaa-lime)] text-[var(--yaa-black)]",
  "bg-[var(--yaa-purple)] text-[var(--yaa-off)]",
  "bg-[var(--yaa-red)] text-[var(--yaa-off)]",
  "bg-[var(--yaa-black)] text-[var(--yaa-cream)]",
  "bg-[var(--yaa-off)] text-[var(--yaa-black)]",
];

function EventCard({ event, index }: { event: YaaEvent; index: number }) {
  return (
    <Tilt
      max={7}
      className={`w-[280px] shrink-0 snap-start rounded-[20px] lg:w-auto ${
        index % 2 === 1 ? "lg:translate-y-6" : ""
      }`}
    >
    <article
      className="lift-card overflow-hidden rounded-[20px] border border-[var(--yaa-ink-15)] bg-[var(--yaa-white)]"
    >
      <div className="relative">
        <Image
          src={event.image}
          alt={event.title}
          width={480}
          height={320}
          className="h-44 w-full object-cover"
          sizes="(min-width: 1024px) 18vw, 280px"
        />
        <Pill color={event.categoryColor} className="absolute left-3 top-3">
          {event.category}
        </Pill>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg leading-tight">{event.title}</h3>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--yaa-ink-60)]">
          <Clock size={12} aria-hidden="true" />
          {event.date} · {event.time}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--yaa-ink-60)]">
          <MapPin size={12} aria-hidden="true" />
          {event.venue}
        </p>

        <div className="mt-4 flex items-center">
          <div className="flex -space-x-2">
            {event.members.map((name, i) => (
              <span
                key={name}
                title={name}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--yaa-white)] text-[10px] font-bold ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
              >
                {name.charAt(0)}
              </span>
            ))}
          </div>
          <span className="ml-2 text-xs font-semibold text-[var(--yaa-ink-60)]">
            +{event.extraMembers}
          </span>
        </div>
      </div>
    </article>
    </Tilt>
  );
}

export function FeaturedEvents() {
  return (
    <section id="events" className="bg-[var(--yaa-white)] pb-24 pt-4">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-4 text-[var(--yaa-ink-60)]">This Week</p>
            <h2 className="font-display text-[clamp(30px,3.6vw,52px)] uppercase">
              Featured Events
            </h2>
          </div>
          <Link
            href={soonHref("All Events")}
            className="nav-link inline-flex items-center gap-2 text-sm font-semibold"
          >
            View all events <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal
          stagger={0.08}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-6"
        >
          {FEATURED_EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
