// app/projects/[id]/page.tsx
import type { RawProject } from "@/types";
import rawMock from "@/mocks/companyMock.json";
import ProjectDetailClient from "@/components/ProjectDetail/ProjectDetailClient";
import Navbar from "@/components/Navbar";

interface Params { id: string; }

export const metadata = {
  title: "Shakers - Reinventing Work",
  description: "Explora los proyectos más innovadores en Shakers.",
};

export default function ProjectPage({ params }: { params: Params }) {
  const rawProjects = rawMock as RawProject[];
  const raw = rawProjects.find((r) => String(r.id) === params.id);

  if (!raw) {
    return <p>Proyecto no encontrado.</p>;
  }

  return (
    <>
      <Navbar />
      <ProjectDetailClient rawProject={raw} /> 
    </>
  );
}
