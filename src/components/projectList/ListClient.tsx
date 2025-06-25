// components/projectList/ListClient.tsx
import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";

interface ListClientProps {
  initialProjects: Project[];
}

/**
 * ListClient
 *
 * Props:
 * - initialProjects: array de proyectos para mostrar
 *
 * Renderiza una lista de proyectos usando ProjectCard.
 * Muestra mensaje si no hay proyectos.
 */
export const ListClient: React.FC<ListClientProps> = ({ initialProjects }) => {
  if (initialProjects.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography align="center">No se encontraron proyectos.</Typography>
      </Container>
    );
  }
  return (
    <Container
      maxWidth={false}
      sx={{
        py: 3,
        maxWidth: "100%",
        px: "0 !important",
        "@media (min-width:1200px)": {
          maxWidth: "1440px",
        },
      }}
    >
      <Box mb={2} width="100%" display="flex">
        <Typography
          variant="subtitle2"
          component="h1"
          sx={{
            backgroundColor: "#edf7f6",
            borderRadius: "8px",
            padding: "8px 16px",
          }}
        >
          € ¡Gana 1500€ por referir!
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {initialProjects.map((proj, idx) => (
          <ProjectCard key={proj.id} proj={proj} index={idx} />
        ))}
      </Grid>
    </Container>
  );
};
