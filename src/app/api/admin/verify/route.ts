import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_SECRET;

  if (!secret || secret !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
