"use client";

import { useRef } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "@/components/layout/MagneticButton";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Pill } from "@/components/ui/Pill";
import { Tilt } from "@/components/ui/Tilt";
import { IMAGES } from "@/lib/image-manifest";

/** Hand-drawn scribble accent (kinetic corner mark). */
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

/** Paint-splatter accent (organic blob + spray dots). */
function Splash({ className = "", color = "var(--yaa-lime)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 240 220" fill={color} aria-hidden="true" className={className}>
      <path d="M70 34c26-16 74-20 100 6 20 20 12 50-4 72-9 13 10 30-4 46-16 20-54 18-80 6-30-14-52-34-56-66-3-26 20-46 44-64z" />
      <circle cx="26" cy="120" r="11" />
      <circle cx="210" cy="150" r="13" />
      <circle cx="176" cy="24" r="9" />
      <circle cx="224" cy="86" r="7" />
      <ellipse cx="18" cy="66" rx="10" ry="7" />
      <circle cx="120" cy="202" r="8" />
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
          /* Lime highlight sweeps in behind both accent lines */
          gsap.fromTo(
            ".hero-highlight",
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.7,
              stagger: 0.09,
              ease: "power4.out",
              delay: 0.75,
              transformOrigin: "left center",
            }
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
      className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--yaa-cream)] pt-[76px]"
    >
      {/* Grain wash */}
      <span className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-multiply [background-image:radial-gradient(var(--yaa-black)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />

      <div className="mx-auto grid w-full max-w-[1660px] items-center gap-10 px-6 pb-14 pt-6 md:px-10 lg:min-h-[calc(100svh-76px)] lg:grid-cols-[40fr_60fr] lg:gap-12 lg:pb-8 lg:pt-0 xl:px-14">
        {/* ══════════ LEFT · text ══════════ */}
        {/* container-type lets the headline scale off THIS column's width, so the
            three lines never wrap — on iPhone, iPad or desktop alike. */}
        <div className="max-w-[620px] [container-type:inline-size]">
          <p className="eyebrow hero-stagger mb-5 text-[var(--yaa-ink-60)] sm:mb-6">
            Yaa Club · Wellbeing that works
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-[clamp(24px,9.6cqw,64px)] uppercase opacity-0"
          >
            <span className="block whitespace-nowrap">More than a game,</span>
            <span className="block">
              <span className="relative inline-block whitespace-nowrap">
                <span className="hero-highlight absolute inset-x-[-2%] inset-y-[10%] z-0 block bg-[var(--yaa-lime)]" />
                <span className="relative z-10">it&apos;s a</span>
              </span>
            </span>
            <span className="block">
              <span className="relative inline-block whitespace-nowrap">
                <span className="hero-highlight absolute inset-x-[-2%] inset-y-[10%] z-0 block bg-[var(--yaa-lime)]" />
                <span className="relative z-10">community</span>
              </span>
            </span>
          </h1>

          <p className="hero-stagger mt-7 max-w-[440px] text-[15px] leading-relaxed text-[var(--yaa-ink-60)]">
            Discover clubs, join communities, book sports activities and
            organize events, all in one place.
          </p>

          <div className="hero-stagger mt-8 sm:mt-9">
            <MagneticButton
              variant="dark"
              href="#download"
              className="w-full! justify-center px-8! py-5! text-base! shadow-[0_16px_36px_rgba(10,10,10,0.28)] sm:w-auto! sm:py-4! sm:text-sm!"
            >
              <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
                Download the App <Download size={20} className="sm:size-4" />
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* ══════════ RIGHT · two rounded photo panels + phone (desktop) ══════════ */}
        <div className="hero-media relative hidden lg:block">
          {/* Lime splash accent, offset from the top-left corner */}
          <Splash className="pointer-events-none absolute -left-7 -top-7 z-[1] h-24 w-24 -rotate-12" />

          <div className="grid h-[60vh] max-h-[600px] min-h-[440px] grid-cols-[1.1fr_0.9fr] gap-5">
            {/* Panel 1 · community photo (phone sits on top) */}
            <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_60px_var(--yaa-ink-15)]">
              <Image src={IMAGES.heroAthlete} alt="A community of athletes" fill priority className="object-cover" sizes="32vw" />
              <span className="absolute inset-0 bg-[var(--yaa-black)]/20" />
              <Pill color="lime" className="absolute left-4 top-4 z-20">
                Pickleball
              </Pill>
              <Pill color="purple" className="absolute bottom-4 right-4 z-20">
                Yoga
              </Pill>
            </div>

            {/* Panel 2 · run-club photo */}
            <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_60px_var(--yaa-ink-15)]">
              <Image src={IMAGES.evtRun} alt="Run club at dusk" fill priority className="object-cover" sizes="32vw" />
              <span className="absolute inset-0 bg-[var(--yaa-black)]/10" />
              <Scribble className="absolute left-2 top-2 h-16 w-16 rotate-6" />
              <Scribble className="absolute bottom-2 right-2 h-16 w-16 -rotate-12" color="var(--yaa-purple)" />
            </div>
          </div>

          {/* Phone · centred on panel 1, clearly tilted to one side (not front-on) */}
          <Tilt
            baseRy={-22}
            baseRx={9}
            baseRz={-10}
            max={5}
            className="absolute left-[13%] top-1/2 z-30 w-[27%] min-w-[214px] max-w-[262px] -translate-y-1/2 rounded-[40px] shadow-[-40px_46px_80px_rgba(10,10,10,0.36)]"
          >
            <PhoneMockup />
          </Tilt>

          {/* ── Small floating cards (tilted), bridging the two panels ── */}
          <div className="absolute left-[50%] top-[11%] z-40 w-[16%] min-w-[198px] max-w-[236px] -rotate-6 overflow-hidden rounded-[16px] bg-[var(--yaa-white)] shadow-[0_22px_46px_var(--yaa-ink-15)]">
            <div className="relative">
              <Image src={IMAGES.evtPadel} alt="Pickleball open play" width={360} height={200} className="h-16 w-full object-cover" sizes="16vw" />
              <span className="absolute left-2 top-2 rounded-full bg-[var(--yaa-lime)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--yaa-black)]">
                Pickleball
              </span>
            </div>
            <div className="p-3">
              <p className="font-display text-[13px] leading-tight">Weekend Open Play</p>
              <p className="mt-1 text-[10px] text-[var(--yaa-ink-60)]">Sat, Jul 26 · 4:00 PM</p>
            </div>
          </div>

          <div className="absolute bottom-[12%] left-[46%] z-40 flex w-[15%] min-w-[198px] max-w-[236px] rotate-[5deg] items-center gap-2.5 rounded-[14px] bg-[var(--yaa-white)] p-2 shadow-[0_18px_40px_var(--yaa-ink-15)]">
            <Image src={IMAGES.evtYoga} alt="Sunset yoga flow" width={100} height={100} className="h-11 w-11 shrink-0 rounded-xl object-cover" sizes="48px" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-[var(--yaa-black)]">Sunset Yoga Flow</p>
              <p className="text-[9px] text-[var(--yaa-ink-60)]">Tue · 6:30 PM</p>
            </div>
            <span className="shrink-0 rounded-full bg-[var(--yaa-lime)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--yaa-black)]">
              4.8★
            </span>
          </div>
        </div>
      </div>

      {/* ══════════ MOBILE media (stacked below the text) ══════════ */}
      <div className="hero-media px-6 pb-14 lg:hidden">
        <div className="relative h-[440px] sm:h-[520px]">
          <div className="absolute inset-y-0 right-0 w-[64%] overflow-hidden rounded-[28px] shadow-[0_20px_50px_var(--yaa-ink-15)]">
            <Image src={IMAGES.heroAthlete} alt="A community of athletes" fill className="object-cover" sizes="60vw" />
            <span className="absolute inset-0 bg-[var(--yaa-black)]/20" />
            <Pill color="purple" className="absolute bottom-3 right-3 z-20">
              Yoga
            </Pill>
          </div>
          <Splash className="pointer-events-none absolute right-[2%] top-[2%] z-0 h-20 w-20 -rotate-6" />
          <div className="tilt-phone absolute bottom-0 left-0 z-20 w-[52%] max-w-[210px]">
            <PhoneMockup />
          </div>
          <span className="hero-chip absolute left-[2%] top-[6%] z-30 rounded-full bg-[var(--yaa-lime)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--yaa-black)] shadow-[0_10px_24px_var(--yaa-ink-15)]">
            Pickleball
          </span>
        </div>
      </div>
    </section>
  );
}
