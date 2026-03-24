import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = ["Web", "Graphic", "Automatisation"];

  for (const name of categories) {
    const slug = name.toLowerCase();
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
  }

  const webCategory = await prisma.category.findUnique({ where: { slug: "web" } });
  const graphicCategory = await prisma.category.findUnique({ where: { slug: "graphic" } });
  const autoCategory = await prisma.category.findUnique({ where: { slug: "automatisation" } });

  await prisma.project.upsert({
    where: { slug: "chatbot-moeris" },
    update: {},
    create: {
      title: "Chatbot Moeris",
      slug: "chatbot-moeris",
      excerpt: "Assistant conversationnel web avec interface instantanée.",
      description:
        "Application de chatbot avec interface moderne, gestion des états de conversation et parcours utilisateur fluide.",
      coverImage: "/chatbot.png",
      projectUrl: "https://yongvic.github.io/ChatbotMoeris/",
      technologies: ["JavaScript", "CSS3", "n8n"],
      categoryId: autoCategory?.id,
      sortOrder: 1,
      isFeatured: true,
    },
  });

  await prisma.project.upsert({
    where: { slug: "kya-marketplace" },
    update: {},
    create: {
      title: "Marketplace KYA-Energy Group",
      slug: "kya-marketplace",
      excerpt: "Marketplace solaire orientée conversion et lisibilité.",
      description:
        "Conception et développement d'une plateforme e-commerce pour la vente de solutions solaires.",
      coverImage: "/kya_marketplace.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
      categoryId: webCategory?.id,
      sortOrder: 2,
      isFeatured: true,
    },
  });

  await prisma.project.upsert({
    where: { slug: "affiche-wfa" },
    update: {},
    create: {
      title: "Affiche Word Fashion Agency",
      slug: "affiche-wfa",
      excerpt: "Campagne visuelle mode à tonalité éditoriale.",
      description:
        "Création d'une affiche premium avec composition éditoriale, contraste fort et hiérarchie typographique.",
      coverImage: "/WFA.png",
      technologies: ["Figma", "Brand Design"],
      categoryId: graphicCategory?.id,
      sortOrder: 3,
    },
  });

  await prisma.project.upsert({
    where: { slug: "never-bored-lovers" },
    update: {},
    create: {
      title: "Never Bored Lovers",
      slug: "never-bored-lovers",
      excerpt: "Produit web ludique avec design émotionnel.",
      description:
        "Application web de mini-jeux pour couples avec UX mobile-first et parcours d'interaction rapide.",
      coverImage: "/for_our.jpg",
      projectUrl: "https://for-mira.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript"],
      categoryId: webCategory?.id,
      sortOrder: 4,
    },
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Responsable Projet",
        role: "KYA-Energy Group",
        quote:
          "Edo Yawo combine sens du détail graphique et exécution technique. Les livrables sont propres, rapides et cohérents.",
      },
      {
        name: "Lead Marketing",
        role: "Les Pros de la Tech",
        quote:
          "Sa capacité à traduire des besoins business en visuels percutants et en interfaces utiles est remarquable.",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
