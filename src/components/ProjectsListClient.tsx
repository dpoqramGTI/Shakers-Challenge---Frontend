/*
File: components/ProjectsListClient.tsx
Descripción: Lista de proyectos usando ProjectCard
*/
import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";

interface Props { initialProjects: Project[]; }

export default function ProjectsListClient({ initialProjects }: Props) {
  if (initialProjects.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography align="center">No se encontraron proyectos.</Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box mb={2} width="100%" display="flex">
        <Typography variant="subtitle2" component="h1" sx={{ backgroundColor: "#edf7f6", borderRadius: "8px", padding: "8px 16px" }}>
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
}
