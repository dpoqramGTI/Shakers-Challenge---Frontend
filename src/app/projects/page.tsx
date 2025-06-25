import React, { Suspense } from "react";
import { ListWrapper } from "@/components/projectList/ListWrapper";

export const metadata = {
  title: "Shakers - Reinventing Work",
  description: "Explora los proyectos más innovadores en Shakers.",
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Cargando proyectos...</div>}>
      <ListWrapper />
    </Suspense>
  );
}
