import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// PATCH /api/notices/[id] — partial update (e.g. toggle isPublished)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const notice = await prisma.notice.update({
      where: { id },
      data: body,
    });
    return NextResponse.json({ ...notice, date: notice.date.toISOString().split("T")[0] });
  } catch {
    return NextResponse.json({ error: "Failed to update notice" }, { status: 500 });
  }
}

// PUT /api/notices/[id] — full update
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const notice = await prisma.notice.update({
      where: { id },
      data: {
        category: body.category,
        title: body.title,
        content: body.content,
        date: body.date ? new Date(body.date) : undefined,
        isPublished: body.isPublished,
      },
    });
    return NextResponse.json({ ...notice, date: notice.date.toISOString().split("T")[0] });
  } catch {
    return NextResponse.json({ error: "Failed to update notice" }, { status: 500 });
  }
}

// DELETE /api/notices/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
  }
}
