"use client";

import { motion } from "framer-motion";

const expertise = [
  {
    number: "01",
    title: "Web & E-commerce Development",
    description:
      "Production-grade online stores and business websites, engineered from architecture to launch.",
    tags: ["React", "Next.js", "Supabase", "E-commerce"],
  },
  {
    number: "02",
    title: "Brand Development & Retail Strategy",
    description:
      "Building and scaling consumer brands across fashion, luxury goods, and lifestyle retail.",
    tags: ["Branding", "Retail", "Sourcing", "Strategy"],
  },
  {
    number: "03",
    title: "AI & Automation Solutions",
    description:
      "AI-powered dashboards and content tools that streamline business operations.",
    tags: ["AI Agents", "Automation", "APIs", "Dashboards"],
  },
  {
    number: "04",
    title: "Freelance Web Design Services",
    description:
      "Custom website builds for clients across industries, from concept to deployment.",
    tags: ["Web Design", "Client Delivery", "Deployment"],
  },
];

export default function Expertise() {
  return (
    <section id="services" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground"
        >
          Expertise
        </motion.h2>
        <p className="mt-4 text-zinc-400 max-w-2xl">
          A focused set of capabilities delivered with precision and craft.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {expertise.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:border-gold/30"
            >
              <span className="text-gold font-mono text-sm">{item.number}</span>
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
