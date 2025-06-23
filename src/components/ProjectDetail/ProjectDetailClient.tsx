// components/ProjectDetail/ProjectDetailClient.tsx
"use client";
import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { BreadcrumbNav } from "./BreadCrumbNav";
import { HeaderSection } from "./HeaderSection";
import { DescriptionSection } from "./DescriptionSection";
import { GoalsSection } from "./GoalsSection";
import { FAQSection } from "./FAQSection";
import { ResponsibleCard } from "./ResponsibleCard";
import { PositionItem } from "./PositionItem";
import { useAppliedPositions } from "@/hooks/useAppliedPositions";
import toast from "react-hot-toast";
import { transformRawProject } from "@/utils/transform";
import { RawProject } from "@/types";

export default function ProjectDetailClient({ rawProject }: { rawProject: RawProject }) {
  const project = transformRawProject(rawProject);
  const { apply, withdraw, isApplied } = useAppliedPositions();
  const handleApply = (id: number) => {
    apply(id);
    toast("Aplicación enviada con éxito", { style: { background: "#edf7f6", color: "#033028" } });
  };
  const handleWithdraw = (id: number) => {
    withdraw(id);
    toast("Candidatura retirada", { style: { background: "#ffebee", color: "#c62828" }, iconTheme: { primary: "#c62828", secondary: "#ffebee" } });
  };

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="xl">
        <BreadcrumbNav title={project.title} />
        <HeaderSection project={project} />
        <DescriptionSection description={project.description} />
        <GoalsSection goals={project.goals} />
        <FAQSection faqs={project.faqs} />
        <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={6} sx={{ my: 3 }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", flexDirection: "column", gap: 2, maxWidth: { xs: "80%", sm: "50%", md: "40%", lg: "30%", xl: "25%", "2xl": "20%" } }}>
            <Typography variant="h6" gutterBottom>Responsable</Typography>
            <ResponsibleCard organization={project.organization} leader={project.projectLeader} />
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, maxWidth: { xs: "80%", sm: "50%", md: "40%", lg: "30%", xl: "25%", "2xl": "20%" } }}>
            <Typography variant="h6" gutterBottom>Equipo</Typography>
            {project.positions.map((pos) => (
              <PositionItem key={pos.id} position={pos} isApplied={isApplied(pos.id)} onApply={handleApply} onWithdraw={handleWithdraw} />
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
