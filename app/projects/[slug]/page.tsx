import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject, getAllProjects, getAdjacentProjects } from "@/lib/projects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Timotion Studio`,
    description: project.tagline,
  };
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <div className="bg-[#000021] min-h-screen">
      <Nav />

      {/* ── Hero: Video or Photo placeholder ── */}
      <section className="pt-20 bg-[#000021]">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-0">
          {project.vimeoId ? (
            /* Vimeo embed */
            <div
              className="w-full relative"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src={`https://player.vimeo.com/video/${project.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&color=ff7bac&title=0&byline=0&portrait=0`}
                title={project.title}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          ) : (
            /* Photo placeholder grid */
            <div className="w-full">
              <div className="grid grid-cols-3 gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`${i === 0 ? "col-span-2 row-span-2" : ""}`}
                    style={{
                      aspectRatio: i === 0 ? "16/9" : "4/3",
                      background: `linear-gradient(${135 + i * 20}deg, ${project.bg1}, ${project.bg2})`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)",
                      }}
                    />
                    {i === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/20 text-[10px] tracking-widest uppercase">
                          Photo Gallery
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project title bar */}
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-12 border-b border-white/[0.07]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[#ff7bac] text-sm tracking-[0.3em] uppercase mb-3">
                {project.category}
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-[#ff7bac] leading-[1.15] tracking-wide capitalize">
                {project.title}
              </h1>
              <p className="text-white/50 text-lg mt-3 font-[family-name:var(--font-playfair)] italic">
                {project.tagline}
              </p>
            </div>
            <div className="flex gap-8 md:text-right shrink-0">
              <div>
                <p className="text-[9px] tracking-widest uppercase text-white/60 mb-1">Client</p>
                <p className="text-white text-sm">{project.client}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-widest uppercase text-white/60 mb-1">Year</p>
                <p className="text-white text-sm">{project.year}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case study body ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-20">

          {/* Scope */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#ff7bac] text-[9px] tracking-[0.4em] uppercase">
                01
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">
                Project Scope
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>
            <p className="text-[#c8c8d8] text-lg leading-[1.9] font-light">
              {project.scope}
            </p>
          </div>

          {/* Process */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#ff7bac] text-[9px] tracking-[0.4em] uppercase">
                02
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">
                The Process
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>
            <p className="text-[#c8c8d8] text-lg leading-[1.9] font-light">
              {project.process}
            </p>
          </div>

          {/* Result */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#ff7bac] text-[9px] tracking-[0.4em] uppercase">
                03
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">
                The Result
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>
            <p className="text-[#c8c8d8] text-lg leading-[1.9] font-light">
              {project.result}
            </p>
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <div className="bg-[#00002e] border border-white/[0.06] p-10 md:p-14">
              <svg
                className="w-8 h-8 mb-6"
                fill="#ff7bac"
                opacity={0.35}
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl italic text-white leading-relaxed mb-8">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div className="border-t border-white/[0.08] pt-6">
                <p className="text-[#ff7bac] text-[10px] tracking-widest uppercase font-semibold">
                  {project.testimonial.author}
                </p>
                <p className="text-white/60 text-[10px] tracking-widest uppercase mt-1">
                  {project.testimonial.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Prev / Next navigation ── */}
      <nav className="border-t border-white/[0.07] bg-[#000021]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group py-10 pr-8 border-r border-white/[0.07] flex flex-col gap-2 hover:bg-white/[0.02] transition-colors duration-300"
              >
                <span className="text-[9px] tracking-widest uppercase text-white/60 group-hover:text-[#ff7bac] transition-colors duration-300">
                  ← Previous
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#ff7bac]">
                  {prev.category}
                </span>
                <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white/70 group-hover:text-white capitalize transition-colors duration-300">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group py-10 pl-8 flex flex-col gap-2 items-end text-right hover:bg-white/[0.02] transition-colors duration-300"
              >
                <span className="text-[9px] tracking-widest uppercase text-white/60 group-hover:text-[#ff7bac] transition-colors duration-300">
                  Next →
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#ff7bac]">
                  {next.category}
                </span>
                <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white/70 group-hover:text-white capitalize transition-colors duration-300">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </nav>

      {/* Back to all work */}
      <div className="bg-[#000021] py-8 px-6 text-center border-t border-white/[0.04]">
        <Link
          href="/#projects"
          className="text-[9px] tracking-widest uppercase text-white/60 hover:text-[#ff7bac] transition-colors duration-300"
        >
          ← All Projects
        </Link>
      </div>

      <Footer />
    </div>
  );
}
