// components/ProjectDetail/HeaderSection.tsx
import React from "react";
import { Box, Typography, Chip, Paper } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import EurCoin from "@mui/icons-material/EuroSymbolOutlined";
import type { Project } from "@/types";
import { formatThousands } from "@/utils/misc";

interface HeaderSectionProps {
  project: Project;
}

/**
 * HeaderSection
 * 
 * Props:
 * - project: objeto con datos completos del proyecto
 * 
 * Encabezado visual del proyecto con título, categoría, industria y detalles clave:
 * - Fecha de inicio
 * - Horas totales
 * - Presupuesto estimado o por hora
 * - Número de posiciones de talento requeridas
 * 
 * Usa chips con iconos para cada detalle.
 */
export const HeaderSection: React.FC<HeaderSectionProps> = ({ project }) => (
  <Paper sx={{ p: 3, bgcolor: "#033028", color: "#edf7f6", borderRadius: 2 }}>
    <Box
      sx={{
        display: "flex",
        mb: 1.5,
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Typography variant="h5">{project.title}</Typography>
      <Chip
        icon={<LocalOfferOutlinedIcon sx={{ color: "#033028", height: "1rem" }} />}
        label={project.organization.industry}
        sx={{
          display: { xs: "none", sm: "flex" },
          bgcolor: "#edf7f6",
          color: "#033028",
          borderRadius: 2,
          "& .MuiChip-label": { paddingLeft: 1, paddingRight: 2 },
        }}
      />
    </Box>
    <Typography variant="subtitle1" gutterBottom>
      {project.category}
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
      <Chip
        icon={<CalendarTodayOutlinedIcon sx={{ color: "#033028", height: "1rem" }} />}
        label={`Inicio ${new Date(project.startDate).toLocaleDateString("es-ES")}`}
        sx={{
          bgcolor: "#edf7f6",
          color: "#033028",
          borderRadius: 2,
          "& .MuiChip-label": { paddingLeft: 1, paddingRight: 2 },
        }}
      />
      <Chip
        icon={<AccessTimeOutlinedIcon sx={{ color: "#033028", height: "1rem" }} />}
        label={`${project.totalHours} horas`}
        sx={{
          bgcolor: "#edf7f6",
          color: "#033028",
          borderRadius: 2,
          "& .MuiChip-label": { paddingLeft: 1, paddingRight: 2 },
        }}
      />
      <Chip
        icon={<EurCoin sx={{ color: "#033028", height: "1rem" }} />}
        label={
          project.budget.total != null
            ? `${formatThousands(project.budget.total)} (Estimado)`
            : `${formatThousands(project.budget.hourFrom)} - ${formatThousands(project.budget.hourTo)} (Por hora)`
        }
        sx={{
          bgcolor: "#edf7f6",
          color: "#033028",
          borderRadius: 2,
          "& .MuiChip-label": { paddingLeft: 1, paddingRight: 2 },
        }}
      />
      <Chip
        icon={<GroupOutlinedIcon sx={{ color: "#033028", height: "1rem" }} />}
        label={`${project.positions.length} Talento${project.positions.length !== 1 ? "s" : ""}`}
        sx={{
          bgcolor: "#edf7f6",
          color: "#033028",
          borderRadius: 2,
          "& .MuiChip-label": { paddingLeft: 1, paddingRight: 2 },
        }}
      />
    </Box>
  </Paper>
);
