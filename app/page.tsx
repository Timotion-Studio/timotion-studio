import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import QualificationForm from "@/components/QualificationForm";
import Footer from "@/components/Footer";
import VinylPlayer from "@/components/VinylPlayer";
import { sanityFetch } from "@/sanity/client";
import type { SanityProject, SanityTestimonial, SanityHeroReel } from "@/sanity/types";

export default async function Home() {
  const [heroReel, featuredProjects, testimonials] = await Promise.all([
    sanityFetch<SanityHeroReel | null>(
      '*[_type == "heroReel" && active == true][0]{ vimeoId, active, posterImage { asset->{ url } }, backgroundVideo { asset->{ url } } }'
    ),
    sanityFetch<SanityProject[]>(
      '*[_type == "project" && defined(featuredOrder)] | order(featuredOrder asc)'
    ),
    sanityFetch<SanityTestimonial[]>(
      '*[_type == "testimonial"] | order(order asc)'
    ),
  ]);

  return (
    <main className="bg-[#000021] min-h-screen">
      <Nav />
      <Hero
        posterUrl={
          heroReel?.posterImage && "url" in heroReel.posterImage.asset
            ? heroReel.posterImage.asset.url
            : undefined
        }
        videoUrl={heroReel?.backgroundVideo?.asset?.url}
      />
      <ProjectsGrid projects={featuredProjects} />
      <Services />
      <Testimonials testimonials={testimonials} />
      <About />
      <QualificationForm />
      <Footer />
      <VinylPlayer />
    </main>
  );
}
