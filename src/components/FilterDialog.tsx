
/*
File: components/FilterDialog.tsx
Descripción: Encapsula el diálogo de filtros (usa FilterBar interno)
*/
import React from "react";
import { Dialog, DialogContent, IconButton, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterBar from "./FilterBar";
import { ProjectFilterValues } from "@/types";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (f: ProjectFilterValues) => void;
  onClear: () => void;
  initialValues: ProjectFilterValues;
  specialtiesOptions: string[];
  skillsOptions: string[];
  projectTypesOptions: string[];
  industryOptions: string[];
}

export function FilterDialog({ open, onClose, onApply, onClear, initialValues, specialtiesOptions, skillsOptions, projectTypesOptions, industryOptions }: FilterDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth={false}
      sx={{ "& .MuiDialog-container": { alignItems: { xs: "flex-start", sm: "center" } } }}
      PaperProps={{ sx: { m: 0, borderRadius: fullScreen ? 0 : 2, width: { xs: "100%", sm: 500 }, maxWidth: "100%", height: "fit-content" } }}
    >
      <DialogContent sx={{ p: 2, position: "relative" }}>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8, color: "grey.600" }} aria-label="Cerrar">
          <CloseIcon />
        </IconButton>
        <FilterBar
          specialtiesOptions={specialtiesOptions}
          skillsOptions={skillsOptions}
          projectTypesOptions={projectTypesOptions}
          industryOptions={industryOptions}
          onApply={onApply}
          onClear={onClear}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
}
