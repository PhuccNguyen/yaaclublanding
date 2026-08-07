import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { soonHref } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Download the App | Yaa Club",
  description:
    "Yaa Club mobile app — coming soon to App Store and Google Play. Discover clubs, book activities, and connect with your community.",
};

/* ── Store icon glyphs (inline SVG, no external deps) ─── */

function AppleGlyph() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden="true">
      <path d="M18.1 13.7c0-3 2.5-4.5 2.6-4.6-1.4-2-3.6-2.3-4.3-2.3-1.8-.2-3.6 1.1-4.5 1.1-.9 0-2.4-1.1-3.9-1-2 0-3.9 1.2-4.9 3-2.1 3.6-.5 9 1.5 11.9 1 1.4 2.2 3 3.7 3 1.5-.1 2.1-1 3.9-1s2.3 1 3.9.9c1.6 0 2.6-1.5 3.6-2.9 1.1-1.7 1.6-3.3 1.6-3.4-.1-.1-3.2-1.3-3.2-4.7zM15.2 4.9c.8-1 1.4-2.4 1.2-3.9-1.2.1-2.7.9-3.5 1.9-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.7 3.6-1.7z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true" fill="currentColor">
      <path d="M1.5 1.2C1.2 1.6 1 2.1 1 2.8v18.4c0 .7.2 1.2.5 1.6l.1.1 10.3-10.3v-.2L1.6 1.1l-.1.1z" opacity="0.9" />
      <path d="M15.3 15.1l-3.4-3.5v-.2l3.4-3.4.1.1 4.1 2.3c1.2.7 1.2 1.7 0 2.4l-4.1 2.3h-.1z" opacity="0.65" />
      <path d="M15.4 15L11.9 11.5 1.5 21.9c.4.4 1 .4 1.8 0L15.4 15z" opacity="0.8" />
      <path d="M15.4 8L3.3 1.2C2.5.8 1.9.9 1.5 1.3l10.4 10.3L15.4 8z" />
    </svg>
  );
}

