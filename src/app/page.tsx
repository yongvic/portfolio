import HomeClient from "./HomeClient";
import { getHomeLanes } from "@/lib/db";

export default async function Home() {
  const lanes = await getHomeLanes();

  return <HomeClient devProjects={lanes.dev} designProjects={lanes.design} />;
}
