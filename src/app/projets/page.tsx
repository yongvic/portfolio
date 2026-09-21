import type { Metadata } from "next";
import { getProjects } from "@/lib/db";
import ProjetsClient from "./ProjetsClient";

export const metadata: Metadata = {
  title: "Projets — SOKPA Edo Yawo",
  description:
    "Catalogue des réalisations : SaaS, sites clients, automatisation et direction artistique.",
};

export default async function ProjetsPage() {
  const projects = await getProjects();
  return <ProjetsClient projects={projects} />;
}
