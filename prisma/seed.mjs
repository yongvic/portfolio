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

  // ── 1. Garden — B2B SaaS Marketplace ──
  await prisma.project.upsert({
    where: { slug: "garden" },
    update: {},
    create: {
      title: "Garden",
      slug: "garden",
      excerpt: "Marketplace B2B SaaS de location d'espaces professionnels.",
      description:
        "Plateforme B2B Premium de mise en relation au Togo (Coworking, réunions). Gestion complète de la location, système d'approbation Landlord, uploader média interactif et paiements transparents.",
      coverImage: "/IMAGE_GARDEN_A_AJOUTER.png",
      projectUrl: "https://garden-one-silk.vercel.app",
      repository: "https://github.com/yongvic/Garden",
      technologies: ["Next.js 16", "TypeScript", "Tailwind 4", "Prisma", "PostgreSQL", "Auth.js v5", "Stripe", "Vercel Blob"],
      categoryId: webCategory?.id,
      sortOrder: 1,
      isFeatured: true,
    },
  });

  // ── 2. Résidence Moeris — SaaS Hôtelier ──
  await prisma.project.upsert({
    where: { slug: "moeris-facture" },
    update: {},
    create: {
      title: "Résidence Moeris",
      slug: "moeris-facture",
      excerpt: "SaaS de gestion hôtelière et CRM multiservice.",
      description:
        "SaaS de gestion hôtelière complet (CRM, consommations, restaurant POS, activités). Système RBAC poussé (Admin/Manager/Staff) et édition de factures dynamiques PDF.",
      coverImage: "/IMAGE_MOERIS_A_AJOUTER.png",
      projectUrl: "https://moeris.vercel.app",
      repository: "https://github.com/yongvic/moeris-facture",
      technologies: ["Next.js", "TypeScript", "Prisma v7", "PostgreSQL", "React-pdf", "Auth.js"],
      categoryId: webCategory?.id,
      sortOrder: 2,
      isFeatured: true,
    },
  });

  // ── 3. KYA Energy Group ──
  await prisma.project.upsert({
    where: { slug: "kya-marketplace" },
    update: {},
    create: {
      title: "KYA Energy Group",
      slug: "kya-marketplace",
      excerpt: "Site vitrine & marketplace solaire pour le marché togolais.",
      description:
        "Conception et développement du site corporate et de la marketplace e-commerce de KYA Energy Group. Design orienté confiance et conversion, catalogue produits solaires, parcours d'achat progressif et formulaire de contact.",
      coverImage: "/kya_marketplace.jpg",
      projectUrl: "https://kya-energy-website.vercel.app",
      repository: "https://github.com/yongvic/kya-marketplace",
      technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
      categoryId: webCategory?.id,
      sortOrder: 3,
      isFeatured: true,
    },
  });

  // ── 4. Chatbot Moeris ──
  await prisma.project.upsert({
    where: { slug: "chatbot-moeris" },
    update: {},
    create: {
      title: "Chatbot Moeris",
      slug: "chatbot-moeris",
      excerpt: "Assistant conversationnel web avec interface instantanée.",
      description:
        "Application de chatbot avec interface moderne, gestion des états de conversation et parcours utilisateur fluide. Intégration avec n8n pour l'automatisation des réponses.",
      coverImage: "/chatbot.png",
      projectUrl: "https://yongvic.github.io/ChatbotMoeris/",
      repository: "https://github.com/yongvic/ChatbotMoeris",
      technologies: ["JavaScript", "CSS3", "n8n"],
      categoryId: autoCategory?.id,
      sortOrder: 4,
      isFeatured: true,
    },
  });

  // ── 5. Affiche WFA ──
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
      sortOrder: 5,
    },
  });

  // ── 6. API Java Spring Boot ──
  await prisma.project.upsert({
    where: { slug: "api-java" },
    update: {},
    create: {
      title: "API Sécurisée Spring Boot",
      slug: "api-java",
      excerpt: "Backend REST sécurisé avec JWT et architecture professionnelle.",
      description:
        "API Spring Boot 3 complète avec authentification JWT, inscription, login, hashage BCrypt, routes protégées et filtre de sécurité. Architecture backend prête pour intégration React ou mobile.",
      coverImage: "/IMAGE_API_JAVA_A_AJOUTER.png",
      repository: "https://github.com/yongvic/api-java",
      technologies: ["Java", "Spring Boot", "JWT", "MySQL"],
      categoryId: webCategory?.id,
      sortOrder: 6,
    },
  });

  // ── 7. Never Bored Lovers ──
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
      repository: "https://github.com/yongvic/For-Our",
      technologies: ["Next.js", "React", "TypeScript"],
      categoryId: webCategory?.id,
      sortOrder: 7,
    },
  });

  // ── 8. Ravi's — Portfolio Client ──
  await prisma.project.upsert({
    where: { slug: "ravi-s" },
    update: {},
    create: {
      title: "Ravi's — Portfolio Client",
      slug: "ravi-s",
      excerpt: "Portfolio web premium conçu pour un client.",
      description:
        "Portfolio professionnel développé pour un client avec design sur-mesure, animations GSAP, navigation fluide et mise en valeur des réalisations. Déployé sur Vercel.",
      coverImage: "/IMAGE_RAVIS_A_AJOUTER.png",
      projectUrl: "https://ravi-s.vercel.app",
      repository: "https://github.com/yongvic/Ravi-s",
      technologies: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
      categoryId: webCategory?.id,
      sortOrder: 8,
    },
  });

  // ── 9. Zyra ──
  await prisma.project.upsert({
    where: { slug: "zyra" },
    update: {},
    create: {
      title: "Zyra",
      slug: "zyra",
      excerpt: "Application web fullstack avec architecture modulaire.",
      description:
        "Projet web fullstack TypeScript avec architecture modulaire propre, gestion d'état avancée et interface utilisateur soignée.",
      coverImage: "/IMAGE_ZYRA_A_AJOUTER.png",
      repository: "https://github.com/yongvic/Zyra",
      technologies: ["Next.js", "TypeScript"],
      categoryId: webCategory?.id,
      sortOrder: 9,
    },
  });

  // ── Témoignages ──
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
