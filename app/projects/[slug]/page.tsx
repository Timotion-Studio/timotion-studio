import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import type { SanityProject } from "@/sanity/types";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type SanityProjectWithPhotos = Omit<SanityProject, 'photos'> & {
  photos?: Array<{ _key: string; asset: { url: string }; alt?: string }>;
};

function extractBlockText(block: { _type: string; children?: unknown[] }): string {
  if (block._type === "block" && Array.isArray(block.children)) {
    return block.children
      .map((c) => ("text" in (c as Record<string, unknown>) ? String((c as Record<string, unknown>).text) : ""))
      .join("");
  }
  return "";
}

function extractSections(
  blocks: SanityProject["longDescription"],
): [string, string, string] {
  if (!blocks?.length) return ["", "", ""];

  // Case 1: three separate blocks (one per section)
  if (blocks.length >= 3) {
    return [
      stripHeader(extractBlockText(blocks[0])),
      stripHeader(extractBlockText(blocks[1])),
      stripHeader(extractBlockText(blocks[2])),
    ];
  }

  // Case 2: all sections in a single block, separated by "0X" headers
  const fullText = blocks.map((b) => extractBlockText(b)).join("\n");
  const parts = fullText.split(/\n+(?=0[1-3]\s)/);
  return [
    stripHeader(parts[0] ?? ""),
    stripHeader(parts[1] ?? ""),
    stripHeader(parts[2] ?? ""),
  ];
}

function stripHeader(text: string): string {
  return text.replace(/^0[1-3]\s*[A-Za-z ]+\n\s*/, "").trim();
}

export async function generateStaticParams() {
  const projects = await sanityFetch<SanityProject[]>(
    '*[_type == "project"]{ slug }',
  );
  return projects.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await sanityFetch<SanityProjectWithPhotos | null>(
    '*[_type == "project" && slug.current == $slug][0]{ ..., photos[]{ _key, asset->{ url }, alt } }',
    { slug },
  );
  if (!project) return {};
  return {
    title: `${project.title} — Timotion Studio`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = await sanityFetch<SanityProjectWithPhotos | null>(
    '*[_type == "project" && slug.current == $slug][0]{ ..., photos[]{ _key, asset->{ url }, alt } }',
    { slug },
  );
  if (!project) notFound();

  const allProjects = await sanityFetch<SanityProject[]>(
    '*[_type == "project"] | order(featuredOrder asc)',
  );
  const idx = allProjects.findIndex((p) => p.slug.current === slug);
  const prev = idx > 0 ? allProjects[idx - 1] : null;
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

  const [scope, process, result] = extractSections(project.longDescription);
  const category = project.category
    ? project.category.charAt(0).toUpperCase() + project.category.slice(1)
    : "";

  return (
    <div className="bg-[#000021] min-h-screen">
      <Nav />

      {/* ── Hero: Video or Photo placeholder ── */}
      <section className="pt-20 bg-[#000021]">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-0">

          {/* ── Desktop: prev | video | next ── */}
          <div className="hidden md:flex items-center gap-6">

            {/* Prev */}
            <div className="shrink-0 w-52">
              {prev ? (
                <Link
                  href={`/projects/${prev.slug.current}`}
                  className="group flex flex-col gap-3 hover:bg-white/[0.02] transition-colors duration-300 p-4 -m-4"
                >
                  <span className="text-xs tracking-widest uppercase text-white/60 group-hover:text-[#ff7bac] transition-colors duration-300">
                    ← Previous
                  </span>
                  <span className="text-xs tracking-widest uppercase text-[#ff7bac]">
                    {prev.category}
                  </span>
                  <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white/70 group-hover:text-white capitalize transition-colors duration-300 leading-snug">
                    {prev.title}
                  </span>
                </Link>
              ) : <div />}
            </div>

            {/* Video or Photo Gallery */}
            <div className="flex-1 min-w-0">
              {project.vimeoId ? (
                <div className="w-full relative" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://player.vimeo.com/video/${project.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&color=ff7bac&title=0&byline=0&portrait=0`}
                    title={project.title}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              ) : project.photos?.length ? (
                <div className="space-y-6">
                  {project.photos.map((photo) => (
                    <Image
                      key={photo._key}
                      src={urlFor(photo).width(1600).quality(85).auto("format").url()}
                      alt={photo.alt ?? project.title}
                      width={1600}
                      height={1067}
                      sizes="(max-width: 768px) 100vw, 70vw"
                      className="w-full h-auto"
                    />
                  ))}
                </div>
              ) : null}
            </div>

            {/* Next */}
            <div className="shrink-0 w-52">
              {next ? (
                <Link
                  href={`/projects/${next.slug.current}`}
                  className="group flex flex-col gap-3 items-end text-right hover:bg-white/[0.02] transition-colors duration-300 p-4 -m-4"
                >
                  <span className="text-xs tracking-widest uppercase text-white/60 group-hover:text-[#ff7bac] transition-colors duration-300">
                    Next →
                  </span>
                  <span className="text-xs tracking-widest uppercase text-[#ff7bac]">
                    {next.category}
                  </span>
                  <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white/70 group-hover:text-white capitalize transition-colors duration-300 leading-snug">
                    {next.title}
                  </span>
                </Link>
              ) : <div />}
            </div>

          </div>

          {/* ── Mobile: video or photo gallery full-width ── */}
          <div className="md:hidden">
            {project.vimeoId ? (
              <div className="w-full relative" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={`https://player.vimeo.com/video/${project.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&color=ff7bac&title=0&byline=0&portrait=0`}
                  title={project.title}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
            ) : project.photos?.length ? (
              <div className="space-y-4">
                {project.photos.map((photo) => (
                  <Image
                    key={photo._key}
                    src={urlFor(photo).width(1200).quality(85).auto("format").url()}
                    alt={photo.alt ?? project.title}
                    width={1200}
                    height={800}
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                ))}
              </div>
            ) : null}
          </div>

        </div>

        {/* Project title bar */}
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-12 border-b border-white/[0.07]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[#ff7bac] text-sm tracking-[0.3em] uppercase mb-3">
                {category}
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-[#ff7bac] leading-[1.15] tracking-wide capitalize">
                {project.title}
              </h1>
              <p className="text-white/50 text-lg mt-3 font-[family-name:var(--font-playfair)] italic">
                {project.shortDescription}
              </p>
            </div>
            <div className="flex gap-8 md:text-right shrink-0">
              <div>
                <p className="text-[9px] tracking-widest uppercase text-white/60 mb-1">Client</p>
                <p className="text-white text-sm">{project.clientName}</p>
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
          {scope && (
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
                {scope}
              </p>
            </div>
          )}

          {/* Process */}
          {process && (
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
                {process}
              </p>
            </div>
          )}

          {/* Result */}
          {result && (
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
                {result}
              </p>
            </div>
          )}

        </div>
      </section>

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
