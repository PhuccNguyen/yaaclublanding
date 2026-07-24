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
 * flow. Built in code with compact app-scale type so every glyph stays crisp.
 * Wrap in .tilt-phone for the hero's 3D presentation.
 */
export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19] w-full overflow-hidden rounded-[40px] border-[9px] border-[var(--yaa-black)] bg-[var(--yaa-off)] ${className}`}
    >
      {/* Dynamic island */}
      <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-[var(--yaa-black)]" />

      <div className="flex h-full flex-col bg-[var(--yaa-off)] pt-8">
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-3">
          <SlidersHorizontal size={12} className="text-[var(--yaa-black)]" aria-hidden="true" />
          <div className="flex flex-1 items-center gap-1 rounded-full border border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] px-2 py-1 text-[8px] text-[var(--yaa-ink-60)]">
            <Search size={9} aria-hidden="true" />
            <span>Search people, clubs...</span>
          </div>
          <span className="relative">
            <Bell size={12} className="text-[var(--yaa-black)]" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[var(--yaa-red)] text-[5px] font-bold text-[var(--yaa-off)]">
              2
            </span>
          </span>
          <List size={12} className="text-[var(--yaa-black)]" aria-hidden="true" />
        </div>

        {/* Tabs */}
        <div className="mt-2.5 flex items-center justify-between px-3">
          {TABS.map((tab, i) => (
            <span key={tab} className="flex flex-col items-center gap-1">
              <span
                className={`text-[10px] font-bold ${
                  i === 0 ? "text-[var(--yaa-black)]" : "text-[var(--yaa-ink-60)]"
                }`}
              >
                {tab}
              </span>
              {i === 0 && <span className="h-0.5 w-5 rounded-full bg-[var(--yaa-lime)]" />}
            </span>
          ))}
        </div>

        {/* Filter pills */}
        <div className="mt-2 flex items-center gap-1.5 px-3">
          <span className="flex flex-1 items-center gap-1 rounded-lg border border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] px-2 py-1 text-[8px] font-semibold text-[var(--yaa-black)]">
            <MapPin size={8} aria-hidden="true" /> Los Angeles, USA
          </span>
          <span className="flex items-center gap-1 rounded-lg border border-[var(--yaa-ink-15)] bg-[var(--yaa-white)] px-2 py-1 text-[8px] font-medium text-[var(--yaa-ink-60)]">
            Select Sport <ChevronDown size={8} aria-hidden="true" />
          </span>
        </div>

        <p className="mt-2.5 text-center text-[10px] font-bold text-[var(--yaa-black)]">
          Swipe to connect
        </p>

        {/* Profile card */}
        <div className="mx-3 mt-2 overflow-hidden rounded-xl bg-[var(--yaa-white)] shadow-[0_6px_16px_var(--yaa-ink-08)]">
          <div className="flex items-center gap-2 bg-[var(--yaa-black)] px-2.5 py-2">
            <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-[var(--yaa-lime)]">
              <Image src={IMAGES.evtYoga} alt="" fill className="object-cover" sizes="36px" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold leading-tight text-[var(--yaa-off)]">Maya Tran</p>
              <p className="truncate text-[7px] text-[var(--yaa-off)]/60">UID: 7f2a...9c1</p>
            </div>
            <span className="rounded-full bg-[var(--yaa-lime)] px-1.5 py-0.5 text-[7px] font-bold text-[var(--yaa-black)]">
              Lv 12
            </span>
          </div>

          <div className="space-y-2 px-2.5 py-2.5">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--yaa-ink-60)]">
                Communities
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {COMMUNITIES.map((c) => (
                  <span key={c} className="rounded-full bg-[var(--yaa-cream)] px-1.5 py-0.5 text-[7.5px] font-semibold text-[var(--yaa-black)]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--yaa-ink-60)]">
                Other Hobbies
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {HOBBIES.map((h) => (
                  <span key={h} className="rounded-full bg-[var(--yaa-off)] px-1.5 py-0.5 text-[7.5px] font-medium text-[var(--yaa-ink-60)]">
                    {h}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[8px] font-bold text-[var(--yaa-black)]">See more ▸</p>
          </div>
        </div>

        {/* Swipe actions */}
        <div className="mt-2.5 flex items-center justify-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--yaa-purple)] text-[var(--yaa-off)]">
            <RotateCcw size={12} aria-hidden="true" />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--yaa-black)] text-[var(--yaa-off)]">
            <X size={14} aria-hidden="true" />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--yaa-red)] text-[var(--yaa-off)]">
            <Heart size={14} fill="currentColor" aria-hidden="true" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--yaa-lime)] text-[var(--yaa-black)]">
            <Zap size={12} fill="currentColor" aria-hidden="true" />
          </span>
        </div>

        {/* Bottom nav */}
        <div className="relative mt-auto flex items-end justify-between bg-[var(--yaa-black)] px-3 pb-3 pt-2">
          {NAV.slice(0, 2).map(({ Icon, label, badge, active }) => (
            <span
              key={label}
              className={`flex flex-col items-center gap-0.5 text-[7px] ${
                active ? "text-[var(--yaa-lime)]" : "text-[var(--yaa-off)]/70"
              }`}
            >
              <span className="relative">
                <Icon size={14} aria-hidden="true" />
                {badge && (
                  <span className="absolute -right-1.5 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[var(--yaa-red)] text-[5px] font-bold text-[var(--yaa-off)]">
                    {badge}
                  </span>
                )}
              </span>
              {label}
            </span>
          ))}

          {/* Center Discovery FAB */}
          <span className="flex flex-col items-center gap-0.5">
            <span className="-mt-6 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[var(--yaa-off)] bg-[var(--yaa-lime)] text-[var(--yaa-black)]">
              <Search size={16} aria-hidden="true" />
            </span>
            <span className="text-[7px] text-[var(--yaa-off)]/70">Discovery</span>
          </span>

          {NAV.slice(2).map(({ Icon, label }) => (
            <span key={label} className="flex flex-col items-center gap-0.5 text-[7px] text-[var(--yaa-off)]/70">
              <Icon size={14} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
