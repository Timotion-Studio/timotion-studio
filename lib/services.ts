export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Service {
  slug: string;
  category: "Photography" | "Videography";
  name: string;
  tagline: string;
  description: string;
  deliverables: ServiceDeliverable[];
  process: ServiceProcessStep[];
  testimonials: ServiceTestimonial[];
}

export const services: Service[] = [
  {
    slug: "brand-photos",
    category: "Photography",
    name: "Brand Photos",
    tagline: "Visuals that define your identity — built around your story.",
    description:
      "Your brand is more than a logo. It's the people behind it, the environments it lives in, and the feeling it gives people. Brand photography captures all of that — creating a visual language that works across every platform, campaign, and touchpoint. Whether you're launching something new or refreshing an existing identity, we build imagery that makes your brand feel real, intentional, and worth remembering.",
    deliverables: [
      {
        title: "Fully edited image library",
        description:
          "High-resolution files covering all agreed shot categories, colour-graded and ready to use.",
      },
      {
        title: "Web-optimised exports",
        description:
          "Compressed variants for fast-loading digital use across websites and social platforms.",
      },
      {
        title: "Organised delivery folder",
        description:
          "All images categorised by usage type — portraits, environment, product, lifestyle — for easy asset management.",
      },
      {
        title: "Commercial usage licence",
        description:
          "Full rights to use the images across all owned channels and paid campaigns.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discovery & Brief",
        description:
          "We start with a conversation — understanding your brand, your audience, and what you need the imagery to do. This shapes everything that follows.",
      },
      {
        number: "02",
        title: "Mood Board & Planning",
        description:
          "We develop a visual direction together, referencing tone, colour, composition, and shot categories to align on the look before the shoot day.",
      },
      {
        number: "03",
        title: "Shoot Day",
        description:
          "Efficient, well-prepared, and relaxed. We move through the shot list with intention while staying open to the unexpected moments that make images feel alive.",
      },
      {
        number: "04",
        title: "Edit & Delivery",
        description:
          "Images are culled, graded, and delivered via an organised cloud gallery within an agreed timeframe — typically 5–10 working days.",
      },
    ],
    testimonials: [],
  },
  {
    slug: "event-photos",
    category: "Photography",
    name: "Event Photos",
    tagline: "The energy of the room — captured as it happened.",
    description:
      "Events move fast. The best moments don't wait. Event photography is about being in the right place at the right time — reading the room, anticipating what's coming, and capturing people and atmosphere in a way that feels honest rather than posed. Whether it's a corporate gathering, a festival, a product launch, or a private occasion, we deliver a library that documents the day with depth and editorial quality.",
    deliverables: [
      {
        title: "Full-day edited photo library",
        description:
          "Every key moment documented — arrival, key sessions, crowd energy, speaker highlights, and informal interactions.",
      },
      {
        title: "Fast-turnaround delivery",
        description:
          "Edited images delivered within 5 working days, suitable for immediate use across press, social, and internal communications.",
      },
      {
        title: "Organised by section",
        description:
          "Images grouped by activity, time of day, or category — making it easy to locate exactly what you need.",
      },
      {
        title: "Social-ready edits",
        description:
          "A curated selection pre-cropped and optimised for Instagram, LinkedIn, and press distribution.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Event Brief",
        description:
          "We review the run-of-show, key moments, VIPs, and any must-have shots to ensure nothing important is missed on the day.",
      },
      {
        number: "02",
        title: "Venue Walkthrough",
        description:
          "Where possible, we visit or review the venue ahead of time — understanding the light, layout, and logistics before we arrive with kit.",
      },
      {
        number: "03",
        title: "On-Day Coverage",
        description:
          "We embed with the event from start to finish, moving quietly and efficiently through the space — capturing what matters without disrupting it.",
      },
      {
        number: "04",
        title: "Edit & Delivery",
        description:
          "Footage is culled and graded promptly. You receive a full library and a curated social set within the agreed timeframe.",
      },
    ],
    testimonials: [
      {
        quote:
          "The combination of creativity, punctuality and communication is rare in our industry. We would definitely work with Timo again!",
        author: "Jerrald",
        role: "The Drag Agency",
      },
    ],
  },
  {
    slug: "commercial-photos",
    category: "Photography",
    name: "Commercial Photos",
    tagline: "Campaign-grade imagery built to sell the vision.",
    description:
      "Commercial photography is where creative direction meets commercial intent. Whether you're launching a product, rolling out a seasonal campaign, or building a full editorial lookbook, we produce imagery with the craft and intentionality of editorial work — and the strategic purpose of advertising. Every frame is built to do something: communicate quality, tell a story, and make people want what they're looking at.",
    deliverables: [
      {
        title: "Full edited campaign series",
        description:
          "A complete image set covering all agreed shot categories — product, lifestyle, environmental, and detail.",
      },
      {
        title: "Print-ready master files",
        description:
          "High-resolution TIFF or JPEG exports at full quality, suitable for print campaigns, OOH, and press.",
      },
      {
        title: "Platform-specific crops",
        description:
          "Social, web, and ad-formatted variants prepared for immediate deployment across all channels.",
      },
      {
        title: "Commercial usage licence",
        description:
          "Full rights for use across paid, earned, and owned media for an agreed licensing term.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Creative Brief",
        description:
          "We dig into the campaign objectives — the product, the audience, the channels, and the feeling you want to leave people with.",
      },
      {
        number: "02",
        title: "Pre-Production",
        description:
          "Location scouting, talent casting, styling coordination, and shot list development — everything locked before the shoot day begins.",
      },
      {
        number: "03",
        title: "Production",
        description:
          "The shoot runs with a focused crew and clear direction. We work efficiently through the brief while staying responsive to what's working on set.",
      },
      {
        number: "04",
        title: "Post-Production & Delivery",
        description:
          "Retouching, colour grading, and asset preparation. Final files delivered in all agreed formats within the project timeline.",
      },
    ],
    testimonials: [],
  },
  {
    slug: "brand-videos",
    category: "Videography",
    name: "Brand Videos",
    tagline: "A cinematic film that makes your audience feel something.",
    description:
      "A brand film is the most powerful piece of content a business can have. Done well, it doesn't just explain what you do — it makes people feel why it matters. We build brand films from the ground up: developing the concept, shaping the narrative, and crafting every visual element to reflect your identity with honesty and craft. The result is a film that works across platforms, opens conversations, and outlasts any single campaign.",
    deliverables: [
      {
        title: "Hero brand film",
        description:
          "Your primary film — fully graded and scored, typically 60 seconds to 3 minutes depending on scope and brief.",
      },
      {
        title: "Social cuts",
        description:
          "Shorter vertical and square edits adapted for Instagram, LinkedIn, and other platforms — each cut to land independently.",
      },
      {
        title: "Licensed soundtrack",
        description:
          "Music licensed for all agreed platforms and territories — no copyright complications down the line.",
      },
      {
        title: "Raw footage archive",
        description:
          "All original camera files delivered and archived — available for future edits or extended cuts.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        description:
          "We spend time understanding your brand — your values, your audience, and what you want people to feel after watching. This informs every creative decision that follows.",
      },
      {
        number: "02",
        title: "Concept & Script",
        description:
          "We develop a narrative concept and, where needed, a script or treatment. References, structure, and tone are agreed before pre-production begins.",
      },
      {
        number: "03",
        title: "Pre-Production",
        description:
          "Locations, talent, crew, and logistics are locked. We arrive on shoot day prepared — so the focus stays entirely on making something great.",
      },
      {
        number: "04",
        title: "Shoot",
        description:
          "A focused, well-run production day (or days). We capture everything needed to tell the story with visual depth and intention.",
      },
      {
        number: "05",
        title: "Post-Production & Delivery",
        description:
          "Edit, grade, sound mix, and music licensing — through to final export and delivery in all agreed formats.",
      },
    ],
    testimonials: [],
  },
  {
    slug: "commercials",
    category: "Videography",
    name: "Commercials",
    tagline: "Sharp, targeted video that turns attention into action.",
    description:
      "A commercial has one job: to make the right people do something. Whether that's buying, booking, clicking, or believing — every second of the film is in service of that goal. We combine precise creative direction with high production values to deliver commercials that perform across platforms and campaigns. Short-form doesn't mean low-craft. It means every frame has to work harder.",
    deliverables: [
      {
        title: "Master commercial",
        description:
          "The primary cut in full resolution — graded, mixed, and ready to run across all agreed platforms.",
      },
      {
        title: "Platform-specific edits",
        description:
          "Cuts adapted for each channel's specs and audience behaviour — 15s, 30s, 60s, vertical, square, and widescreen as needed.",
      },
      {
        title: "Licensed music",
        description:
          "Fully cleared tracks licensed for advertising use across all agreed territories and platforms.",
      },
      {
        title: "Closed captions & subtitles",
        description:
          "Accessible, platform-ready caption files for all cuts.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Brief & Strategy",
        description:
          "We dig into the campaign — the product, the objective, the audience, the platform, and what success looks like. Strategy shapes the creative before a single frame is shot.",
      },
      {
        number: "02",
        title: "Creative Development",
        description:
          "Concept, script, and storyboard developed and approved before pre-production begins. No ambiguity on shoot day.",
      },
      {
        number: "03",
        title: "Production",
        description:
          "A tight, well-prepared shoot. We move efficiently and adapt in real time — getting everything needed to cut a commercial that performs.",
      },
      {
        number: "04",
        title: "Post-Production & Delivery",
        description:
          "Edit, grade, sound design, music, captions, and platform exports — delivered to spec and ready to launch.",
      },
    ],
    testimonials: [],
  },
  {
    slug: "event-videography",
    category: "Videography",
    name: "Event Videography",
    tagline: "Cinematic coverage that captures how it actually felt to be there.",
    description:
      "The best event films don't just document what happened — they put you back in the room. We cover events with the discipline of documentary filmmakers: reading the energy, finding the moments before they peak, and building a film that carries the atmosphere of the day from start to finish. Whether it's a corporate event, a music night, a product launch, or an experiential activation, we deliver content that works immediately and continues to work as marketing for what comes next.",
    deliverables: [
      {
        title: "Feature event film",
        description:
          "A full-length cinematic film capturing the arc of the event — energy, highlights, atmosphere, and key moments.",
      },
      {
        title: "Highlight reel",
        description:
          "A punchy 60–90 second cut built for social, press, and promotional use.",
      },
      {
        title: "Social clips",
        description:
          "Individual vertical and square clips optimised for Instagram, TikTok, LinkedIn, and other platforms.",
      },
      {
        title: "Fast turnaround option",
        description:
          "For time-sensitive campaigns, we offer 24–72 hour delivery on key edits.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Pre-Event Brief",
        description:
          "We review the run-of-show, key moments, any must-have coverage, and the intended use of the final content — so we arrive ready.",
      },
      {
        number: "02",
        title: "On-Day Coverage",
        description:
          "Multi-camera where needed. We move through the event capturing crowd energy, performances, speakers, and the behind-the-scenes moments that give a film depth.",
      },
      {
        number: "03",
        title: "Edit & Post",
        description:
          "Footage is assembled, graded, and scored. We build the film to feel like the event — not just look like it.",
      },
      {
        number: "04",
        title: "Delivery",
        description:
          "Feature film, highlight reel, and social cuts delivered via a shared cloud folder, within agreed timelines.",
      },
    ],
    testimonials: [
      {
        quote:
          "His amazingly creative but also deadline-driven approach meant we achieved an incredibly unique video on time and to an unbelievable standard.",
        author: "Pink Panda",
        role: "DJ Collective",
      },
    ],
  },
];

export function getAllServices(): Service[] {
  return services;
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: "Photography" | "Videography"): Service[] {
  return services.filter((s) => s.category === category);
}
