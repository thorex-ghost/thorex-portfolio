import { NextResponse } from "next/server";
import { get, put } from "@vercel/blob";
import { projects as seedProjects } from "@/data/projects";

export const dynamic = "force-dynamic";

async function streamToText(stream: ReadableStream<Uint8Array>) {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

export async function GET() {
  const result = await get("projects.json", {
    access: "public",
  });

  if (result && result.stream) {
    const text = await streamToText(result.stream);
    return NextResponse.json(JSON.parse(text));
  }

  await put("projects.json", JSON.stringify(seedProjects, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });

  return NextResponse.json(seedProjects);
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_SECRET;

  if (!secret || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  await put("projects.json", JSON.stringify(body, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });

  return NextResponse.json({ ok: true });
}
