import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"]);

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const key = form?.get("key");
  if (!process.env.ADMIN_SECRET || key !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "L’envoi de photos n’est pas activé. Dans Vercel, ouvre Storage, crée un Blob store, puis ajoute BLOB_READ_WRITE_TOKEN aux variables du projet.",
      },
      { status: 503 }
    );
  }

  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choisis une photo à envoyer." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Format accepté : PNG, JPEG, WebP, GIF ou AVIF." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "La photo dépasse 4 Mo. Compresse-la, puis réessaie." }, { status: 400 });
  }

  const extension = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "bin";
  const safeName = file.name
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);

  try {
    const blob = await put(`covers/${safeName || "couverture"}.${extension}`, file, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "L’envoi a échoué. Réessaie dans un instant." },
      { status: 500 }
    );
  }
}