export default function DownloadPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--yaa-black)] text-[var(--yaa-cream)]">
      {/* ── CSS keyframe animations ─────────────────────────────── */}
      <style>{`
        /* 3D float — each phone has its own perspective+tilt baked in */
        @keyframes float-left {
          0%, 100% { transform: perspective(1100px) rotateY(-20deg) rotateX(5deg) rotateZ(-2deg) translateY(0px); }
          50%       { transform: perspective(1100px) rotateY(-20deg) rotateX(5deg) rotateZ(-2deg) translateY(-18px); }
        }
        @keyframes float-center {
          0%, 100% { transform: perspective(1400px) rotateY(0deg) rotateX(3deg) translateY(0px); }
          50%       { transform: perspective(1400px) rotateY(0deg) rotateX(3deg) translateY(-24px); }
        }
        @keyframes float-right {
          0%, 100% { transform: perspective(1100px) rotateY(20deg) rotateX(5deg) rotateZ(2deg) translateY(0px); }
          50%       { transform: perspective(1100px) rotateY(20deg) rotateX(5deg) rotateZ(2deg) translateY(-18px); }
        }
        .dl-phone-left   { animation: float-left   4.8s ease-in-out infinite; }
        .dl-phone-center { animation: float-center  5.6s ease-in-out infinite 0.7s; }
        .dl-phone-right  { animation: float-right   4.2s ease-in-out infinite 1.4s; }

        /* SVG sketch draw-in + fade-out, looping */
        @keyframes sketch-a {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          8%   { opacity: 1; }
          75%  { stroke-dashoffset: 0; opacity: 1; }
          90%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes sketch-b {
          0%   { stroke-dashoffset: 2000; opacity: 0; }
          12%  { opacity: 0.6; }
          78%  { stroke-dashoffset: 0; opacity: 0.6; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes sketch-c {
          0%   { stroke-dashoffset: 1700; opacity: 0; }
          10%  { opacity: 0.4; }
          80%  { stroke-dashoffset: 0; opacity: 0.4; }
          93%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .sketch-line-a { stroke-dasharray: 2400; animation: sketch-a  9s ease-in-out infinite; }
        .sketch-line-b { stroke-dasharray: 2000; animation: sketch-b 12s ease-in-out infinite 3s; }
        .sketch-line-c { stroke-dasharray: 1700; animation: sketch-c 10s ease-in-out infinite 1.5s; }
      `}</style>

      {/* ── Grain wash ──────────────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.045]
          [background-image:radial-gradient(var(--yaa-cream)_0.5px,transparent_0.5px)]
          [background-size:4px_4px]"
      />

      {/* ── Radial glow behind phones ────────────────────────────── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[35%] z-0 h-[600px] w-[600px]
          -translate-x-1/2 -translate-y-1/2 rounded-full
          bg-[radial-gradient(circle,var(--yaa-lime)/12%,transparent_70%)]"
      />

      {/* ── Animated SVG sketch lines ────────────────────────────── */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Lime sweep — wide diagonal */}
        <path
          d="M-120 720 C 180 200, 520 820, 820 360 S 1240 100, 1600 420"
          stroke="var(--yaa-lime)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="sketch-line-a"
        />
        {/* Purple sweep — top half */}
        <path
          d="M-80 280 C 220 620, 540 140, 900 520 S 1280 240, 1600 600"
          stroke="var(--yaa-purple)"
          strokeWidth="2"
          strokeLinecap="round"
          className="sketch-line-b"
        />
        {/* Cream sweep — bottom accent */}
        <path
          d="M-160 860 C 320 500, 720 900, 1040 600 S 1380 300, 1680 720"
          stroke="var(--yaa-cream)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="sketch-line-c"
        />
      </svg>

      {/* ── Top navigation bar ───────────────────────────────────── */}
      <header className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" aria-label="Yaa Club home">
          <Logo variant="inverted" orientation="horizontal" height={30} priority />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--yaa-cream)]/25 px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--yaa-lime)] hover:text-[var(--yaa-lime)]"
        >
          <ArrowLeft size={14} />
          Back home
        </Link>
      </header>

      {/* ── Main content ─────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center gap-14 px-6 pb-20 pt-4 md:px-10">

        {/* Phone mockup cluster */}
        <div className="flex w-full items-end justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* LEFT phone — desktop only, tilted left */}
          <div
            aria-hidden="true"
            className="dl-phone-left hidden w-[200px] shrink-0 opacity-50 lg:block xl:w-[240px]"
            style={{ filter: "drop-shadow(0 56px 80px rgba(0,0,0,0.72))" }}
          >
            <PhoneMockup />
          </div>

          {/* CENTER phone — always visible, largest */}
          <div
            className="dl-phone-center w-[220px] shrink-0 sm:w-[260px] lg:w-[290px] xl:w-[330px]"
            style={{ filter: "drop-shadow(0 80px 120px rgba(0,0,0,0.85))" }}
          >
            <PhoneMockup />
          </div>

          {/* RIGHT phone — desktop only, tilted right */}
          <div
            aria-hidden="true"
            className="dl-phone-right hidden w-[200px] shrink-0 opacity-50 lg:block xl:w-[240px]"
            style={{ filter: "drop-shadow(0 56px 80px rgba(0,0,0,0.72))" }}
          >
            <PhoneMockup />
          </div>
        </div>

        {/* Text block + CTA */}
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow pill */}
          <span className="eyebrow mb-5 rounded-full bg-[var(--yaa-lime)] px-4 py-1.5 text-[var(--yaa-black)]">
            Yaa Club · Mobile
          </span>

          {/* Headline */}
          <h1 className="font-display text-[clamp(46px,8.5vw,110px)] uppercase leading-[0.9]">
            Get the App
          </h1>

          {/* Subtext */}
          <p className="mt-5 max-w-[480px] text-[15px] leading-relaxed text-[var(--yaa-cream)]/65">
            Available on iOS and Android very soon. Follow us to be the first
            to know when we launch.
          </p>

          {/* Store buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* App Store */}
            <Link
              href={soonHref("App Store")}
              id="dl-appstore"
              className="group inline-flex items-center gap-3.5 rounded-2xl border border-[var(--yaa-cream)]/20
                bg-[var(--yaa-cream)]/5 px-6 py-4 backdrop-blur-sm
                transition-all duration-300 hover:-translate-y-1.5
                hover:border-[var(--yaa-lime)] hover:bg-[var(--yaa-lime)]/8
                hover:shadow-[0_20px_40px_rgba(210,255,0,0.1)]"
            >
              <span className="text-[var(--yaa-cream)] transition-colors group-hover:text-[var(--yaa-lime)]">
                <AppleGlyph />
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--yaa-cream)]/55">
                  Download on the
                </span>
                <span className="text-[18px] font-semibold tracking-tight text-[var(--yaa-cream)]">
                  App Store
                </span>
              </span>
            </Link>

            {/* Google Play */}
            <Link
              href={soonHref("Google Play")}
              id="dl-googleplay"
              className="group inline-flex items-center gap-3.5 rounded-2xl border border-[var(--yaa-cream)]/20
                bg-[var(--yaa-cream)]/5 px-6 py-4 backdrop-blur-sm
                transition-all duration-300 hover:-translate-y-1.5
                hover:border-[var(--yaa-lime)] hover:bg-[var(--yaa-lime)]/8
                hover:shadow-[0_20px_40px_rgba(210,255,0,0.1)]"
            >
              <span className="text-[var(--yaa-cream)] transition-colors group-hover:text-[var(--yaa-lime)]">
                <PlayGlyph />
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--yaa-cream)]/55">
                  Get it on
                </span>
                <span className="text-[18px] font-semibold tracking-tight text-[var(--yaa-cream)]">
                  Google Play
                </span>
              </span>
            </Link>
          </div>

          {/* Social nudge */}
          <p className="mt-6 text-sm text-[var(--yaa-cream)]/40">
            Follow us on{" "}
            <a
              href="https://x.com/YaaClubApp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--yaa-cream)]/70 underline underline-offset-2 transition-colors hover:text-[var(--yaa-lime)]"
            >
              X (Twitter)
            </a>{" "}
            for launch updates.
          </p>
        </div>
      </section>

      {/* ── Footer note ──────────────────────────────────────────── */}
      <footer className="relative z-10 pb-8 text-center text-xs text-[var(--yaa-cream)]/35">
        © 2026 YaaClub. Wellbeing that works.
      </footer>
    </main>
  );
}
