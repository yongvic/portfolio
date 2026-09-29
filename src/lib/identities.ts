import type { UiProject } from "@/lib/content";

export type BrandColor = {
  name: string;
  hex: string;
};

export type BrandVariant = {
  src: string;
  background: string;
  label: string;
  width: number;
  height: number;
};

export type BrandCharter = {
  /** Pages de la charte, pré-rendues en images depuis le PDF (le PDF n'est jamais publié). */
  pages: string[];
  width: number;
  height: number;
};

export type BrandIdentity = {
  slug: string;
  name: string;
  sector?: string;
  year?: string;
  excerpt: string;
  story: string[];
  palette: BrandColor[];
  typography?: string[];
  variants: BrandVariant[];
  /** Index de la déclinaison mise en avant dans les listes. */
  coverVariant: number;
  accent: string;
  charter?: BrandCharter;
};

const variant = (
  slug: string,
  index: number,
  background: string,
  label: string,
  width: number,
  height: number
): BrandVariant => ({
  src: `/identites/${slug}/variante-${index}.png`,
  background,
  label,
  width,
  height,
});

export const brandIdentities: BrandIdentity[] = [
  {
    slug: "hanvi-burger",
    name: "Hanvi Burger",
    sector: "Restauration rapide",
    excerpt: "Un burger en enseigne et un lettrage script : une adresse généreuse et conviviale.",
    story: [
      "Le burger coiffe le nom comme une enseigne lumineuse. Trois petits traits au-dessus de la brioche suggèrent la chaleur du produit qui sort du grill : on doit presque sentir l'odeur avant de lire le nom.",
      "Le lettrage « HANVI » est un script incliné et épais, posé sur des bandes horizontales qui lui donnent de l'élan. Une courbe le souligne et vient porter « Burger », comme une signature de maison.",
      "Le rouge et le jaune reprennent les codes de l'appétit propres à la restauration rapide. Le logo reste lisible en une seule couleur, en blanc sur rouge ou en noir sur blanc, pour le packaging, les sacs et la façade.",
    ],
    palette: [
      { name: "Rouge Hanvi", hex: "#E40001" },
      { name: "Jaune brioche", hex: "#FFAD00" },
      { name: "Noir", hex: "#000000" },
      { name: "Blanc", hex: "#FFFFFF" },
    ],
    variants: [
      variant("hanvi-burger", 1, "#FFFFFF", "Version principale", 500, 476),
      variant("hanvi-burger", 2, "#000000", "Négatif sur noir", 500, 476),
      variant("hanvi-burger", 3, "#E40001", "Monochrome sur rouge", 500, 500),
      variant("hanvi-burger", 4, "#FFFFFF", "Monochrome noir", 500, 500),
    ],
    coverVariant: 2,
    accent: "#E40001",  },
  {
    slug: "catis",
    name: "Catis",
    excerpt: "Un logotype italique taillé pour la vitesse, signé par un point bordeaux.",
    story: [
      "Catis est un logotype pur : pas de symbole, la force est dans les lettres. Les formes sont épaisses, inclinées et découpées en biseau, ce qui donne une impression de mouvement même à l'arrêt.",
      "Des traînées horizontales traversent le C et le S, comme des lignes de vitesse. Elles prolongent le mot au-delà de ses limites et renforcent l'idée d'élan et de réactivité.",
      "Le point du « i » est isolé en bordeaux. C'est le seul accent de couleur : il sert de signature et suffit à reconnaître la marque, même en version noir et blanc.",
    ],
    palette: [
      { name: "Bleu Catis", hex: "#2D66FE" },
      { name: "Bordeaux", hex: "#99031E" },
      { name: "Noir", hex: "#000000" },
      { name: "Blanc", hex: "#FFFFFF" },
    ],
    variants: [
      variant("catis", 1, "#2D66FE", "Blanc sur bleu", 500, 344),
      variant("catis", 2, "#000000", "Bleu sur noir", 500, 344),
      variant("catis", 3, "#FFFFFF", "Version principale", 500, 345),
      variant("catis", 4, "#FFFFFF", "Noir sur blanc", 500, 345),
    ],
    coverVariant: 0,
    accent: "#2D66FE",
  },
  {
    slug: "fun-day-lome",
    name: "Fun Day Lomé",
    sector: "Événementiel",
    year: "Édition 3",
    excerpt: "Un soleil de fête : lettrage bombé, confettis et couleurs qui claquent.",
    story: [
      "Le logo prend la forme d'un soleil festif. Des rayons triangulaires et des pétales en forme de cœur tournent autour du nom, comme une ronde ou un feu d'artifice.",
      "« FUN » et « DAY » sont dessinés en lettres bombées, presque gonflables, qui épousent le cercle. « LOMÉ » est placé au centre, à la place d'honneur, et « Édition 3 » s'y glisse sur un petit bandeau, ce qui permet de faire évoluer le logo d'une édition à l'autre.",
      "Le magenta, l'orange et une touche de turquoise donnent une énergie immédiate. La forme ronde et compacte fonctionne aussi bien sur un bracelet, un t-shirt ou une affiche, et tient en blanc sur magenta ou en noir.",
    ],
    palette: [
      { name: "Magenta", hex: "#D90267" },
      { name: "Orange", hex: "#FF8500" },
      { name: "Turquoise", hex: "#2DD9C9" },
      { name: "Noir", hex: "#000000" },
    ],
    variants: [
      variant("fun-day-lome", 1, "#FFFFFF", "Version principale", 500, 500),
      variant("fun-day-lome", 2, "#000000", "Négatif sur noir", 500, 500),
      variant("fun-day-lome", 3, "#D90267", "Blanc sur magenta", 500, 500),
      variant("fun-day-lome", 4, "#FFFFFF", "Monochrome noir", 500, 500),
    ],
    coverVariant: 2,
    accent: "#D90267",
  },
  {
    slug: "le-mag",
    name: "Le MAG",
    sector: "Média & édition",
    excerpt: "Un appareil photo qui se déroule en page : l'image et l'écrit réunis.",
    story: [
      "Le symbole mêle trois outils du journalisme. Le boîtier de l'appareil photo se déroule comme une page de magazine, une pile de feuilles apparaît à gauche et une plume à droite : photo, texte et édition dans un seul dessin.",
      "Le déclencheur et la plume sont en rouge, les deux gestes qui font le magazine : capturer et écrire. Un arc passe sous l'illustration, comme le dos d'une couverture ou une ligne d'horizon.",
      "Le nom « Le MAG » est composé en capitales massives, avec un « Le » plus petit qui s'efface devant le mot principal. Le bleu nuit apporte le sérieux de l'information, le rouge l'urgence de l'actualité.",
    ],
    palette: [
      { name: "Bleu nuit", hex: "#0E005F" },
      { name: "Rouge", hex: "#FD0100" },
      { name: "Noir", hex: "#000000" },
      { name: "Blanc", hex: "#FFFFFF" },
    ],
    variants: [
      variant("le-mag", 1, "#FFFFFF", "Version principale", 500, 482),
      variant("le-mag", 2, "#000000", "Négatif sur noir", 500, 482),
      variant("le-mag", 3, "#FE0000", "Noir sur rouge", 500, 482),
      variant("le-mag", 4, "#0E005F", "Blanc sur bleu nuit", 500, 482),
    ],
    coverVariant: 3,
    accent: "#0E005F",
  },
  {
    slug: "sandys-lands",
    name: "Sandy's Lands",
    excerpt: "Un monogramme S sous une arche : ouverture, horizon et élégance.",
    story: [
      "Le symbole est construit autour d'un monogramme « S » fait de deux formes arrondies imbriquées. Deux arcs concentriques l'entourent, comme une arche, une porte ouverte ou un horizon qui se lève.",
      "Sous le monogramme, un segment rouge ferme la composition et lui sert de socle : c'est la terre sur laquelle tout repose, en écho au mot « Lands ».",
      "« Sandy's » est composé dans un serif très contrasté, élégant et affirmé. La queue du « y » se prolonge en paraphe et vient souligner « Lands », écrit en rouge, ce qui lie les deux mots dans un même geste.",
    ],
    palette: [
      { name: "Bleu Sandy's", hex: "#2076FF" },
      { name: "Rouge", hex: "#FD0100" },
      { name: "Noir", hex: "#000000" },
      { name: "Blanc", hex: "#FFFFFF" },
    ],
    variants: [
      variant("sandys-lands", 1, "#FFFFFF", "Version principale", 500, 500),
      variant("sandys-lands", 2, "#2076FF", "Noir sur bleu", 500, 500),
      variant("sandys-lands", 3, "#000000", "Négatif sur noir", 500, 500),
      variant("sandys-lands", 4, "#FFFFFF", "Monochrome noir", 500, 500),
    ],
    coverVariant: 1,
    accent: "#2076FF",
  },
];

