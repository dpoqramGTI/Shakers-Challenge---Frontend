// components/projectList/SkillChips.tsx
import React from "react";
import { Box, Chip } from "@mui/material";
import { skillIcons } from "@/utils/skillIcons";

interface SkillChipsProps {
  positions: Array<{ skillIds: number[]; skills: string[] }>;
  visibleOnMobile?: boolean;
}

/**
 * SkillChips
 * 
 * Props:
 * - positions: array con skillIds y nombres de skills
 * - visibleOnMobile: si mostrar en vista móvil
 * 
 * Muestra chips de habilidades únicas asociadas a las posiciones.
 */
export const SkillChips: React.FC<SkillChipsProps> = ({ positions, visibleOnMobile = false }) => {
  const uniqueIds = Array.from(new Set(positions.flatMap((p) => p.skillIds)));
  return (
    <Box
      sx={{
        display: visibleOnMobile ? { xs: "flex", sm: "none" } : { xs: "none", sm: "flex" },
        mt: visibleOnMobile ? 0 : "auto",
        width: "100%",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {uniqueIds.map((skillId) => {
        const pos = positions.find((p) => p.skillIds.includes(skillId));
        const name = pos ? pos.skills[pos.skillIds.indexOf(skillId)] : `ID ${skillId}`;
        return (
          <Chip
            key={skillId}
            icon={skillIcons[skillId] ?? undefined}
            label={name}
            size="small"
            sx={{
              fontSize: "0.75rem",
              bgcolor: "#f4f5f5",
              borderRadius: 1,
              justifyContent: "flex-start",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              py: 2,
              px: 1,
            }}
          />
        );
      })}
    </Box>
  );
};
