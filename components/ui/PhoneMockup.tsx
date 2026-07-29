import Image from "next/image";
import {
  SlidersHorizontal,
  Search,
  Bell,
  List,
  MapPin,
  ChevronDown,
  RotateCcw,
  X,
  Heart,
  Zap,
  MessageCircle,
  Handshake,
  LayoutGrid,
  User,
} from "lucide-react";
import { IMAGES } from "@/lib/image-manifest";

const TABS = ["People", "Clubs", "Meets", "Matches"];
const COMMUNITIES = ["Sunrise Runners", "Zain Padel Club"];
const HOBBIES = ["Coffee", "Hiking", "Vinyl"];

const NAV = [
  { Icon: MessageCircle, label: "Chat", badge: 1 },
  { Icon: Handshake, label: "Connect", active: true },
  { Icon: LayoutGrid, label: "Wall" },
  { Icon: User, label: "Profile" },
];

/**
 * Yaa Club "Connect" screen (HERO-02), mirroring the real app's swipe-to-connect
 * flow. The whole UI is sized in `em` off a `cqw` root font-size, so it scales
 * perfectly with the phone width — it reads identically at any size (desktop or
 * mobile) like a real screenshot, with no reflowing/jumping text.
 */
export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19] w-full [container-type:inline-size] ${className}`}
    >
      {/* Phone shell — font-size is a % of the phone width, everything scales off it */}
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[13cqw] border-[3cqw] border-[var(--yaa-black)] bg-[var(--yaa-off)] text-[3.8cqw] leading-none">
        {/* Dynamic island */}
        <span className="absolute left-1/2 top-[0.8em] z-20 h-[0.5em] w-[8em] -translate-x-1/2 rounded-full bg-[var(--yaa-black)]" />

        <div className="flex h-full flex-col pt-[3.2em]">
          {/* Top bar */}
          <div className="flex items-center gap-[0.6em] px-[1.2em]">
            <SlidersHorizontal size="1.2em" className="shrink-0 text-[var(--yaa-black)]" aria-hidden="true" />
            <div className="flex min-w-0 flex-1 items-center gap-[0.4em] rounded-full border border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] px-[0.8em] py-[0.45em] text-[0.8em] text-[var(--yaa-ink-60)]">
              <Search size="0.9em" className="shrink-0" aria-hidden="true" />
              <span className="truncate">Search people, clubs...</span>
            </div>
            <span className="relative shrink-0">
              <Bell size="1.2em" className="text-[var(--yaa-black)]" aria-hidden="true" />
              <span className="absolute -right-[0.3em] -top-[0.3em] flex h-[1em] w-[1em] items-center justify-center rounded-full bg-[var(--yaa-red)] text-[0.5em] font-bold text-[var(--yaa-off)]">
                2
              </span>
            </span>
            <List size="1.2em" className="shrink-0 text-[var(--yaa-black)]" aria-hidden="true" />
          </div>

          {/* Tabs */}
          <div className="mt-[1em] flex items-center justify-between px-[1.2em]">
            {TABS.map((tab, i) => (
              <span key={tab} className="flex flex-col items-center gap-[0.35em]">
                <span
                  className={`whitespace-nowrap text-[1em] font-bold ${
                    i === 0 ? "text-[var(--yaa-black)]" : "text-[var(--yaa-ink-60)]"
                  }`}
                >
                  {tab}
                </span>
                {i === 0 && <span className="h-[0.2em] w-[2em] rounded-full bg-[var(--yaa-lime)]" />}
              </span>
            ))}
          </div>

          {/* Filter pills */}
          <div className="mt-[0.8em] flex items-center gap-[0.6em] px-[1.2em]">
            <span className="flex min-w-0 flex-1 items-center gap-[0.4em] rounded-[0.8em] border border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] px-[0.8em] py-[0.5em] text-[0.8em] font-semibold text-[var(--yaa-black)]">
              <MapPin size="0.9em" className="shrink-0" aria-hidden="true" />
              <span className="truncate">Los Angeles, USA</span>
            </span>
            <span className="flex shrink-0 items-center gap-[0.3em] rounded-[0.8em] border border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] px-[0.8em] py-[0.5em] text-[0.8em] font-medium text-[var(--yaa-ink-60)]">
              <span className="whitespace-nowrap">Select Sport</span>
              <ChevronDown size="0.9em" className="shrink-0" aria-hidden="true" />
            </span>
          </div>

          <p className="mt-[1em] text-center text-[1em] font-bold text-[var(--yaa-black)]">
            Swipe to connect
          </p>

          {/* Profile card */}
          <div className="mx-[1.2em] mt-[0.8em] overflow-hidden rounded-[1.2em] bg-[var(--yaa-white)] shadow-[0_0.6em_1.6em_var(--yaa-ink-08)]">
            <div className="flex items-center gap-[0.8em] bg-[var(--yaa-black)] px-[1em] py-[0.8em]">
              <span className="relative h-[3.4em] w-[3.4em] shrink-0 overflow-hidden rounded-full ring-[0.2em] ring-[var(--yaa-lime)]">
                <Image src={IMAGES.evtYoga} alt="" fill className="object-cover" sizes="48px" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[1.1em] font-bold leading-tight text-[var(--yaa-off)]">Maya Tran</p>
                <p className="mt-[0.2em] truncate text-[0.7em] leading-none text-[var(--yaa-off)]/60">
                  UID: 7f2a...9c1
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-[var(--yaa-lime)] px-[0.6em] py-[0.25em] text-[0.7em] font-bold text-[var(--yaa-black)]">
                Lv 12
              </span>
            </div>

            <div className="space-y-[0.8em] px-[1em] py-[1em]">
              <div>
                <p className="text-[0.7em] font-bold uppercase tracking-[0.12em] text-[var(--yaa-ink-60)]">
                  Communities
                </p>
                <div className="mt-[0.45em] flex flex-wrap gap-[0.4em]">
                  {COMMUNITIES.map((c) => (
                    <span key={c} className="rounded-full bg-[var(--yaa-cream)] px-[0.6em] py-[0.25em] text-[0.75em] font-semibold text-[var(--yaa-black)]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[0.7em] font-bold uppercase tracking-[0.12em] text-[var(--yaa-ink-60)]">
                  Other Hobbies
                </p>
                <div className="mt-[0.45em] flex flex-wrap gap-[0.4em]">
                  {HOBBIES.map((h) => (
                    <span key={h} className="rounded-full bg-[var(--yaa-off)] px-[0.6em] py-[0.25em] text-[0.75em] font-medium text-[var(--yaa-ink-60)]">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[0.8em] font-bold text-[var(--yaa-black)]">See more ▸</p>
            </div>
          </div>

          {/* Swipe actions */}
          <div className="mt-[1em] flex items-center justify-center gap-[1.2em]">
            <span className="flex h-[2.8em] w-[2.8em] items-center justify-center rounded-full bg-[var(--yaa-purple)] text-[var(--yaa-off)]">
              <RotateCcw size="1.2em" aria-hidden="true" />
            </span>
            <span className="flex h-[3.2em] w-[3.2em] items-center justify-center rounded-full bg-[var(--yaa-black)] text-[var(--yaa-off)]">
              <X size="1.4em" aria-hidden="true" />
            </span>
            <span className="flex h-[3.2em] w-[3.2em] items-center justify-center rounded-full bg-[var(--yaa-red)] text-[var(--yaa-off)]">
              <Heart size="1.4em" fill="currentColor" aria-hidden="true" />
            </span>
            <span className="flex h-[2.8em] w-[2.8em] items-center justify-center rounded-full bg-[var(--yaa-lime)] text-[var(--yaa-black)]">
              <Zap size="1.2em" fill="currentColor" aria-hidden="true" />
            </span>
          </div>

          {/* Bottom nav */}
          <div className="relative mt-auto flex items-end justify-between bg-[var(--yaa-black)] px-[1.2em] pb-[1.2em] pt-[0.8em]">
            {NAV.slice(0, 2).map(({ Icon, label, badge, active }) => (
              <span
                key={label}
                className={`flex flex-col items-center gap-[0.25em] text-[0.7em] ${
                  active ? "text-[var(--yaa-lime)]" : "text-[var(--yaa-off)]/70"
                }`}
              >
                <span className="relative">
                  <Icon size="1.4em" aria-hidden="true" />
                  {badge && (
                    <span className="absolute -right-[0.6em] -top-[0.4em] flex h-[1.1em] w-[1.1em] items-center justify-center rounded-full bg-[var(--yaa-red)] text-[0.5em] font-bold text-[var(--yaa-off)]">
                      {badge}
                    </span>
                  )}
                </span>
                {label}
              </span>
            ))}

            {/* Center Discovery FAB */}
            <span className="flex flex-col items-center gap-[0.25em]">
              <span className="-mt-[2.4em] flex h-[4em] w-[4em] items-center justify-center rounded-full border-[0.4em] border-[var(--yaa-off)] bg-[var(--yaa-lime)] text-[var(--yaa-black)]">
                <Search size="1.6em" aria-hidden="true" />
              </span>
              <span className="text-[0.7em] text-[var(--yaa-off)]/70">Discovery</span>
            </span>

            {NAV.slice(2).map(({ Icon, label }) => (
              <span key={label} className="flex flex-col items-center gap-[0.25em] text-[0.7em] text-[var(--yaa-off)]/70">
                <Icon size="1.4em" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
