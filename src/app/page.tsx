import HomeClient from "./HomeClient";
import { getProjects } from "@/lib/db";

export default async function Home() {
  const projects = await getProjects();

  return <HomeClient projects={projects} />;
}
