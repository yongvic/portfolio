import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const trackSchema = z.object({
  type: z.enum(["visit", "project_view"]),
  path: z.string().optional(),
  projectId: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = trackSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { type, path, projectId } = parsed.data;
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const referrer = request.headers.get("referer") ?? undefined;
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
  const ipHash = createHash("sha256").update(forwardedFor).digest("hex");

  try {
    if (type === "visit") {
      await prisma.siteVisit.create({
        data: {
          path: path ?? "/",
          userAgent,
          referrer,
          ipHash,
        },
      });
    }

    if (type === "project_view" && projectId) {
      await prisma.projectView.create({
        data: {
          projectId,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
