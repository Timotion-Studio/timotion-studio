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
    client: "ZIYEL",
    year: "2023",
    vimeoId: "866267301",
    tagline: "Where two cultures collide through fabric, movement & identity",
    scope:
      "A fashion film commissioned by ZIYEL — a Dutch-Moroccan brand born from a family story that stretches from the north of Africa to the northwest of Europe. The founder wanted a film that carried that dual identity: not a lookbook, but a statement. This is the third episode in an ongoing series, with the final chapter planned for Morocco.",
    process:
      "We shot in a daylight studio on a semi-cloudy day, constantly adapting to shifting light and lower contrast than planned. The location had more to work with than expected — we made decisions on the spot, including placing the model half behind a curtain — the simplest image we made that day, and the most honest.",
    result:
      "The film landed exactly where it needed to — on ZIYEL's website as a hero banner, in their advertising, and shared across their channels. The founder loved what we built together.",
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
      "A wedding film for Gino and Cynthia — two people who've been travelling the world together for over 12 years, living life to the fullest. When he finally asked her to marry him, she always knew this day would come. They chose South Africa, the country they both wholeheartedly love, as the place to say it out loud. They trusted me completely — the vision was mine from the start.",
    process:
      "A day and a half on a stunning farm above Cape Town, deep in the winelands. Rolling hills, mountains, vineyards as far as the eye can see. I was running — fixing a sound setup issue on the spot, which reminded me once again: always double check, no matter who you're working with. But the day itself was gorgeous. Everyone looked beautiful, the band was incredible. Then his mother stood up to speak — emotional, beautiful, heart-breaking in the best of ways. Then came golden hour. The sun dropped slowly behind the mountains, turning everything soft and golden, the whole dinner table glowing like a painting. I had everything I needed.",
    result:
      "They cried. Cynthia said it was such a beautiful gift — those days, immortalised forever. They were so thankful to have it. Watching it back, it made me realise once again that I have a knack for making tear-jerker films.",
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
    client: "Personal Project",
    year: "2023",
    vimeoId: "826875302",
    tagline: "A quiet story about the things we give and the things we keep.",
    scope:
      "A personal short film, made entirely for the love of making. No brief, no client — just a storyboard, a camera, a drone, and a feeling. Shot on Clifton Beach in Cape Town at golden hour, The Gift is about life itself — everything it gives, everything it asks for in return. It features Aletta, a Dutch Bali-based model who visits Cape Town every year. I'd always wanted to make something with her. I waited until the moment felt right. It always does.",
    process:
      "I operated everything myself — camera and drone, solo. The plan was clear but the day breathed naturally. The sea was spraying up water that caught and diffused the golden light, wrapping everything in softness. The drone caught Aletta walking across the beach as a wave came rolling in, folding around a large rock in the middle — one of those frames you can't plan. At some point she started filming me on her phone for backstage content. I hadn't planned to include it, but it made the film more honest. Less posed, more real.",
    result:
      "A purely personal piece, shared to socials and living permanently on the portfolio. Aletta thought it was beautiful. Sometimes the work you make just for yourself is the work that says the most about who you are.",
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
