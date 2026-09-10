import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { projects as seedProjects } from "@/data/projects";

export const dynamic = "force-dynamic";

const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json(seedProjects);
  }

  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json(seedProjects);
  }

  const formatted = data.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    coverImage: p.cover_image,
    metric: p.metric,
    description: p.description,
    techStack: p.tech_stack,
    liveUrl: p.live_url,
  }));

  return NextResponse.json(formatted);
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_SECRET;

  if (!secret || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const body = await request.json();

  const { error: deleteError } = await supabase.from("portfolio_projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    console.error("Supabase delete error:", deleteError);
    return NextResponse.json({ error: "Failed to clear projects" }, { status: 500 });
  }

  if (body.length > 0) {
    const toInsert = body.map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      cover_image: p.coverImage,
      metric: p.metric,
      description: p.description,
      tech_stack: p.techStack,
      live_url: p.liveUrl,
    }));

    const { error: insertError } = await supabase.from("portfolio_projects").insert(toInsert);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ error: "Failed to insert projects" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}