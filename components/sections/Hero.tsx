"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "@/components/layout/MagneticButton";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Pill } from "@/components/ui/Pill";
import { Tilt } from "@/components/ui/Tilt";
import { IMAGES } from "@/lib/image-manifest";

/** Hand-drawn lime scribble sticker (kinetic accent behind the runner). */
function Scribble({ className = "", color = "var(--yaa-lime)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden="true" className={className}>
      <path
        d="M28 156c22-58 66-104 118-118 30-8 62 2 66 30 5 34-30 62-70 74-44 14-96 10-108-18-10-24 12-58 44-80"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        className="scribble-path"
      />
    </svg>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.fonts.ready.then(() => {
          if (!headlineRef.current) return;
          const split = new SplitText(headlineRef.current, {
            type: "lines,words",
            linesClass: "split-line",
          });
          gsap.set(headlineRef.current, { opacity: 1 });
          gsap.from(split.words, {
            yPercent: 120,
            duration: 1.1,
            stagger: 0.06,
            ease: "power4.out",
            delay: 0.1,
          });
          gsap.fromTo(
            ".hero-highlight",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: "power4.out", delay: 0.8, transformOrigin: "left center" }
          );
        });

        gsap.from(".hero-stagger", {
          opacity: 0,
          y: 22,
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.4,
        });

        gsap.from(".hero-media", {
          opacity: 0,
          y: 40,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.3,
        });

        gsap.fromTo(
          ".scribble-path",
          { strokeDasharray: 900, strokeDashoffset: 900 },
          { strokeDashoffset: 0, duration: 1.3, ease: "power4.out", delay: 0.7 }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([headlineRef.current, ".hero-stagger", ".hero-media", ".hero-highlight"], {
          opacity: 1,
          clearProps: "transform",
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="discover"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--yaa-cream)] pt-[76px]"
    >
      {/* Grain wash across the full-bleed hero */}
      <span className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply [background-image:radial-gradient(var(--yaa-black)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />

      <div className="mx-auto w-full max-w-[1440px] px-6 pb-20 pt-6 md:px-10 lg:grid lg:grid-cols-[42%_58%] lg:items-center lg:gap-12 lg:pb-16 lg:pt-4">
          {/* LEFT: copy */}
          <div className="relative max-w-[600px]">
            <p className="eyebrow hero-stagger mb-6 text-[var(--yaa-ink-60)]">
              Yaa Club · Wellbeing that works
            </p>

            <h1
              ref={headlineRef}
              className="font-display text-[clamp(42px,5.2vw,76px)] uppercase opacity-0"
            >
              <span className="block">More than a game.</span>
              <span className="block">
                It&apos;s a{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="hero-highlight absolute inset-x-[-2%] inset-y-[10%] z-0 block bg-[var(--yaa-lime)]" />
                  <span className="relative z-10">community.</span>
                </span>
              </span>
            </h1>

            <p className="hero-stagger mt-5 max-w-[420px] text-[15px] leading-relaxed text-[var(--yaa-ink-60)]">
              Discover clubs, join communities, book sports activities and
              organize events, all in one place.
            </p>

            <div className="hero-stagger mt-6 flex flex-wrap items-center gap-3">
              <MagneticButton variant="lime" href="#events">
                <span className="inline-flex items-center gap-2">
                  Explore Clubs <ArrowRight size={16} />
                </span>
              </MagneticButton>
              <MagneticButton variant="ghost" href="#roles">
                <span className="inline-flex items-center gap-2">
                  For Organizers <ArrowRight size={16} />
                </span>
              </MagneticButton>
            </div>

            <StoreBadges scheme="dark" className="hero-stagger mt-6" />
          </div>

          {/* RIGHT: editorial collage (desktop), full-height — measured layer order */}
          <div className="hero-media relative mt-10 hidden h-[calc(100svh-150px)] max-h-[840px] min-h-[540px] lg:mt-0 lg:block">
            {/* ── Layer 0 · BACKGROUND PHOTO: run scene behind the man (muted so he pops) ── */}
            <div className="absolute right-[-4%] top-[6%] z-[5] h-[86%] w-[52%] overflow-hidden rounded-[38px] rotate-[1.5deg]">
              <Image
                src={IMAGES.evtRun}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="30vw"
              />
              <span className="absolute inset-0 bg-[var(--yaa-sand)]/55" />
              <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--yaa-black)]/25 to-transparent" />
            </div>
            {/* contact shadow so the runner is grounded */}
            <span className="pointer-events-none absolute bottom-[2%] right-[8%] z-[6] h-5 w-[26%] rounded-[50%] bg-[var(--yaa-black)] opacity-10 blur-lg" />

            {/* ── Layer 1 · MAN: runner cut-out, breaking the photo frame ── */}
            <Image
              src={IMAGES.heroRunnerCut}
              alt="Athlete sprinting"
              width={1024}
              height={1024}
              priority
              className="absolute bottom-0 right-[-1%] z-20 h-[94%] w-auto object-contain drop-shadow-[0_20px_36px_var(--yaa-ink-15)]"
              sizes="30vw"
            />

            {/* ── Layer 2 · PHONE: center-left, interactive 3D tilt ── */}
            <Tilt
              baseRy={-8}
              baseRx={3}
              max={6}
              className="absolute bottom-[7%] left-[5%] z-30 w-[27%] rounded-[40px] shadow-[-22px_34px_60px_rgba(10,10,10,0.22)]"
            >
              <PhoneMockup />
            </Tilt>

            {/* ── Layer 3 · CARD A · pickleball, tilted -5° (top-left) ── */}
            <div className="absolute left-[1%] top-[3%] z-40 w-[30%] rotate-[-5deg] overflow-hidden rounded-[20px] bg-[var(--yaa-white)] shadow-[0_24px_50px_var(--yaa-ink-15)]">
              <div className="relative">
                <Image
                  src={IMAGES.evtPadel}
                  alt="Pickleball open play"
                  width={480}
                  height={320}
                  className="h-24 w-full object-cover"
                  sizes="20vw"
                />
                <Pill color="lime" className="absolute left-3 top-3">
                  Pickleball
                </Pill>
              </div>
              <div className="p-4">
                <p className="font-display text-base leading-tight">Weekend Open Play</p>
                <p className="mt-2 text-[11px] font-medium text-[var(--yaa-black)]">
                  Sat, Jul 26 · 4:00 PM
                </p>
                <p className="text-[11px] text-[var(--yaa-ink-60)]">Thao Dien Courts, D2</p>
                <div className="mt-3 flex items-center">
                  <div className="flex -space-x-2">
                    {["A", "M", "T", "L", "V"].map((n, i) => (
                      <span
                        key={n}
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--yaa-white)] text-[9px] font-bold ${
                          ["bg-[var(--yaa-lime)] text-[var(--yaa-black)]", "bg-[var(--yaa-purple)] text-[var(--yaa-off)]", "bg-[var(--yaa-red)] text-[var(--yaa-off)]", "bg-[var(--yaa-black)] text-[var(--yaa-cream)]", "bg-[var(--yaa-off)] text-[var(--yaa-black)]"][i]
                        }`}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-[11px] font-semibold text-[var(--yaa-ink-60)]">+204</span>
                </div>
              </div>
            </div>

            {/* ── Layer 3 · CARD B · yoga mini, tilted +4° (center, over the seam) ── */}
            <div className="absolute bottom-[16%] left-[33%] z-40 flex w-[27%] rotate-[4deg] items-center gap-3 rounded-[16px] bg-[var(--yaa-white)] p-2.5 shadow-[0_20px_40px_var(--yaa-ink-15)]">
              <Image
                src={IMAGES.evtYoga}
                alt="Sunset yoga flow"
                width={120}
                height={120}
                className="h-12 w-12 shrink-0 rounded-xl object-cover"
                sizes="60px"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-[var(--yaa-black)]">
                  Sunset Yoga Flow
                </p>
                <p className="text-[10px] text-[var(--yaa-ink-60)]">Tue · 6:30 PM</p>
              </div>
              <span className="shrink-0 rounded-full bg-[var(--yaa-lime)] px-2 py-0.5 text-[10px] font-bold text-[var(--yaa-black)]">
                4.8★
              </span>
            </div>

            {/* ── Layer 4 · ACCENTS: chips + line scribbles ── */}
            <span className="hero-chip absolute left-[30%] top-[6%] z-40 rounded-full bg-[var(--yaa-lime)] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-[var(--yaa-black)] shadow-[0_10px_24px_var(--yaa-ink-15)]">
              Run Club
            </span>
            <span className="hero-chip hero-chip-alt absolute right-[6%] top-[10%] z-40 rounded-full bg-[var(--yaa-purple)] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-[var(--yaa-off)] shadow-[0_10px_24px_var(--yaa-ink-15)]">
              Community
            </span>
            <Scribble className="absolute left-[26%] top-[26%] z-10 h-16 w-16 rotate-6" />
            <Scribble
              className="absolute bottom-[6%] right-[2%] z-[45] h-20 w-20 -rotate-12"
              color="var(--yaa-purple)"
            />
          </div>

          {/* Media (mobile): background photo + runner + phone */}
          <div className="hero-media relative mt-4 h-[420px] sm:h-[500px] lg:hidden">
            {/* Background run photo (muted), behind the man */}
            <div className="absolute inset-y-1 right-[-6%] z-0 w-[62%] overflow-hidden rounded-[28px]">
              <Image src={IMAGES.evtRun} alt="" fill className="object-cover" sizes="60vw" />
              <span className="absolute inset-0 bg-[var(--yaa-sand)]/55" />
            </div>
            <Image
              src={IMAGES.heroRunnerCut}
              alt="Athlete sprinting"
              width={1024}
              height={1024}
              priority
              className="absolute bottom-0 right-[-8%] z-10 h-full w-auto object-contain"
              sizes="60vw"
            />
            <div className="tilt-phone absolute bottom-0 left-0 z-20 w-[52%] max-w-[210px]">
              <PhoneMockup />
            </div>
            <span className="hero-chip absolute right-[6%] top-[4%] z-30 rounded-full bg-[var(--yaa-lime)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--yaa-black)] shadow-[0_10px_24px_var(--yaa-ink-15)]">
              Run Club
            </span>
          </div>
        </div>
    </section>
  );
}