export const IDENTITY_CATEGORY = "Identité visuelle";

export type IdentityPlacement = {
  slug: string;
  isHidden: boolean;
  homeLane: "dev" | "design" | null;
};

export function getBrandIdentity(slug: string): BrandIdentity | undefined {
  return brandIdentities.find((identity) => identity.slug === slug);
}

export function placementOf(settings: IdentityPlacement[], slug: string): IdentityPlacement {
  return settings.find((item) => item.slug === slug) ?? { slug, isHidden: false, homeLane: null };
}

export function visibleIdentities(settings: IdentityPlacement[]) {
  const hidden = new Set(settings.filter((item) => item.isHidden).map((item) => item.slug));
  return brandIdentities.filter((identity) => !hidden.has(identity.slug));
}

export function identityToUiProject(identity: BrandIdentity): UiProject {
  const cover = identity.variants[identity.coverVariant] ?? identity.variants[0];
  return {
    id: `identite-${identity.slug}`,
    slug: identity.slug,
    title: identity.name,
    excerpt: identity.excerpt,
    description: identity.story[0],
    coverImage: cover.src,
    coverBackground: cover.background,
    category: IDENTITY_CATEGORY,
    technologies: [
      "Logo",
      "Déclinaisons",
      ...(identity.charter ? ["Charte graphique"] : []),
    ],
    href: `/identites/${identity.slug}`,
  };
}
