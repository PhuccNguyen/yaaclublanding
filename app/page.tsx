import { LenisProvider } from "@/lib/lenis";
import { Cursor } from "@/components/ui/Cursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Features } from "@/components/sections/Features";
import { Roles } from "@/components/sections/Roles";
import { FeaturedEvents } from "@/components/sections/FeaturedEvents";
import { BigCTA } from "@/components/sections/BigCTA";

export default function Home() {
  return (
    <LenisProvider>
      <Cursor />
      <GrainOverlay />
      <Nav />
      <main id="top" className="bg-[var(--yaa-white)]">
        <Hero />
        <StatsBar />
        <Features />
        <Roles />
        <FeaturedEvents />
        <BigCTA />
      </main>
      <Footer />
    </LenisProvider>
  );
}
