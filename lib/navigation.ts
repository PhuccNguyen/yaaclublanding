/**
 * Central link map. On-page sections use hash anchors; everything without a
 * built section routes to /coming-soon with its label, so no link dead-ends.
 */

export function soonHref(label: string) {
  return `/coming-soon?page=${encodeURIComponent(label)}`;
}

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Discover", href: "#discover" },
  { label: "Communities", href: soonHref("Communities") },
  { label: "Events", href: "#events" },
  { label: "Bookings", href: "#features" },
  { label: "For Organizers", href: "#roles" },
  { label: "Download App", href: "#download" },
];

export const FOOTER_COLUMNS: { title: string; links: NavItem[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Discover", href: "#discover" },
      { label: "Communities", href: soonHref("Communities") },
      { label: "Events", href: "#events" },
      { label: "Bookings", href: "#features" },
    ],
  },
  {
    title: "For Organizers",
    links: [
      { label: "List a Venue", href: soonHref("List a Venue") },
      { label: "Host an Event", href: soonHref("Host an Event") },
      { label: "Manage Events", href: soonHref("Manage Events") },
      { label: "Resources", href: soonHref("Resources") },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: soonHref("About Us") },
      { label: "Careers", href: soonHref("Careers") },
      { label: "Blog", href: soonHref("Blog") },
      { label: "Contact Us", href: soonHref("Contact Us") },
    ],
  },
];
