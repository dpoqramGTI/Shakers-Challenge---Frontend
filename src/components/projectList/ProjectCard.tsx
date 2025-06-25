// components/projectList/ProjectCard.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { OrgAvatar } from "./OrgAvatar";
import { SkillChips } from "./SkillChips";
import type { Project } from "@/types";
import { formatThousands } from "@/utils/misc";

interface ProjectCardProps {
  proj: Project;
  index: number; // Índice para animaciones escalonadas
}

/**
 * ProjectCard
 * 
 * Props:
 * - proj: proyecto a mostrar
 * - index: índice para animación escalonada
 * 
 * Muestra tarjeta del proyecto con logo, título, categoría,
 * presupuesto y habilidades.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ proj, index }) => {
  const router = useRouter();

  return (
    <Box key={proj.id} sx={{ width: "100%" }}>
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 50, damping: 6 }}
      >
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", p: { xs: 1, sm: 0 } }}>
          <CardActionArea
            onClick={() => router.push(`/projects/${proj.id}`)}
            sx={{ display: "flex", width: "100%", alignItems: { xs: "flex-start", sm: "center" } }}
          >
            <OrgAvatar logo={proj.organization.logo} name={proj.organization.name} />
            <Box sx={{ flex: 1, minWidth: 0, p: { xs: 1, sm: 2 } }}>
              <CardContent sx={{ p: 0, pb: 1.5 }}>
                <Typography
                  variant="h6"
                  noWrap
                  gutterBottom
                  sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {proj.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="#0b5a4c"
                  sx={{
                    mb: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {proj.category} | {proj.organization.industry} |{" "}
                  <span style={{ color: "#1eb59a96" }}>€</span>{" "}
                  {proj.budget.total != null
                    ? `${formatThousands(proj.budget.total)} €`
                    : `${formatThousands(proj.budget.hourFrom)} - ${formatThousands(proj.budget.hourTo)} €/h`}
                </Typography>
              </CardContent>
              <SkillChips positions={proj.positions.map((p) => ({ skillIds: p.skillIds, skills: p.skills }))} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignSelf: "stretch",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                borderLeft: { sm: "1px solid #e0e0e0" },
              }}
            >
              {/* Ícono de flecha derecha */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 512">
                <path
                  fill="currentColor"
                  d="m224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4l-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                />
              </svg>
            </Box>
          </CardActionArea>

          {/* Versión móvil del SkillChips */}
          <CardActionArea
            onClick={() => router.push(`/projects/${proj.id}`)}
            sx={{ display: { xs: "block", sm: "none" }, px: 1.5, pb: 1 }}
          >
            <Box sx={{ width: "100%" }}>
              <SkillChips
                positions={proj.positions.map((p) => ({ skillIds: p.skillIds, skills: p.skills }))}
                visibleOnMobile
              />
            </Box>
          </CardActionArea>
        </Card>
      </motion.div>
    </Box>
  );
};
