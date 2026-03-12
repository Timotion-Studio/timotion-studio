import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import QualificationForm from "@/components/QualificationForm";
import Footer from "@/components/Footer";
import VinylPlayer from "@/components/VinylPlayer";

export default function Home() {
  return (
    <main className="bg-[#000021] min-h-screen">
      <Nav />
      <Hero />
      <ProjectsGrid />
      <Services />
      <Testimonials />
      <About />
      <QualificationForm />
      <Footer />
      <VinylPlayer />
    </main>
  );
}
