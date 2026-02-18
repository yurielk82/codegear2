import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/technologies — public
export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(technologies);
  } catch {
    return NextResponse.json({ error: "DB connection failed" }, { status: 503 });
  }
}

// PUT /api/technologies — requires auth, replaces all
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      icon: string;
      gradient: string;
      sortOrder?: number;
    }> = await req.json();

    // Upsert each technology
    const results = await Promise.all(
      body.map((tech, index) =>
        prisma.technology.upsert({
          where: { id: tech.id },
          update: {
            title: tech.title,
            subtitle: tech.subtitle,
            description: tech.description,
            icon: tech.icon,
            gradient: tech.gradient,
            sortOrder: tech.sortOrder ?? index,
          },
          create: {
            id: tech.id,
            title: tech.title,
            subtitle: tech.subtitle,
            description: tech.description,
            icon: tech.icon,
            gradient: tech.gradient,
            sortOrder: tech.sortOrder ?? index,
          },
        })
      )
    );

    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ error: "Failed to update technologies" }, { status: 500 });
  }
}
