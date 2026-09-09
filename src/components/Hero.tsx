"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-6xl w-full">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold">
              Available for new opportunities
            </span>

            <h1 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight text-foreground">
              I AM <span className="text-gold">THOREX</span>
            </h1>

            <p className="mt-4 text-lg text-zinc-400">
              Founder &amp; CEO — Thorex stack
            </p>

            <p className="mt-6 text-base text-zinc-400 leading-relaxed max-w-lg">
              Specialized in E-commerce Systems, Brand Development, AI Automation,
              and Full-Stack Web Development.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10"
            >
              <a
                href="#works"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
              >
                View Work
                <ArrowDown size={16} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md aspect-[3/4] rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
          >
            <Image
              src="/portrait.jpg"
              alt="Thorex portrait"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
