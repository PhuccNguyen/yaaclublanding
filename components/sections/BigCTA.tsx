"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/layout/MagneticButton";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/image-manifest";
import { soonHref } from "@/lib/navigation";

export function BigCTA() {
  return (
    <section id="download" className="bg-[var(--yaa-white)] px-4 pb-20 md:px-8">
      <div className="mx-auto grid min-h-[240px] max-w-[1440px] items-center gap-10 overflow-hidden rounded-[32px] bg-[var(--yaa-black)] px-6 py-14 text-[var(--yaa-cream)] md:px-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8">
        <Reveal>
          <h2 className="font-display text-[clamp(30px,3.8vw,54px)] uppercase leading-[0.95]">
            Ready to be part of{" "}
            <span className="text-[var(--yaa-lime)]">something bigger?</span>
          </h2>
          <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-[var(--yaa-cream)]/70">
            Join thousands of players building better weeks through sport.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-start gap-6">
          <MagneticButton variant="lime" href={soonHref("Get Started")}>
            Get Started for Free
          </MagneticButton>
          <StoreBadges scheme="light" />
        </Reveal>

        <Reveal delay={0.2} className="relative hidden lg:block">
          {/* CTA-01 slot, pre-composited with the cream icon (safe area enforced by sharp) */}
          <Image
            src={IMAGES.ctaBanner}
            alt="Night training session energy"
            width={1200}
            height={520}
            className="h-auto w-full rotate-1 rounded-[24px] object-cover"
            sizes="(min-width: 1024px) 30vw, 0vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
