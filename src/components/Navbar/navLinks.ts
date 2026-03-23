export interface MenuLink {
  label: string;
  href?: string;
}

export const menuLinks: MenuLink[] = [
  { label: "Accueil", href: "/#accueil" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Projets", href: "/#projets" },
  { label: "Compétences", href: "/#competences" },
  { label: "Contact", href: "/#contact" },
];
