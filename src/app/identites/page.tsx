import type { Metadata } from "next";
import { brandIdentities } from "@/lib/identities";
import IdentitesClient from "./IdentitesClient";

export const metadata: Metadata = {
  title: "Identités visuelles — SOKPA Edo Yawo",
  description:
    "Logos, déclinaisons et chartes graphiques conçus par Edo Sokpa, designer graphique à Lomé.",
};

export default function IdentitesPage() {
  return <IdentitesClient identities={brandIdentities} />;
}
