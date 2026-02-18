import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/settings/[key] — public read
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const setting = await prisma.siteSetting.findUnique({ where: { key } });
    if (!setting) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(setting.value);
  } catch {
    return NextResponse.json({ error: "DB connection failed" }, { status: 503 });
  }
}

// PUT /api/settings/[key] — requires auth, upserts
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { key } = await params;
    const value = await req.json();
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    return NextResponse.json(setting.value);
  } catch {
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 });
  }
}
