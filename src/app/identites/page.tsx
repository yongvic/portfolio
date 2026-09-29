import type { Metadata } from "next";
import { getIdentityPlacements } from "@/lib/db";
import { visibleIdentities } from "@/lib/identities";
import IdentitesClient from "./IdentitesClient";

export const metadata: Metadata = {
  title: "Identités visuelles — SOKPA Edo Yawo",
  description:
    "Logos, déclinaisons et chartes graphiques conçus par Edo Sokpa, designer graphique à Lomé.",
};

export const dynamic = "force-dynamic";

export default async function IdentitesPage() {
  const placements = await getIdentityPlacements();
  return <IdentitesClient identities={visibleIdentities(placements)} />;
}
