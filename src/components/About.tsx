"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { label: "Brands Built", value: "X+" },
  { label: "Projects Shipped", value: "X+" },
  { label: "Years Building", value: "X+" },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-2 md:gap-16"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
              About
            </h2>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              I&apos;m a founder and operator who has built multiple e-commerce
              brands from the ground up — handling everything from product sourcing
              and brand identity to full-stack development and growth strategy.
              Alongside my own ventures, I offer freelance web development and
              design services for clients who need precise, high-quality digital
              delivery.
            </p>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              My approach is hands-on and outcome-driven. I don&apos;t just ship
              code — I build systems that support real businesses, from storefronts
              to automation workflows.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block text-3xl font-semibold text-gold">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-sm text-zinc-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="relative w-full aspect-square rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
              <Image
                src="/workspace.jpg"
                alt="Workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
