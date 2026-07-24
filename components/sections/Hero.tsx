"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "@/components/layout/MagneticButton";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Pill } from "@/components/ui/Pill";
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
    <section ref={root} id="discover" className="bg-[var(--yaa-white)] px-3 pt-[84px] md:px-5">
      <div className="mx-auto max-w-[1680px]">
        {/* Cream hero band */}
        <div className="relative overflow-hidden rounded-[36px] bg-[var(--yaa-cream)] px-6 pb-12 pt-10 md:px-12 lg:grid lg:grid-cols-[40%_60%] lg:items-center lg:gap-10 lg:pb-16 lg:pl-16 lg:pr-12 lg:pt-10">
          {/* Grain wash inside the band */}
          <span className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply [background-image:radial-gradient(var(--yaa-black)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />

          {/* LEFT: copy */}
          <div className="relative max-w-[560px]">
            <p className="eyebrow hero-stagger mb-5 text-[var(--yaa-ink-60)]">
              Yaa Club · Wellbeing that works
            </p>

            <h1
              ref={headlineRef}
              className="font-display text-[clamp(38px,4.6vw,64px)] uppercase opacity-0"
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

          {/* RIGHT: media collage (desktop) */}
          <div className="scene hero-media relative mt-10 hidden h-[480px] lg:mt-0 lg:block xl:h-[500px]">
            <Scribble className="absolute -top-5 right-[34%] z-30 h-24 w-24 rotate-6" />
            <Scribble
              className="absolute bottom-6 right-1 z-30 h-20 w-20 -rotate-12"
              color="var(--yaa-purple)"
            />

            <div className="grid h-full grid-cols-[1.1fr_0.9fr] gap-3">
              <div className="relative overflow-hidden rounded-[24px]">
                <Image
                  src={IMAGES.heroAthlete}
                  alt="Athletes celebrating after a session"
                  fill
                  priority
                  className="object-cover"
                  sizes="30vw"
                />
              </div>
              <div className="relative overflow-hidden rounded-[24px]">
                <Image
                  src={IMAGES.heroRunner}
                  alt="Runner mid-stride at golden hour"
                  fill
                  priority
                  className="object-cover"
                  sizes="24vw"
                />
              </div>
            </div>

            {/* Branded lime glow behind the phone */}
            <span className="pointer-events-none absolute left-[3%] top-1/2 z-0 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--yaa-lime)] opacity-70 blur-3xl" />

            {/* 3D phone over the seam */}
            <div className="tilt-phone absolute left-[5%] top-1/2 z-20 w-[25%] -translate-y-1/2">
              <PhoneMockup />
            </div>

            {/* Floating brand chips (3D depth, gentle float) */}
            <span className="hero-chip absolute left-[-1%] top-[3%] z-30 rounded-full bg-[var(--yaa-lime)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--yaa-black)] shadow-[0_10px_24px_var(--yaa-ink-15)]">
              Pickleball
            </span>
            <span className="hero-chip hero-chip-alt absolute bottom-[16%] left-[28%] z-30 rounded-full bg-[var(--yaa-purple)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--yaa-off)] shadow-[0_10px_24px_var(--yaa-ink-15)]">
              Yoga
            </span>

            {/* Floating event card */}
            <div className="float-card absolute bottom-2 right-3 z-20 w-[40%] overflow-hidden rounded-[18px] bg-[var(--yaa-white)] shadow-[0_20px_45px_var(--yaa-ink-15)]">
              <div className="relative">
                <Image
                  src={IMAGES.heroEventCard}
                  alt="Evening hoops open play"
                  width={480}
                  height={300}
                  className="h-24 w-full object-cover"
                  sizes="24vw"
                />
                <Pill color="red" className="absolute left-2.5 top-2.5">
                  Running
                </Pill>
              </div>
              <div className="p-3">
                <p className="font-display text-sm">Evening Hoops</p>
                <p className="mt-0.5 text-[11px] text-[var(--yaa-ink-60)]">
                  Tonight · 7:00 PM · Court 4
                </p>
              </div>
            </div>
          </div>

          {/* Media (mobile): athlete + phone */}
          <div className="scene hero-media relative mt-8 h-[380px] sm:h-[440px] lg:hidden">
            <div className="relative h-full overflow-hidden rounded-[24px]">
              <Image
                src={IMAGES.heroAthlete}
                alt="Athletes celebrating after a session"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="tilt-phone absolute -bottom-4 right-2 w-[46%] max-w-[210px]">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
