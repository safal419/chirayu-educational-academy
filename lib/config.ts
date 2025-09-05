export const siteConfig = {
  name: "Chirayu Educational Academy",
  description: "Excellence in Education - Nurturing Future Leaders",
  url: "https://chirayuacademy.edu.np",
  established: "2055 B.S.",
  grades: "Nursery to Grade 10",
  contact: {
    phone: "+977-9851060977",
    email: "info@chirayuacademy.edu.np",
    address: "Sankharapur Municipality, Indrayani-4",
  },
  social: {
    facebook: "https://facebook.com/chirayuacademy",
    instagram: "https://instagram.com/chirayuacademy",
    youtube: "https://youtube.com/@chirayuacademy",
  },
  theme: {
    primary: "#3B82F6",
    secondary: "#10B981",
    accent: "#F59E0B",
  },
}

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3030",
  endpoints: {
    events: process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/events` : "http://localhost:3030/events",
    gallery: process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery` : "http://localhost:3030/gallery",
    notices: process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/notices` : "http://localhost:3030/notices",
    results: process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/results` : "http://localhost:3030/results",
    upload: process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload` : "http://localhost:3030/upload",
    auth: {
      login: process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth` : "http://localhost:3030/auth",
      profile: process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile` : "http://localhost:3030/auth/profile",
      changePassword: process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password` : "http://localhost:3030/auth/change-password",
    },
    users: process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users` : "http://localhost:3030/users",
  },
}

export const navigationConfig = [
  {
    title: "About",
    items: [
      { title: "History", href: "/about/history" },
      { title: "Mission & Vision", href: "/about/mission" },
      { title: "Principal", href: "/about/principal" },
      { title: "Facilities", href: "/about/facilities" },
    ],
  },
  {
    title: "Academics",
    items: [
      { title: "Programs Overview", href: "/academics/programs" },
    ],
  },
  {
    title: "Student Life",
    items: [
      { title: "SEE Results", href: "/see-results" },
      { title: "Notices", href: "/notices" },
      { title: "Events", href: "/events" },
      { title: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Community",
    items: [
      { title: "Alumni", href: "/alumni" },
      { title: "Blog", href: "/blog" },
    ],
  },
]

export const adminNavigationConfig = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "LayoutDashboard",
  },
  {
    title: "Content Management",
    items: [
      { title: "Notices", href: "/admin/notices", icon: "Bell" },
      { title: "Events", href: "/admin/events", icon: "Calendar" },
      { title: "Gallery", href: "/admin/gallery", icon: "Image" },
    ],
  },
  {
    title: "Academic",
    items: [
      { title: "SEE Results", href: "/admin/see-results", icon: "Trophy" },
      { title: "Programs", href: "/admin/programs", icon: "BookOpen" },
      { title: "Facilities", href: "/admin/facilities", icon: "Building" },
    ],
  },
  {
    title: "User Management",
    items: [
      { title: "Create User", href: "/admin/create-user", icon: "UserPlus" },
      { title: "Change Password", href: "/admin/change-password", icon: "Key" },
    ],
  },
  {
    title: "People",
    items: [
      { title: "Team Members", href: "/admin/team", icon: "Users" },
      { title: "Testimonials", href: "/admin/testimonials", icon: "MessageSquare" },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "Settings",
  },
]
