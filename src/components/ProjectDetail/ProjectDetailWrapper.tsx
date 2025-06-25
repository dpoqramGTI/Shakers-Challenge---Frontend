// components/ProjectDetail/ProjectDetailWrapper.tsx
"use client";
import React, { useEffect, useCallback } from "react";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { useAppliedPositions } from "@/hooks/useAppliedPositions";
import {
  Box,
  Container,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import toast from "react-hot-toast";
import { BreadcrumbNav } from "./BreadCrumbNav";
import { HeaderSection } from "./HeaderSection";
import { DescriptionSection } from "./DescriptionSection";
import { GoalsSection } from "./GoalsSection";
import { FAQSection } from "./FAQSection";
import { ResponsibleCard } from "./ResponsibleCard";
import { PositionItem } from "./PositionItem";

interface Props {
  projectId: string;
}

const sectionBoxSx = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
  maxWidth: {
    xs: "80%",
    sm: "50%",
    md: "40%",
    lg: "30%",
    xl: "25%",
    "2xl": "20%",
  },
};

/**
 * ProjectDetailWrapper
 * 
 * Props:
 * - projectId: id del proyecto para cargar datos
 * 
 * Componente contenedor que orquesta la carga y despliegue de la página detalle de proyecto.
 * Maneja estados de carga y error, renderiza secciones y permite aplicar/retirar candidatura.
 */
export default function ProjectDetailWrapper({ projectId }: Props) {
  const { data: project, loading, error } = useProjectDetail(projectId, true);
  const { apply, withdraw, isApplied } = useAppliedPositions();

  useEffect(() => {
    if (error) {
      toast.error("No se pudo cargar el proyecto.");
    }
  }, [error]);

  const handleApply = useCallback(
    (id: number) => {
      apply(id);
      toast.success("Aplicación enviada con éxito", {
        icon: null,
        style: { background: "#edf7f6", color: "#033028" },
      });
    },
    [apply],
  );

  const handleWithdraw = useCallback(
    (id: number) => {
      withdraw(id);
      toast("Candidatura retirada", {
        style: { background: "#ffebee", color: "#c62828" },
        iconTheme: { primary: "#c62828", secondary: "#ffebee" },
      });
    },
    [withdraw],
  );

  if (loading) return <LoadingSpinner />;
  if (!project) return <NotFoundMessage />;

  return (
    <Box sx={{ py: 3 }}>
      <Container
        maxWidth="xl"
        sx={{
          px: 0,
          "@media (min-width:600px)": {
            px: 0,
          },
        }}
      >        <BreadcrumbNav title={project.title} />
        <HeaderSection project={project} />
        <DescriptionSection description={project.description} />
        <GoalsSection goals={project.goals} />
        <FAQSection faqs={project.faqs} />

        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={6}
          sx={{ my: 3 }}
        >
          <Box sx={{ ...sectionBoxSx, height: "fit-content" }}>
            <Typography variant="h6" gutterBottom>
              Responsable
            </Typography>
            <ResponsibleCard
              organization={project.organization}
              leader={project.projectLeader}
            />
          </Box>

          <Box sx={sectionBoxSx}>
            <Typography variant="h6" gutterBottom>
              Equipo
            </Typography>
            {project.positions.map((pos) => (
              <PositionItem
                key={pos.id}
                position={pos}
                isApplied={isApplied(pos.id)}
                onApply={handleApply}
                onWithdraw={handleWithdraw}
              />
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

function LoadingSpinner() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <CircularProgress />
    </Box>
  );
}

function NotFoundMessage() {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography>Proyecto no encontrado.</Typography>
    </Box>
  );
}
