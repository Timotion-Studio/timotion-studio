export interface Project {
  slug: string;
  index: string;
  category: string;
  title: string;
  client: string;
  year: string;
  vimeoId: string | null;
  tagline: string;
  scope: string;
  process: string;
  result: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  } | null;
  bg1: string;
  bg2: string;
  prev: string;
  next: string;
  serviceTypes: string[];
}

export const projects: Project[] = [
  {
    slug: "iberoafrican",
    index: "01",
    category: "Fashion Film",
    title: "Iberoafrican",
    client: "Iberoafrican Collective",
    year: "2023",
    vimeoId: "866267301",
    tagline: "Where two cultures collide through fabric, movement & light.",
    scope:
      "A cinematic fashion film celebrating the rich dialogue between Iberian and African cultures. The brief called for a piece that felt both editorial and alive — a visual essay told through movement, texture, and dramatic light. The collective wanted something that could anchor their brand identity and carry emotional weight beyond a standard lookbook.",
    process:
      "Two weeks of pre-production were spent developing the visual language alongside the creative director. Locations were scouted across the city to find spaces that bridged both worlds — sun-bleached courtyards, raw concrete interiors, and open rooftops with golden hour light. The two-day shoot ran with a lean crew, allowing us to move quickly and preserve the spontaneous energy between the orchestrated sequences.",
    result:
      "A 3-minute film that has since served as the brand's cornerstone content piece, screened at cultural events and shared widely across their digital channels. The work earned the collective significant recognition within the European independent fashion community and continues to drive new client and collaborator interest.",
    testimonial: null,
    bg1: "#2d1b4e",
    bg2: "#000021",
    prev: "concrete-desert",
    next: "sun-wine-laughter",
    serviceTypes: ["brand-videos"],
  },
  {
    slug: "sun-wine-laughter",
    index: "02",
    category: "Wedding Film",
    title: "Sun Wine Laughter",
    client: "Private Client",
    year: "2024",
    vimeoId: "997674576",
    tagline: "A day too full of love to ever truly fit in a single frame.",
    scope:
      "A full-day wedding film for a couple who wanted their story told with intimacy and soul — not just the ceremony, but the full feeling of the day. The brief was clear: documentary-first, cinematic second. No rigid shot lists, no posed performance — just the real thing, told beautifully.",
    process:
      "We embedded ourselves from morning preparations through to the last dance, shadowing the couple and their guests with two cameras running in parallel. The edit went through three passes — building from a raw timeline to a fully graded, scored film — with the couple involved in key decisions throughout.",
    result:
      "A 7-minute feature film and a 90-second highlight reel, both delivered within three weeks of the wedding. The couple described watching it back as reliving every emotion of the day all over again. The feature has since been shared privately with family and friends across three continents.",
    testimonial: {
      quote:
        "We were blown away. Timo has this incredible ability to be everywhere without ever feeling intrusive. The film he made is the most treasured thing we have from our wedding day.",
      author: "Sophie & James",
      role: "Wedding Clients",
    },
    bg1: "#3d1a08",
    bg2: "#000021",
    prev: "iberoafrican",
    next: "the-gift",
    serviceTypes: ["event-videography"],
  },
  {
    slug: "the-gift",
    index: "03",
    category: "Short Film",
    title: "The Gift",
    client: "Independent Production",
    year: "2023",
    vimeoId: "826875302",
    tagline: "A quiet story about the things we give and the things we keep.",
    scope:
      "An original short narrative film exploring the quiet power of giving — made in collaboration with an emerging filmmaker whose script had been sitting in a drawer for two years. The project was entirely self-initiated, with Timotion Studio handling cinematography, colour grade, and post-production end-to-end.",
    process:
      "The script went through four drafts before we locked picture. Principal photography ran over three days across two locations, with a tight but experienced crew. The grade was developed to feel intimate and slightly desaturated — warm in the memories, cooler in the present.",
    result:
      "A 12-minute film that has screened at two independent film festivals, earning a Best Cinematography nomination. It continues to circulate on the independent festival circuit and has opened conversations with several production companies interested in future collaboration.",
    testimonial: {
      quote:
        "The Gift is exactly what I imagined it to be — only better. Timo understood the material immediately and brought a visual intelligence to it that I couldn't have anticipated. It's a film I'm genuinely proud of.",
      author: "Daniel Ferreira",
      role: "Writer & Director",
    },
    bg1: "#0a2d1b",
    bg2: "#000021",
    prev: "sun-wine-laughter",
    next: "the-kraken",
    serviceTypes: [],
  },
  {
    slug: "the-kraken",
    index: "04",
    category: "Event Film",
    title: "The Kraken",
    client: "The Kraken Events",
    year: "2023",
    vimeoId: "856809196",
    tagline: "Capturing the scale, energy, and chaos of one of London's biggest nights.",
    scope:
      "A high-energy event film for The Kraken — a major one-night experience in London's nightlife calendar. The client needed content that captured the scale and atmosphere of the event for use in future marketing and ticket campaigns. Fast turnaround was essential.",
    process:
      "Two camera operators were deployed across the venue throughout the night, covering the crowd, headline performances, production design, and key moments across multiple stages. All footage was logged and assembled into a rough cut within 24 hours of the event. Final delivery followed 48 hours later.",
    result:
      "A 4-minute event film delivered within 72 hours. It was used as the primary marketing asset for the following edition — which sold out before tickets went to general release. The client has since commissioned Timotion Studio for two further events.",
    testimonial: {
      quote:
        "His amazingly creative but also deadline-driven approach meant we achieved an incredibly unique video on time and to an unbelievable standard.",
      author: "Pink Panda",
      role: "DJ Collective",
    },
    bg1: "#081a3d",
    bg2: "#000021",
    prev: "the-gift",
    next: "power-of-one-team",
    serviceTypes: ["event-videography"],
  },
  {
    slug: "power-of-one-team",
    index: "05",
    category: "Event Photography",
    title: "Power of One Team",
    client: "Corporate Client",
    year: "2024",
    vimeoId: null,
    tagline: "The energy of a team, captured in every frame.",
    scope:
      "A full editorial photo package for a major corporate team-building event, with the goal of capturing authentic energy, collective spirit, and individual personality across a full day of activities. The images needed to serve both internal communications and external brand storytelling.",
    process:
      "We embedded with the group from the morning brief through to the closing celebration, moving dynamically through each activity and environment. The approach balanced candid documentary moments with intentional group compositions — ensuring every person appeared in the final library.",
    result:
      "A library of 220 fully edited images delivered within five working days, organised by activity and usable across print, digital, and social. The client used the work across their annual report, LinkedIn presence, and internal culture documentation.",
    testimonial: {
      quote:
        "The combination of creativity, punctuality and communication is rare in our industry. We would definitely work with Timo again!",
      author: "Jerrald",
      role: "The Drag Agency",
    },
    bg1: "#3d0820",
    bg2: "#000021",
    prev: "the-kraken",
    next: "concrete-desert",
    serviceTypes: ["event-photos"],
  },
  {
    slug: "concrete-desert",
    index: "06",
    category: "Fashion Photography",
    title: "Concrete Desert",
    client: "Independent Label",
    year: "2024",
    vimeoId: null,
    tagline: "Hard surfaces. Soft textures. The tension between the two.",
    scope:
      "A fashion editorial shoot exploring the contrast between raw urban architecture and refined contemporary clothing. The brief came from an independent label launching their first standalone collection — they needed images with editorial weight that could anchor a full lookbook and campaign rollout.",
    process:
      "Three days of location scouting across industrial zones of the city preceded the shoot. The final day brought together a stylist, model, and MUA for a full-day production across four locations. We worked with available light throughout, supplemented with minimal portable fill.",
    result:
      "A 45-image series delivered across two weeks, forming the brand's full seasonal lookbook and social campaign. The work achieved the label's highest organic reach to date and drew interest from two larger retailers. Several images were picked up by independent fashion press.",
    testimonial: null,
    bg1: "#2a1a08",
    bg2: "#000021",
    prev: "power-of-one-team",
    next: "iberoafrican",
    serviceTypes: ["commercial-photos"],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByService(serviceSlug: string): Project[] {
  return projects.filter((p) => p.serviceTypes.includes(serviceSlug));
}

export function getAdjacentProjects(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const project = getProject(slug);
  if (!project) return { prev: undefined, next: undefined };
  return {
    prev: getProject(project.prev),
    next: getProject(project.next),
  };
}
