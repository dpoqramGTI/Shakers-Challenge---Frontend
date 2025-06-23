// app/projects/page.tsx
import ProjectsPageClient from "@/components/ProjectsPageClient";
import rawMock from "@/mocks/companyMock.json";
import type { RawProject } from "@/types";
import { transformRawProject } from "@/utils/transform";

export const metadata = {
  title: "Shakers - Reinventing Work",
  description: "Explora los proyectos más innovadores en Shakers.",
};

export default function ProjectsPage() {
  const rawProjects = rawMock as RawProject[];
  const projects = rawProjects.map(transformRawProject);
  return <ProjectsPageClient initialProjects={projects} />;
}
