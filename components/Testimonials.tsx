const testimonials = [
  {
    quote:
      "His amazingly creative but also deadline-driven approach meant we achieved an incredibly unique video on time and to an unbelievable standard.",
    client: "Pink Panda",
    role: "DJ Collective",
  },
  {
    quote:
      "The combination of creativity, punctuality and communication is rare in our industry. We would definitely work with Timo again!",
    client: "Jerrald",
    role: "The Drag Agency",
  },
];

function QuoteIcon() {
  return (
    <svg className="w-8 h-8 text-[#ff7bac]/40 mb-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-[#000021]">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm tracking-[0.3em] uppercase text-white/60 text-center mb-3">
          Testimonials
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-[#ff7bac] text-center mb-16 font-bold leading-[1.2] tracking-wide">
          Kind Words
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.client}
              className="bg-[#00002e] p-10 flex flex-col justify-between border border-white/5"
            >
              <div>
                <QuoteIcon />
                <blockquote className="font-[family-name:var(--font-playfair)] text-xl italic text-white leading-relaxed">
                  {t.quote}
                </blockquote>
              </div>
              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="text-[#ff7bac] text-[10px] tracking-widest uppercase font-semibold">
                  {t.client}
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
  );
}
