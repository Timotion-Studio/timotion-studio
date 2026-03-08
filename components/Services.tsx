"use client";

import { useState } from "react";

type Tab = "Photography" | "Videography";

const services: Record<Tab, { name: string; description: string }[]> = {
  Photography: [
    {
      name: "Event",
      description:
        "We capture the greatest moments of your next festival & exclusive club night.",
    },
    {
      name: "Fashion",
      description:
        "Shooting your new brand or established collection drop. We've got you.",
    },
    {
      name: "Model Portfolio",
      description:
        "Keep your book up to date to look your best self and get booked.",
    },
    {
      name: "Wedding",
      description:
        "One of the best days of your life deserves the best pictures.",
    },
  ],
  Videography: [
    {
      name: "Brand Video",
      description:
        "A video tailored to your brand is paramount for your image.",
    },
    {
      name: "Commercial",
      description:
        "Creative approach that speaks to your audience and grows your sales.",
    },
    {
      name: "Music Video",
      description: "Create that next level clip for your new single.",
    },
    {
      name: "Wedding Film",
      description:
        "Capture and relive those beautiful moments again and again.",
    },
  ],
};

export default function Services() {
  const [active, setActive] = useState<Tab>("Photography");

  return (
    <section id="services" className="py-24 px-6 bg-[#00002e]">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] tracking-widest uppercase text-white/50 text-center mb-3">
          Our Services
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#ff7bac] text-center mb-14 font-bold">
          What We Offer
        </h2>

        {/* Tab toggle */}
        <div className="flex justify-center mb-16">
          {(["Photography", "Videography"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-10 py-3 text-[10px] tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                active === tab
                  ? "bg-[#d4a853] text-[#000021] border-[#d4a853] font-semibold"
                  : "bg-transparent text-white/60 border-white/20 hover:text-white hover:border-white/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#f0f0f0]/5">
          {services[active].map((service, i) => (
            <div key={service.name} className="bg-[#00002e] p-10 relative">
              <span className="absolute top-10 right-10 text-[#ff7bac]/15 font-[family-name:var(--font-playfair)] text-5xl font-bold select-none">
                0{i + 1}
              </span>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white mb-4">
                {service.name}
              </h3>
              <p className="text-[#c8c8d8]/80 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
