// components/ProjectDetail/BreadcrumbNav.tsx
import React from "react";
import { Stack, Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface BreadcrumbNavProps {
  title: string;
}

/**
 * BreadcrumbNav
 * 
 * Props:
 * - title: título actual que se muestra en el breadcrumb
 * 
 * Navegación tipo breadcrumb para detalle de proyecto.
 * Incluye botón "Atrás" que hace history.back() y ruta hacia Buscador de Proyectos.
 * Muestra título actual en texto estilizado.
 */
export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ title }) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    gap={{ xs: 1, sm: 2 }}
    alignItems={{ xs: "flex-start", sm: "center" }}
    sx={{ mb: { xs: 1, sm: 2 } }}
  >
    <MuiLink
      component="button"
      variant="body2"
      onClick={() => window.history.back()}
      sx={{
        color: "#033028",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        mb: { xs: 1, sm: 0 },
        fontSize: { xs: "0.85rem", sm: "inherit" },
      }}
    >
      <ChevronLeftIcon fontSize="medium" sx={{ mr: 0.5 }} />
      Atrás
    </MuiLink>
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        fontSize: { xs: "0.85rem", sm: "inherit" },
      }}
    >
      <MuiLink underline="hover" color="inherit" href="/projects">
        Buscador Proyectos
      </MuiLink>
      <Typography
        color="text.primary"
        fontStyle="italic"
        fontWeight="bold"
        noWrap
        sx={{ maxWidth: { xs: "100%", sm: "auto" } }}
      >
        {title}
      </Typography>
    </Breadcrumbs>
  </Stack>
);
