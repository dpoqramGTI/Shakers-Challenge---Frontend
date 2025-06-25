// components/filter/Modal.tsx
import React from "react";
import { Dialog, DialogContent, IconButton, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Form from "./Form";
import { OptionItem, ProjectFilterValues } from "@/types";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (f: ProjectFilterValues) => void;
  onClear: () => void;
  initialValues: ProjectFilterValues;
  specialtiesOptions: OptionItem[];
  skillsOptions: OptionItem[];
  categoriesOptions: OptionItem[];
  industryOptions: OptionItem[];
}

/**
 * Modal
 * 
 * Diálogo modal que envuelve el formulario de filtros.
 * Ajusta tamaño y posición responsivamente según pantalla.
 * 
 * Props:
 * - open: controla visibilidad
 * - onClose: cierra modal
 * - onApply: aplica filtros
 * - onClear: limpia filtros
 * - initialValues: valores iniciales para el formulario
 * - opciones para filtros
 */
export function Modal({
  open,
  onClose,
  onApply,
  onClear,
  initialValues,
  specialtiesOptions,
  skillsOptions,
  categoriesOptions,
  industryOptions,
}: FilterDialogProps) {
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
      PaperProps={{
        sx: {
          m: 0,
          borderRadius: fullScreen ? 0 : 2,
          width: { xs: "100%", sm: 500 },
          maxWidth: "100%",
          height: "fit-content",
        },
      }}
    >
      <DialogContent sx={{ p: 2, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "grey.600" }}
          aria-label="Cerrar"
        >
          <CloseIcon />
        </IconButton>
        <Form
          specialtiesOptions={specialtiesOptions}
          skillsOptions={skillsOptions}
          categoriesOptions={categoriesOptions}
          industryOptions={industryOptions}
          onApply={onApply}
          onClear={onClear}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
}
