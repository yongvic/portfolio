import { profile } from "@/lib/content";

export interface MenuColumn {
  title?: string;
  items: string[];
}

const nameParts = profile.name.trim().split(" ");
const firstName = nameParts.shift() || profile.name;
const lastName = nameParts.join(" ");

export const menuColumns: MenuColumn[] = [
  {
    items: [
      firstName,
      lastName,
      "",
      "",
      "",
      "",
      "Contact",
      profile.email,
      "",
      "",
      "",
      "",
      "Téléphone",
      profile.phone
    ],
  },
  {
    items: [
      "Basé à",
      profile.city,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Langues",
      "",
      profile.languages[0] || "Français",
      "",
      profile.languages[1] || "Anglais",
    ],
  },
];
