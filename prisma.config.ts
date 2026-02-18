import { readFileSync } from "fs";
import { defineConfig } from "prisma/config";

// Prisma CLI doesn't auto-load .env.local (Next.js convention), so we load it manually
try {
  const lines = readFileSync(".env.local", "utf-8").split("\n");
  for (const line of lines) {
    const match = line.match(/^([^=#\s][^=]*)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  }
} catch {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? "",
  },
});
