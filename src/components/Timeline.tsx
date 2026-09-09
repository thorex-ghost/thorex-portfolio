"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    range: "2024 — Present",
    title: "AI & Automation Tooling",
    tags: ["AI Agents", "Automation", "Dashboards"],
  },
  {
    range: "2022 — 2024",
    title: "E-commerce & Retail Brand Building",
    tags: ["E-commerce", "Branding", "Retail"],
  },
  {
    range: "2020 — 2022",
    title: "Full-Stack Web Development",
    tags: ["React", "Next.js", "Supabase"],
  },
  {
    range: "2018 — 2020",
    title: "Freelance Client Services",
    tags: ["Web Design", "Deployment", "Client Delivery"],
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground"
        >
          Timeline
        </motion.h2>

        <div className="mt-16 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />

          <div className="flex flex-col gap-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2 pl-12 md:pl-0">
                  <span className="text-gold font-mono text-sm">{item.range}</span>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1/2 mt-1 md:mt-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
