export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  icon: string; // Now expects an image path (e.g., "/move-icon.png") instead of an emoji
  isPublic?: boolean;
  techStack: string[];
  role: string;
  teamSize: string;
  timeline: string;
  appStoreUrl?: string;
  screenshots: string[];
  technicalHighlights?: {
    title: string;
    description: string;
  }[];
  challenges?: {
    title: string;
    description: string;
    solution: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: "move-vehicle-app",
    name: "MOVE: Vehicle Management",
    tagline: "A 3-platform (Web, iOS, Android) vehicle management system built for showrooms.",
    description: [
      "MOVE is created to help a showroom manage their inventory and sales of vehicles conveniently. It features a web version for desk work, and mobile version for on-the-field work. All features are built according to the needs of the client.",
      "The system features everything ranging from vehicle inventory, repairs, expense, sales, customer, employee, and tax management to PDF and Excel exports and push notification reminders, all integrated in one business ecosystem.",
      "MOVE is currently on use by the showroom, is actively maintained, and is under phase 2 development for more features.",
    ],
    icon: "/move/move-logo.svg",
    isPublic: false,
    techStack: ["React.js", "TypeScript", "Vite", "Go Fiber", "Capacitor", "PostgreSQL", "Firebase FCM", "RESTful API", "Push Notifications"],
    role: "Full-Stack Developer",
    teamSize: "2 Engineers",
    timeline: "Feb 2026 - March 2026 (Phase 1)",
    appStoreUrl: "https://apps.apple.com",
    screenshots: ["/move/move-1.png", "/move/move-2.png", "/move/move-3.png", "/move/move-4.png", "/move/move-5.png", "/move/move-6.png"],
    technicalHighlights: [
      {
        title: "RESTful API",
        description: "Go Fiber and PostgreSQL backend with role-based access control. We went above with the RBAC by making each entries by a user to the system only editable by users of a higher role. This prevents unauthorized editing of entries."
      },
      {
        title: "Capacitor Cross-Platform Integration",
        description: "Engineered a single modular React codebase that compiles seamlessly into native iOS, Android, and Web applications, significantly reducing development overhead while maintaining native-feeling animations and transitions. Business logic is mostly shared across 3 platforms, save for some platform specific tweaks like push notifications."
      },
      {
        title: "Push Notification & Cron Jobs",
        description: "Real time push notification using Firebase FCM that informs users of any updates to the system, and tweaked based on the showrooms preference. This is also personalizable via Settings so the user can omit unwanted notifications. Cron jobs fires every 8 AM to send push notifications to remind users of upcoming deadlines (repairs, tax, etc.)."
      }
    ],
    challenges: [
      {
        title: "Frequent Architecture Revisions",
        description: "During collaborating with the client on development, frequent revisions that require modifications to the existing architecture are made to accomodate the client's preference.",
        solution: "We elected for future changes are made with flexibility and concern-separation as top priority. We took measures such as separated database and backend structure, and use of toggles in codebase for easy functionality switches. This also allows for customization on the user's end."
      }
    ]
  },
  {
    slug: "egg-analytics",
    name: "Egg: Unified Content Analytics",
    tagline: "Social media content analytics for mostly independent content creators.",
    description: [
      "Egg is a social media analytics app built for micro content creators that helps users improve their content performance by aggregating data form TikTok, Instagram, and YouTube and turning them into actionable insights.",
      "This app is built for iOS, and uses data from real official APIs from the social media platforms. Actionable insights are written by hand with feedback from real content creators. This app handles complex calculations and data processing, while keeping the operational cost to 0.",
      "However, due to constrictions and dead-ends in API access, this app is no longer being maintained. It is still available on the App Store.",
    ],
    icon: "/egg/egg-icon.png",
    isPublic: true,
    techStack: ["Swift", "Swift Charts", "Swift Data", "Combine", "Foundation", "Authentication Services", "Keychains", "Python", "NoSQL (Firebase)"],
    role: "iOS Developer (Tech)",
    teamSize: "1 Project Manager, 2 Tech, 2 Design",
    timeline: "Aug 2025 — Dec 2025",
    appStoreUrl: "https://apps.apple.com/us/app/egg-unified-content-analytics/id6755621260",
    screenshots: ["/egg/egg-1.png", "/egg/egg-2.png", "/egg/egg-3.png", "/egg/egg-4.png", "/egg/egg-5.png", "/egg/egg-6.png", "/egg/egg-7.png", "/egg/egg-8.png"],
    technicalHighlights: [
      {
        title: "MVVM-style Architecture",
        description: "We use MVVM-style concern separation architecture to keep the codebase as readable and organized as possible. This is due to us aggregating 3 social media platforms' API into our app, excluding backends, making readability all the more important."
      },
      {
        title: "Services & Swift Concurrency",
        description: "We use separated Services structure for handling authentication, social media account linking, data fetching and processing with explicit error types and robust catch-all error handling. Since we rely heavily on APIs for authentication and data fetching, concurrency is also an important factor to preserve smooth user experience without too much loading."
      },
      {
        title: "Keychain Storage",
        description: "We use Keychain Storage as a secure method to store user credentials and access tokens for social media accounts. This is of utmost importance since the app will be used by content creators, whose main assets and career is their account that is linked to our app."
      }
    ],
    challenges: [
      {
        title: "API Limitations",
        description: "API access are constricted and offer only surface-level data since we are unable to apply for business or research grade API access.",
        solution: "We made the most of the existing data, without using unethical sources. Using research papers as basis, we drew connections between metrics and explain what that means for the user based on their analytics."
      },
      {
        title: "Complicated Aggregation Requirements",
        description: "Since we are relying on APIs from 3 different social media platforms, the regulations are strict and differs. Thus we need to create 3 separate systems for authentication and data fetching into our app. This gets complicated and cause a lot of unavoidable 'bloatware'.",
        solution: "Architecture and concern-separation is the primary concern during development. Services are divided further to different concerns (authentication, token verification and refresh, data fetching, etc.) and each function is given clear and bulletproof error type and handling. This makes collaborating easier and bugs can be solved by anyone that caught it."
      }
    ]
  },
  {
    slug: "jiaoshenme",
    name: "jiaoshenme",
    tagline: "Simple education app to help children learn Chinese family member titles.",
    description: [
      "jiaoshenme is a simple educational app built for iOS mainly aimed at children to learn what to call their family members in Chinese.",
      "The app is built using fun and exciting themes and animations for children, and is designed to help children learn Mandarin characters and family titles. It is designed to be as easy to use as possible, suitable for all ages and tech-savviness levels. It includes text-to-speech features to help children with pronunciation.",
      "This app was built for entry of Swift Student Challenge 2026. I intended to build an app that is as simple as possible yet tackles a very valid problem based on personal experiences.",
    ],
    icon: "/jiaoshenme/AppIcon.png",
    isPublic: true,
    techStack: ["SwiftUI", "Foundation", "AVFoundation"],
    role: "Developer",
    teamSize: "1 Engineer",
    timeline: "Feb 2026",
    appStoreUrl: "https://apps.apple.com/id/app/jiaoshenme/id6759852032",
    screenshots: ["/jiaoshenme/jiaoshenme-1.png", "/jiaoshenme/jiaoshenme-2.png", "/jiaoshenme/jiaoshenme-3.png", "/jiaoshenme/jiaoshenme-4.png", "/jiaoshenme/jiaoshenme-5.png", "/jiaoshenme/jiaoshenme-6.png", "/jiaoshenme/jiaoshenme-7.png", "/jiaoshenme/jiaoshenme-8.png"],
    technicalHighlights: [
      {
        title: "Interactable Canvas-style UI",
        description: "I used pannable and zoomable canvas-style UI to visualize the family tree to make it more attractive and easier to learn for any ages, and satisfying to use. The UI uses Mandarin characters as the main text to increase exposure of users to Mandarin characters, and text-to-speech feature (using AVFoundation) so its easy to learn the pronounciation of the characters."
      },
      {
        title: "Lightweight and Simple Development",
        description: "This app is targeted to be as simple as possible in its development, thus it doesn't need internet connection, downloads, or third-party-anything. All aspect of the app is native to iOS."
      }
    ],
    challenges: [
      {
        title: "Family Title Structure Mapping",
        description: "Chinese family title structure is complicated and uses linguistic system that often times don't translate well to algorithms. Some Chinese families are also very well-established and large, with many generations and branches. This makes it difficult to create a universal algorithm that can handle all cases.",
        solution: "I deemed there is no one-size-fits-all solution for this problem. Thus, I decided to create a system that allows users to create their own family tree, and I map out the names into a database. To reduce bloatedness, I defined integrated data types so every relationship works like a string that leads to the intended member. I defined a total of 6 generations (3 up and 3 down) to cover most use cases."
      }
    ]
  },
];

export const skills = [
  {
    category: "Languages & Frameworks",
    items: ["Swift (SwiftUI/UIKit)", "Kotlin", "Go", "Flutter"]
  },
  {
    category: "Backend & Databases",
    items: ["PostgreSQL", "NoSQL", "RESTful API", "Firebase", "Supabase"]
  },
  {
    category: "Tools & Practices",
    items: ["Git", "MVVM Architecture", "SOLID Principles", "Agile/Sprint", "UX Design"]
  }
];
