"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground"
        >
          Contact
        </motion.h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-8"
          >
            <h3 className="text-xl font-semibold text-foreground">
              Send a message
            </h3>
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground placeholder:text-zinc-500 focus:border-gold focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground placeholder:text-zinc-500 focus:border-gold focus:outline-none"
              />
              <textarea
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground placeholder:text-zinc-500 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <h4 className="font-semibold text-foreground">Direct</h4>
              <div className="mt-4 flex flex-col gap-4">
                <a
                  href="mailto:hello@thorex.com"
                  className="inline-flex items-center gap-3 text-zinc-400 transition-colors hover:text-gold"
                >
                  <Mail size={18} />
                  hello@thorex.com
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-zinc-400 transition-colors hover:text-gold"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <h4 className="font-semibold text-foreground">Socials</h4>
              <div className="mt-4 flex flex-col gap-4">
                <a
                  href="https://instagram.com/thorex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 transition-colors hover:text-gold"
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com/@thorex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 transition-colors hover:text-gold"
                >
                  TikTok
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
