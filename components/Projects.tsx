const projects = [
  {
    category: "FASHION | FILM",
    title: "iberoafrican",
    href: "https://vimeo.com/866267301",
  },
  {
    category: "WEDDING | FILM",
    title: "sun wine laughter",
    href: "https://vimeo.com/997674576",
  },
  {
    category: "SHORT | FILM",
    title: "the gift",
    href: "https://vimeo.com/826875302",
  },
  {
    category: "EVENT | FILM",
    title: "the kraken",
    href: "https://vimeo.com/856809196",
  },
  {
    category: "EVENT | PHOTO",
    title: "power of one team",
    href: null,
  },
  {
    category: "FASHION | PHOTO",
    title: "concrete desert",
    href: null,
  },
];

function PlayIcon() {
  return (
    <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

function ProjectCard({
  category,
  title,
  href,
}: {
  category: string;
  title: string;
  href: string | null;
}) {
  const inner = (
    <div className="bg-[#00002e] group overflow-hidden transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
      {/* Thumbnail placeholder */}
      <div className="aspect-video bg-gradient-to-br from-[#0a0a40] to-[#000021] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[120%] h-px bg-gradient-to-l from-[#ff7bac] to-transparent rotate-12 translate-y-20" />
        </div>
        {href && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PlayIcon />
          </div>
        )}
        {!href && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/10 text-[10px] tracking-widest uppercase">Coming Soon</span>
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="px-6 py-5 border-t border-white/5">
        <p className="text-[#ff7bac] text-[10px] tracking-widest uppercase mb-2">{category}</p>
        <h3 className="text-white font-[family-name:var(--font-playfair)] text-xl font-semibold capitalize">
          {title}
        </h3>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }

  return <div>{inner}</div>;
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#000021]">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] tracking-widest uppercase text-white/50 text-center mb-3">
          Our Work
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#ff7bac] text-center mb-16 font-bold">
          Selected Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
