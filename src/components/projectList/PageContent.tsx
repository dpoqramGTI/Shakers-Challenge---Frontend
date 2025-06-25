// components/projectList/PageContent.tsx
import React from "react";
import { Box, CircularProgress, Typography, Pagination } from "@mui/material";
import { ListClient } from "@/components/projectList/ListClient";
import type { Project, RawProject } from "@/types";
import type { ProjectListResponse } from "@/types";
import { transformRawProject } from "@/utils/transform";

interface PageContentProps {
  loading: boolean;
  error: Error | null;
  projects: RawProject[];
  data: ProjectListResponse | null;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

/**
 * PageContent
 *
 * Props:
 * - loading: estado de carga
 * - error: error al cargar datos (si existe)
 * - projects: proyectos en crudo
 * - data: datos paginados con metadatos
 * - onPageChange: callback para cambio de página
 *
 * Renderiza contenido principal de la lista de proyectos,
 * muestra loader, error, lista y paginación.
 */
export const PageContent: React.FC<PageContentProps> = ({
  loading,
  error,
  projects,
  data,
  onPageChange,
}) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error">Error al cargar proyectos.</Typography>
      </Box>
    );
  }

  const projectsTransformed: Project[] = projects.map((project) => transformRawProject(project));

  return (
    <>
      <ListClient initialProjects={projectsTransformed} />
      {data?.meta && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <Pagination
            count={data.meta.lastPage + 1}
            page={data.meta.page + 1}
            onChange={onPageChange}
          />
        </Box>
      )}
    </>
  );
};
