"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export type Project = {
  id: string
  title: string
  category: string
  coverImage: string
  metric: string
  description: string
  techStack: string[]
  liveUrl: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/projects")
        if (res.ok) {
          const data = await res.json()
          if (!cancelled) setProjects(data)
        }
      } catch {
        // keep empty state on network failure
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="works" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground"
        >
          Selected Works
        </motion.h2>

        {loading && (
          <p className="mt-8 text-sm text-zinc-400">Loading projects...</p>
        )}

        {!loading && projects.length === 0 && (
          <p className="mt-8 text-sm text-zinc-400">No projects yet.</p>
        )}

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => {
            const isLive = project.liveUrl.trim().length > 0

            const cardContent = (
              <>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                      {project.category}
                    </span>
                    {project.metric && (
                      <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-sm">
                        {project.metric}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  {isLive ? (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors">
                      View Live Project
                      <span aria-hidden="true">→</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs font-medium text-zinc-500">
                      Coming Soon
                    </span>
                  )}
                </div>
              </>
            )

            if (isLive) {
              return (
                <motion.a
                  key={project.id}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group block rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-gold/30"
                >
                  {cardContent}
                </motion.a>
              )
            }

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
              >
                {cardContent}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
