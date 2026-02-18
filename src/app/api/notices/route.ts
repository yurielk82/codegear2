import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/notices
// Public: isPublished=true, ordered by date desc
// Admin (?all=true): all notices
export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get("all") === "true";
    const take = parseInt(req.nextUrl.searchParams.get("take") ?? "5", 10);

    const session = all ? await auth() : null;
    if (all && !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notices = await prisma.notice.findMany({
      where: all ? {} : { isPublished: true },
      orderBy: { date: "desc" },
      take: all ? undefined : take,
      select: {
        id: true,
        category: true,
        title: true,
        date: true,
        views: true,
        isPublished: true,
      },
    });

    const formatted = notices.map((n) => ({
      ...n,
      date: n.date.toISOString().split("T")[0],
    }));

    return NextResponse.json(formatted);
  } catch {
    return NextResponse.json({ error: "DB connection failed" }, { status: 503 });
  }
}

// POST /api/notices — requires auth
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const notice = await prisma.notice.create({
      data: {
        category: body.category,
        title: body.title,
        content: body.content ?? "",
        date: body.date ? new Date(body.date) : new Date(),
        isPublished: body.isPublished ?? true,
      },
    });
    return NextResponse.json({ ...notice, date: notice.date.toISOString().split("T")[0] }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}
