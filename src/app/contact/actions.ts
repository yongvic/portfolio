"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactMessageSchema = z.object({
  name: z.string().min(2, "Veuillez renseigner votre nom complet"),
  email: z.string().email("Adresse email non valide"),
  message: z.string().min(5, "Veuillez détailler votre message ou besoin"),
  services: z.string().optional(),
  timeline: z.string().optional(),
});

export type ContactActionState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
} | null;

export async function submitContactMessageAction(
  prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    services: formData.get("services"),
    timeline: formData.get("timeline"),
  };

  const parsed = contactMessageSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Veuillez corriger les informations saisies",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    let fullMessage = parsed.data.message;
    if (parsed.data.services || parsed.data.timeline) {
      fullMessage = `[Services: ${parsed.data.services || "Non spécifié"}] | [Délai: ${parsed.data.timeline || "Non spécifié"}]\n\n${parsed.data.message}`;
    }

    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: fullMessage,
      },
    });

    revalidatePath("/admin");
    return {
      success: true,
      message: "Message envoyé avec succès ! Je reviens vers vous sous 24h ouvrées.",
    };
  } catch (error) {
    console.error("Erreur enregistrement message:", error);
    return {
      success: false,
      message:
        "Impossible d'enregistrer le message. Utilisez le contact direct par WhatsApp ou email.",
    };
  }
}
