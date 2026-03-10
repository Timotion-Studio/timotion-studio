import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getService, getAllServices } from "@/lib/services";
import { getProjectsByService } from "@/lib/projects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} — Timotion Studio`,
    description: service.tagline,
  };
}

export default async function ServicePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = getProjectsByService(slug);

  return (
    <div className="bg-[#000021] min-h-screen">
      <Nav />

      {/* ── Hero ── */}
      <section className="pt-36 pb-24 px-6 border-b border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#ff7bac] mb-4">
                {service.category}
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-6xl md:text-8xl font-bold text-[#ff7bac] leading-[1.1] tracking-wide mb-6">
                {service.name}
              </h1>
              <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl italic text-white/60 leading-relaxed max-w-lg">
                {service.tagline}
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/#qualify"
                className="inline-block px-10 py-4 bg-[#ff7bac] text-[#000021] text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#ff60a0] transition-colors duration-300"
              >
                Start a Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[#ff7bac] text-[9px] tracking-[0.4em] uppercase">01</span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">About This Service</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
          <p className="text-[#c8c8d8] text-lg leading-[1.9] font-light">
            {service.description}
          </p>
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="py-24 px-6 bg-[#00002e]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <span className="text-[#ff7bac] text-[9px] tracking-[0.4em] uppercase">02</span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">What&apos;s Included</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05]">
            {service.deliverables.map((item, i) => (
              <div key={i} className="bg-[#00002e] p-10">
                <div className="flex items-start gap-4">
                  <span className="text-[#ff7bac] text-[9px] tracking-widest uppercase mt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[#c8c8d8]/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <span className="text-[#ff7bac] text-[9px] tracking-[0.4em] uppercase">03</span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">Our Process</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
          <div className="space-y-0">
            {service.process.map((step, i) => (
              <div
                key={i}
                className="flex gap-10 py-10 border-b border-white/[0.06] last:border-0"
              >
                <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#ff7bac]/10 shrink-0 leading-none w-14 text-right">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[#c8c8d8]/70 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {service.testimonials.length > 0 && (
        <section className="py-24 px-6 bg-[#00002e]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-14">
              <span className="text-[#ff7bac] text-[9px] tracking-[0.4em] uppercase">04</span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">What Clients Say</span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-[#000021] border border-white/[0.06] p-10"
                >
                  <svg
                    className="w-6 h-6 mb-6"
                    fill="#ff7bac"
                    opacity={0.35}
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="font-[family-name:var(--font-playfair)] text-xl italic text-white leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-white/[0.08] pt-6">
                    <p className="text-[#ff7bac] text-[10px] tracking-widest uppercase font-semibold">
                      {t.author}
                    </p>
                    <p className="text-white/60 text-[10px] tracking-widest uppercase mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Projects ── */}
      {relatedProjects.length > 0 && (
        <section className={`py-24 px-6 ${service.testimonials.length > 0 ? "bg-[#000021]" : "bg-[#00002e]"}`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-14">
              <span className="text-[#ff7bac] text-[9px] tracking-[0.4em] uppercase">
                {service.testimonials.length > 0 ? "05" : "04"}
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">Related Work</span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group block relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.bg1}, ${project.bg2})`,
                    aspectRatio: "4/3",
                  }}
                >
                  {/* Texture overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)",
                    }}
                  />

                  {/* Vimeo thumbnail hint */}
                  {project.vimeoId && (
                    <div className="absolute top-4 right-4">
                      <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Info overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-[#ff7bac] text-[9px] tracking-widest uppercase mb-1">
                      {project.category}
                    </p>
                    <p className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white capitalize">
                      {project.title}
                    </p>
                    <p className="text-white/60 text-xs mt-1">{project.client} · {project.year}</p>
                  </div>

                  {/* Default label */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 group-hover:opacity-0 transition-opacity duration-300">
                    <p className="text-[#ff7bac] text-[9px] tracking-widest uppercase mb-1">
                      {project.category}
                    </p>
                    <p className="font-[family-name:var(--font-playfair)] text-lg font-bold text-white/80 capitalize">
                      {project.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/#projects"
                className="text-[9px] tracking-widest uppercase text-white/40 hover:text-[#ff7bac] transition-colors duration-300"
              >
                View all projects →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-[#000021] border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4">
            Ready to begin?
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#ff7bac] mb-6 leading-[1.2] tracking-wide">
            Let&apos;s Make Something Worth Watching
          </h2>
          <p className="text-[#c8c8d8]/70 text-base mb-10 leading-relaxed">
            Tell us about your project and we&apos;ll come back to you within 48 hours.
          </p>
          <Link
            href="/#qualify"
            className="inline-block px-12 py-4 bg-[#ff7bac] text-[#000021] text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#ff60a0] transition-colors duration-300"
          >
            Start Your Project →
          </Link>
        </div>
      </section>

      {/* Back nav */}
      <div className="bg-[#000021] py-8 px-6 text-center border-t border-white/[0.04]">
        <Link
          href="/#services"
          className="text-[9px] tracking-widest uppercase text-white/40 hover:text-[#ff7bac] transition-colors duration-300"
        >
          ← All Services
        </Link>
      </div>

      <Footer />
    </div>
  );
}
