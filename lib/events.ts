import { IMAGES } from "./image-manifest";

export interface YaaEvent {
  id: string;
  title: string;
  category: string;
  categoryColor: "lime" | "red" | "purple" | "black";
  image: string;
  date: string;
  time: string;
  venue: string;
  members: string[];
  extraMembers: number;
}

/*
 * Featured events. Titles describe the photography currently in each slot;
 * if you regenerate slots with `npm run gen:images`, revisit the titles here.
 */
export const FEATURED_EVENTS: YaaEvent[] = [
  {
    id: "evt-01",
    title: "Weekend Pickleball Social",
    category: "Pickleball",
    categoryColor: "lime",
    image: IMAGES.evtPadel,
    date: "Sat, Jul 26",
    time: "4:00 PM",
    venue: "Thao Dien Courts, D2",
    members: ["An", "Minh", "Thu", "Long", "Vy"],
    extraMembers: 23,
  },
  {
    id: "evt-02",
    title: "City Long Run 12K",
    category: "Run Club",
    categoryColor: "red",
    image: IMAGES.evtRun,
    date: "Sun, Jul 27",
    time: "5:30 AM",
    venue: "Riverside Loop, D1",
    members: ["Khoa", "Lan", "Duc", "Mai", "Nam"],
    extraMembers: 41,
  },
  {
    id: "evt-03",
    title: "Slow Flow Yoga",
    category: "Yoga",
    categoryColor: "purple",
    image: IMAGES.evtYoga,
    date: "Tue, Jul 29",
    time: "6:30 PM",
    venue: "Garden Studio, D3",
    members: ["Chi", "Hoa", "Tam", "Linh", "Quyen"],
    extraMembers: 12,
  },
  {
    id: "evt-04",
    title: "Evening Strength Club",
    category: "Strength",
    categoryColor: "black",
    image: IMAGES.evtHoops,
    date: "Wed, Jul 30",
    time: "7:00 PM",
    venue: "Iron House Gym, D7",
    members: ["Phat", "Trang", "Huy", "Nga", "Son"],
    extraMembers: 8,
  },
  {
    id: "evt-05",
    title: "Friday Community Night",
    category: "Community",
    categoryColor: "red",
    image: IMAGES.evtFootball,
    date: "Fri, Aug 1",
    time: "8:00 PM",
    venue: "Rooftop 68, D1",
    members: ["Bao", "Nhi", "Tuan", "Ha", "Kiet"],
    extraMembers: 56,
  },
];

export const STATS = [
  { value: 2500, suffix: "+", label: "Active Clubs", icon: "users" },
  { value: 12000, suffix: "+", label: "Bookings / Month", icon: "calendar" },
  { value: 250, suffix: "K+", label: "Community Members", icon: "people" },
  { value: 1000, suffix: "+", label: "Events Hosted", icon: "star" },
  { value: 20, suffix: "+", label: "Cities", icon: "globe" },
] as const;
