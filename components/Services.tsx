"use client";

import { useState } from "react";
import Link from "next/link";
import { getServicesByCategory } from "@/lib/services";

type Tab = "Photography" | "Videography";

export default function Services() {
  const [active, setActive] = useState<Tab>("Photography");

  const currentServices = getServicesByCategory(active);

  return (
    <section id="services" className="py-24 bg-[#00002e] scroll-mt-20">
      <div className="content-container">
        <p className="text-sm tracking-[0.3em] uppercase text-white/60 text-center mb-3">
          Our Services
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#ff7bac] text-center mb-14 font-bold leading-[1.2] tracking-wide">
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
                  ? "bg-[#ff7bac] text-[#000021] border-[#ff7bac] font-semibold"
                  : "bg-transparent text-white/60 border-white/20 hover:text-white hover:border-white/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#f0f0f0]/5">
          {currentServices.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-[#00002e] p-10 relative hover:bg-[#000035] transition-colors duration-300 block"
            >
              <span className="absolute top-10 right-10 text-[#00ffff]/15 font-[family-name:var(--font-playfair)] text-5xl font-bold select-none">
                0{i + 1}
              </span>
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-4 leading-[1.2] tracking-wide group-hover:text-[#ff7bac] transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-[#c8c8d8]/80 text-sm leading-relaxed mb-6">
                {service.tagline}
              </p>
              <span className="service-learn-more text-[10px] tracking-widest uppercase">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
