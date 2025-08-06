export const siteConfig = {
  name: "Chirayu Educational Academy",
  description: "Excellence in Education - Nurturing Future Leaders",
  url: "https://chirayuacademy.edu.np",
  established: "2055 B.S.",
  grades: "Nursery to Grade 10",
  contact: {
    phone: "+977-9851060977",
    email: "info@chirayuacademy.edu.np",
    address: "Kathmandu, Nepal",
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

export const navigationConfig = [
  {
    title: "About",
    items: [
      { title: "History", href: "/about/history" },
      { title: "Mission & Vision", href: "/about/mission" },
      { title: "Principal", href: "/about/principal" },
      { title: "Leadership Team", href: "/about/leadership" },
      { title: "Facilities", href: "/about/facilities" },
    ],
  },
  {
    title: "Academics",
    items: [
      { title: "Programs Overview", href: "/academics/programs" },
      { title: "Academic Facilities", href: "/academics/facilities" },
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
      { title: "Blog Posts", href: "/admin/blog", icon: "FileText" },
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
    title: "People",
    items: [
      { title: "Team Members", href: "/admin/team", icon: "Users" },
      { title: "Testimonials", href: "/admin/testimonials", icon: "MessageSquare" },
    ],
  },
  {
    title: "Communication",
    items: [
      { title: "Messages", href: "/admin/messages", icon: "Mail" },
      { title: "Resources", href: "/admin/resources", icon: "FolderOpen" },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "Settings",
  },
]
