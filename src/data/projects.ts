export type Project = {
  id: string
  title: string
  category: string
  coverImage: string
  metric: string
  description: string
  techStack: string[]
  liveUrl: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "THOREX WATCHES",
    category: "E-commerce",
    coverImage: "/projects/project-1.jpg",
    metric: "Live storefront, real transactions",
    description:
      "Luxury watch retail brand and e-commerce platform for Nigerian men 18–35, built with a full Supabase-backed catalog and checkout.",
    techStack: ["React", "Supabase", "HTML/CSS"],
    liveUrl: "https://thorexwatches.netlify.app",
  },
  {
    id: "2",
    title: "CASHLUXE",
    category: "E-commerce / Fashion",
    coverImage: "/projects/project-2.jpg",
    metric: "",
    description:
      "Luxury streetwear e-commerce platform with a multi-page Supabase-connected frontend.",
    techStack: ["React", "Supabase"],
    liveUrl: "",
  },
  {
    id: "3",
    title: "ZATYFITS WOMAN",
    category: "E-commerce / Fashion",
    coverImage: "/projects/project-3.jpg",
    metric: "",
    description:
      "Luxury African women's couture and ready-to-wear fashion brand.",
    techStack: ["E-commerce", "Branding"],
    liveUrl: "",
  },
  {
    id: "4",
    title: "LUXE GALORE",
    category: "E-commerce / Lifestyle",
    coverImage: "/projects/project-4.jpg",
    metric: "",
    description:
      "Affordable luxury lifestyle brand covering jewelry, perfumes, beauty, and gifting.",
    techStack: ["E-commerce", "Retail"],
    liveUrl: "",
  },
  {
    id: "5",
    title: "WEALTH EVENT & DECOR",
    category: "Booking Platform",
    coverImage: "/projects/project-5.jpg",
    metric: "",
    description:
      "Black-and-gold themed event and decor booking site with a fixed-price, booking-only flow.",
    techStack: ["Booking System", "Events"],
    liveUrl: "",
  },
  {
    id: "6",
    title: "NEXUS AI DASHBOARD",
    category: "AI / Automation",
    coverImage: "/projects/project-6.jpg",
    metric: "",
    description:
      "AI agent dashboard with live Claude API integration for managing automated workflows.",
    techStack: ["React", "Claude API"],
    liveUrl: "",
  },
  {
    id: "7",
    title: "JADMAFSON",
    category: "Lead Generation / B2B",
    coverImage: "/projects/project-7.jpg",
    metric: "",
    description:
      "Converted a civil/heavy-industrial engineering company's site into a high-conversion lead-capture funnel.",
    techStack: ["Lead Gen", "Web Design"],
    liveUrl: "",
  },
  {
    id: "8",
    title: "SOCIAL CONTENT TOOL",
    category: "PWA / Automation",
    coverImage: "/projects/project-8.jpg",
    metric: "",
    description:
      "Installable progressive web app that generates social media content for retail brands.",
    techStack: ["PWA", "Automation"],
    liveUrl: "",
  },
]
