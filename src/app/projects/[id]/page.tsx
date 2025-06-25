// app/projects/[id]/page.tsx
import { Metadata } from "next";
import ProjectDetailWrapper from "@/components/projectDetail/ProjectDetailWrapper";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Shakers - Reinventing Work",
  description: "Explora los proyectos más innovadores en Shakers.",
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  return <ProjectDetailWrapper projectId={resolvedParams.id} />;
}
