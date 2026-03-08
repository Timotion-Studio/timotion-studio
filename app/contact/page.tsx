import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Timotion Studio",
  description: "Get in touch with Timotion Studio for general enquiries about photography and film.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#000021] min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 pt-24">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
