import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectsHover from "@/components/ProjectsHover";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import QualificationForm from "@/components/QualificationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#000021] min-h-screen">
      <Nav />
      <Hero />
      <ProjectsHover />
      <Services />
      <Testimonials />
      <About />
      <Contact />
      <QualificationForm />
      <Footer />
    </main>
  );
}
