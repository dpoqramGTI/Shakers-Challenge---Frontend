// components/filter/AppliedFilters.tsx
import React, { useState } from "react";
import { Box, Stack, Typography, IconButton, Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppliedChip } from "./AppliedChip";
import type { FilterValues, OptionItem } from "@/types";

interface AppliedFiltersProps {
  filters: FilterValues;
  onRemove: (category: keyof Omit<FilterValues, "sortOrder">, value: number) => void;
  specialtiesOptions: OptionItem[];
  skillsOptions: OptionItem[];
  categoriesOptions: OptionItem[];
  industryOptions: OptionItem[];
}

/**
 * AppliedFilters
 * 
 * Muestra un resumen desplegable de los filtros aplicados,
 * agrupados por categoría, con chips para cada filtro activo.
 * Permite eliminar filtros pulsando en la "X" del chip.
 * 
 * Props:
 * - filters: objeto con arrays de IDs para cada categoría de filtro
 * - onRemove: callback para eliminar un filtro dado su categoría e id
 * - specialtiesOptions, skillsOptions, categoriesOptions, industryOptions:
 *   listas con nombre y id para mostrar etiquetas legibles
 */
export const AppliedFilters: React.FC<AppliedFiltersProps> = ({
  filters,
  onRemove,
  specialtiesOptions,
  skillsOptions,
  categoriesOptions,
  industryOptions,
}) => {
  const [expanded, setExpanded] = useState(true);

  const hasFilters =
    filters.specialties.length > 0 ||
    filters.skills.length > 0 ||
    filters.categories.length > 0 ||
    filters.industries.length > 0;

  if (!hasFilters) return null;

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  // Obtener nombre legible de filtro por id y lista de opciones
  const getNameById = (id: number, options: OptionItem[]) => {
    return options.find((opt) => opt.id === id)?.name || `ID ${id}`;
  };

  return (
    <Box
      sx={{
        mt: 4,
        mb: 2,
        borderRadius: 1,
        bgcolor: "#edf7f6",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
        <Typography variant="subtitle1" fontStyle={"italic"} sx={{ fontWeight: 600, opacity: 0.95, fontSize: "0.95rem" }}>
          Filtros aplicados
        </Typography>
        <IconButton size="small" onClick={handleToggle} aria-label={expanded ? "Replegar filtros" : "Ver filtros aplicados"}>
          {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2, pt: 0 }}>
          <Stack spacing={1}>
            {filters.specialties.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Typography variant="body2" color={"dimgray"} sx={{ mr: 1 }}>
                  Especialidades:
                </Typography>
                {filters.specialties.map((id) => (
                  <AppliedChip
                    key={id}
                    label={getNameById(id, specialtiesOptions)}
                    onDelete={() => onRemove("specialties", id)}
                  />
                ))}
              </Box>
            )}

            {filters.skills.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Typography variant="body2" color={"dimgray"} sx={{ mr: 1 }}>
                  Habilidades:
                </Typography>
                {filters.skills.map((id) => (
                  <AppliedChip
                    key={id}
                    label={getNameById(id, skillsOptions)}
                    onDelete={() => onRemove("skills", id)}
                  />
                ))}
              </Box>
            )}

            {filters.categories.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Typography variant="body2" color={"dimgray"} sx={{ mr: 1 }}>
                  Tipo de proyecto:
                </Typography>
                {filters.categories.map((id) => (
                  <AppliedChip
                    key={id}
                    label={getNameById(id, categoriesOptions)}
                    onDelete={() => onRemove("categories", id)}
                  />
                ))}
              </Box>
            )}

            {filters.industries.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Typography variant="body2" color={"dimgray"} sx={{ mr: 1 }}>
                  Industria:
                </Typography>
                {filters.industries.map((id) => (
                  <AppliedChip
                    key={id}
                    label={getNameById(id, industryOptions)}
                    onDelete={() => onRemove("industries", id)}
                  />
                ))}
              </Box>
            )}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};
