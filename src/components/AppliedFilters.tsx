// components/AppliedFilters.tsx
import React, { useState } from "react";
import { Box, Stack, Typography, IconButton, Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterChip } from "./FilterAppliedChip";
import type { FilterValues } from "@/types";

interface AppliedFiltersProps {
  filters: FilterValues;
  onRemove: (category: keyof Omit<FilterValues, "sortOrder">, value: string) => void;
}

export const AppliedFilters: React.FC<AppliedFiltersProps> = ({ filters, onRemove }) => {
  const [expanded, setExpanded] = useState(true);
  const hasFilters =
    filters.specialties.length > 0 ||
    filters.skills.length > 0 ||
    filters.projectTypes.length > 0 ||
    filters.industries.length > 0;

  if (!hasFilters) return null;

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box
      sx={{
        mx: 2,
        mb: 2,
        borderRadius: 1,
        bgcolor: "#edf7f6",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
        <Typography variant="subtitle1" fontStyle={"italic"}>Filtros aplicados</Typography>
        <Box>
          <IconButton size="small" onClick={handleToggle} aria-label={expanded ? "Replegar filtros" : "Ver filtros aplicados"}>
            {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2, pt: 0 }}>
          <Stack spacing={1}>
            {filters.specialties.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Typography variant="body2" color={"dimgray"} sx={{ mr: 1 }}>
                  Especialidades:
                </Typography>
                {filters.specialties.map((s) => (
                  <FilterChip key={s} label={s} onDelete={() => onRemove("specialties", s)} />
                ))}
              </Box>
            )}

            {filters.skills.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Typography variant="body2" color={"dimgray"} sx={{ mr: 1 }}>
                  Habilidades:
                </Typography>
                {filters.skills.map((s) => (
                  <FilterChip key={s} label={s} onDelete={() => onRemove("skills", s)} />
                ))}
              </Box>
            )}

            {filters.projectTypes.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Typography variant="body2" color={"dimgray"} sx={{ mr: 1 }}>
                  Tipo de proyecto:
                </Typography>
                {filters.projectTypes.map((s) => (
                  <FilterChip key={s} label={s} onDelete={() => onRemove("projectTypes", s)} />
                ))}
              </Box>
            )}

            {filters.industries.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Typography variant="body2" color={"dimgray"} sx={{ mr: 1 }}>
                  Industria:
                </Typography>
                {filters.industries.map((s) => (
                  <FilterChip key={s} label={s} onDelete={() => onRemove("industries", s)} />
                ))}
              </Box>
            )}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};
