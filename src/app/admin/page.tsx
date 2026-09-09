"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import type { Project } from "@/components/Projects";

type Toast = {
  id: number
  message: string
  type: "success" | "error"
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [loading, setLoading] = useState(false)

  const addToast = (message: string, type: Toast["type"]) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  const verifyPasscode = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "x-admin-secret": passcode,
          "Content-Type": "application/json",
        },
      })

      if (res.ok) {
        setIsAuthenticated(true)
        await loadProjects(passcode)
      } else {
        addToast("Wrong passcode", "error")
      }
    } catch {
      addToast("Verification failed", "error")
    } finally {
      setLoading(false)
    }
  }

  const loadProjects = async (secret: string) => {
    try {
      const res = await fetch("/api/projects", {
        headers: {
          "x-admin-secret": secret,
        },
      })
      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
    } catch {
      // ignore
    }
  }

  const handleSave = async (project: Project) => {
    const secret = passcode
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "x-admin-secret": secret,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projects),
      })

      if (res.ok) {
        addToast("Saved successfully", "success")
        setShowForm(false)
        setEditingProject(null)
        await loadProjects(secret)
      } else if (res.status === 401) {
        addToast("Unauthorized — wrong passcode", "error")
      } else {
        addToast("Save failed", "error")
      }
    } catch {
      addToast("Network error", "error")
    }
  }

  const handleDelete = async (id: string) => {
    const secret = passcode
    const updated = projects.filter((p) => p.id !== id)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "x-admin-secret": secret,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      })

      if (res.ok) {
        addToast("Project deleted", "success")
        setProjects(updated)
      } else if (res.status === 401) {
        addToast("Unauthorized — wrong passcode", "error")
      } else {
        addToast("Delete failed", "error")
      }
    } catch {
      addToast("Network error", "error")
    }
  }

  const startEdit = (project: Project) => {
    setEditingProject({ ...project })
    setShowForm(true)
  }

  const startAdd = () => {
    setEditingProject({
      id: String(Date.now()),
      title: "",
      category: "",
      coverImage: "",
      metric: "",
      description: "",
      techStack: [],
      liveUrl: "",
    })
    setShowForm(true)
  }

  const submitForm = () => {
    if (!editingProject) return
    if (!editingProject.title.trim()) {
      addToast("Title is required", "error")
      return
    }
    const next = [...projects]
    const idx = next.findIndex((p) => p.id === editingProject.id)
    if (idx >= 0) {
      next[idx] = editingProject
    } else {
      next.push(editingProject)
    }
    setProjects(next)
    handleSave(editingProject)
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background px-6 py-24">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Admin
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Enter your passcode to manage projects.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              verifyPasscode()
            }}
            className="mt-6 flex flex-col gap-3"
          >
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Passcode"
              className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground placeholder:text-zinc-500 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Enter"}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {toasts.length > 0 && (
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
              {toasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`rounded-lg border px-4 py-3 text-sm shadow-lg ${
                    toast.type === "success"
                      ? "border-gold/30 bg-gold/10 text-gold"
                      : "border-white/10 bg-white/[0.02] text-zinc-200"
                  }`}
                >
                  {toast.message}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Projects
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Manage your portfolio entries.
            </p>
          </div>
          <button
            onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
          >
            <Plus size={16} />
            Add New Project
          </button>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-zinc-400">
                <th className="pb-3 font-medium">Thumbnail</th>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Live URL</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="text-foreground">
                  <td className="py-4 pr-4">
                    <div className="h-10 w-16 overflow-hidden rounded-md border border-white/5 bg-white/[0.02]">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-4 pr-4 font-medium">{project.title}</td>
                  <td className="py-4 pr-4 text-zinc-400">{project.category}</td>
                  <td className="py-4 pr-4">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gold"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs font-medium text-zinc-500">
                        Add live link →
                      </span>
                    )}
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(project)}
                        className="rounded-lg border border-white/10 p-2 text-zinc-400 transition-colors hover:text-gold"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="rounded-lg border border-white/10 p-2 text-zinc-400 transition-colors hover:text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showForm && editingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-2xl rounded-2xl border border-white/10 bg-background p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {projects.find((p) => p.id === editingProject.id)
                    ? "Edit Project"
                    : "New Project"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingProject(null)
                  }}
                  className="text-zinc-400 hover:text-foreground"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Title
                  </label>
                  <input
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Category
                  </label>
                  <input
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Cover Image URL
                  </label>
                  <input
                    value={editingProject.coverImage}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        coverImage: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Metric
                  </label>
                  <input
                    value={editingProject.metric}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        metric: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Description
                  </label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    value={editingProject.techStack.join(", ")}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        techStack: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Live URL
                  </label>
                  <input
                    value={editingProject.liveUrl}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        liveUrl: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingProject(null)
                  }}
                  className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={submitForm}
                  className="rounded-full bg-gold px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
                >
                  Save Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toasts.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`rounded-lg border px-4 py-3 text-sm shadow-lg ${
                  toast.type === "success"
                    ? "border-gold/30 bg-gold/10 text-gold"
                    : "border-white/10 bg-white/[0.02] text-zinc-200"
                }`}
              >
                {toast.message}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
