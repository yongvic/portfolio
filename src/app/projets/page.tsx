import type { Metadata } from "next";
import { getIdentityPlacements, getProjects } from "@/lib/db";
import { identityToUiProject, visibleIdentities } from "@/lib/identities";
import ProjetsClient from "./ProjetsClient";

export const metadata: Metadata = {
  title: "Projets — SOKPA Edo Yawo",
  description:
    "Catalogue des réalisations : SaaS, sites clients, identités visuelles, automatisation et direction artistique.",
};

export default async function ProjetsPage() {
  const [projects, placements] = await Promise.all([getProjects(), getIdentityPlacements()]);
  const identities = visibleIdentities(placements).map(identityToUiProject);
  return <ProjetsClient projects={[...projects, ...identities]} />;
}
