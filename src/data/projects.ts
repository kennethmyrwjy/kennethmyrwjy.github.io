export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  icon: string;
  techStack: string[];
  role: string;
  teamSize: string;
  timeline: string;
  appStoreUrl?: string;
  screenshots: string[];
}

export const projects: Project[] = [
  {
    slug: "taskflow",
    name: "TaskFlow",
    tagline: "A beautiful task manager with smart reminders and natural language input.",
    description: [
      "TaskFlow reimagines personal productivity with an interface that feels native to iOS. Users can create tasks using natural language — just type 'Buy groceries tomorrow at 5pm' and the app intelligently parses the date, time, and task details.",
      "The app features a custom calendar view built entirely with SwiftUI, smooth drag-and-drop reordering, and iCloud sync across all devices. Push notifications are powered by a custom scheduling engine that accounts for user habits.",
      "TaskFlow was featured on the App Store's 'Apps We Love' section and reached #12 in the Productivity category within its first month of launch.",
    ],
    icon: "📋",
    techStack: ["Swift", "SwiftUI", "Core Data", "CloudKit", "WidgetKit", "Push Notifications"],
    role: "Lead iOS Developer",
    teamSize: "3 engineers, 1 designer",
    timeline: "Sep 2024 — Feb 2025",
    appStoreUrl: "https://apps.apple.com",
    screenshots: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    slug: "fitpulse",
    name: "FitPulse",
    tagline: "Health & fitness tracker with real-time workout analytics and Apple Watch companion.",
    description: [
      "FitPulse connects with Apple Health and Apple Watch to provide real-time insights during workouts. The app visualizes heart rate zones, calories burned, and exercise intensity using custom charts built with Swift Charts.",
      "The Apple Watch companion app runs independently, allowing users to track workouts without their iPhone. Data syncs seamlessly using Watch Connectivity framework.",
      "The app handles complex background tasks including location tracking for outdoor runs and live activity updates on the Dynamic Island and Lock Screen.",
    ],
    icon: "💪",
    techStack: ["Swift", "UIKit", "HealthKit", "WatchKit", "Swift Charts", "MapKit", "Live Activities"],
    role: "Solo iOS Developer",
    teamSize: "1 engineer, 1 designer (freelance)",
    timeline: "Mar 2024 — Aug 2024",
    appStoreUrl: "https://apps.apple.com",
    screenshots: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    slug: "chatterbox",
    name: "ChatterBox",
    tagline: "End-to-end encrypted messaging app with rich media support and group channels.",
    description: [
      "ChatterBox is a privacy-first messaging platform built with end-to-end encryption. Messages, photos, and voice notes are encrypted on-device before transmission, ensuring complete privacy.",
      "The app supports rich media sharing with inline previews, voice messages with waveform visualization, and group channels with admin controls. The custom message bubble layout engine handles mixed content types gracefully.",
      "Performance was a key focus — the chat list uses a custom diffable data source implementation that handles thousands of messages without frame drops, even on older devices.",
    ],
    icon: "💬",
    techStack: ["Swift", "UIKit", "WebSocket", "CryptoKit", "AVFoundation", "Core Animation"],
    role: "Senior iOS Developer",
    teamSize: "5 engineers, 2 designers, 1 PM",
    timeline: "Jan 2023 — Dec 2023",
    screenshots: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
];

export const skills = [
  { name: "Swift", category: "Language" },
  { name: "SwiftUI", category: "Framework" },
  { name: "UIKit", category: "Framework" },
  { name: "Core Data", category: "Persistence" },
  { name: "CloudKit", category: "Cloud" },
  { name: "Combine", category: "Reactive" },
  { name: "HealthKit", category: "Framework" },
  { name: "MapKit", category: "Framework" },
  { name: "AVFoundation", category: "Media" },
  { name: "Core Animation", category: "Animation" },
  { name: "WidgetKit", category: "Extension" },
  { name: "XCTest", category: "Testing" },
  { name: "Git", category: "Tool" },
  { name: "CI/CD", category: "Tool" },
  { name: "Figma", category: "Design" },
];
