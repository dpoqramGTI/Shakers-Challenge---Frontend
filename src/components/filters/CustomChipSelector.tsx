// components/filter/CustomChipSelector.tsx
import React from "react";
import { Autocomplete, TextField, Box, Chip } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMoreSharp";

type OptionItem = {
  id: number;
  name: string;
};

interface FilterFieldProps {
  label: string;
  options: OptionItem[];    // Lista de opciones disponibles
  selected: number[];       // IDs seleccionados
  onChange: (values: number[]) => void;  // Callback al cambiar selección
}

/**
 * CustomChipSelector
 * 
 * Selector múltiple que muestra chips personalizados para las opciones seleccionadas.
 * Usa Autocomplete de MUI con renderizado custom de chips que tienen un botón de borrado estilizado.
 * 
 * Props:
 * - label: texto para placeholder y etiquetas
 * - options: lista completa de opciones posibles
 * - selected: array con IDs seleccionados
 * - onChange: callback con el nuevo array de IDs cuando cambian las selecciones
 */
export function CustomChipSelector({ label, options, selected, onChange }: FilterFieldProps) {
  // Filtra las opciones seleccionadas para mostrarlas como chips
  const selectedOptions = options.filter((opt) => selected.includes(opt.id));

  // Renderiza los chips personalizados con botón de borrado estilizado
  const renderCustomChips = (items: OptionItem[], onDelete: (id: number) => void) => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {items.map((item) => (
        <Chip
          key={item.id}
          label={item.name}
          size="medium"
          deleteIcon={
            <Box
              sx={{
                backgroundColor: "#033028",
                color: "#edf7f6 !important",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 18,
                height: 18,
                borderRadius: 0.75,
                border: "1px solid #edf7f6",
                fontSize: "0.75rem !important",
                lineHeight: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#033028e0",
                  color: "white !important",
                },
              }}
            >
              X
            </Box>
          }
          onDelete={() => onDelete(item.id)}
          sx={{
            backgroundColor: "#edf7f6",
            color: "#033028",
            borderRadius: 1,
          }}
        />
      ))}
    </Box>
  );

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(opt) => opt.name}
        value={selectedOptions}
        onChange={(_, newValue: OptionItem[]) => {
          const ids = newValue.map((opt) => opt.id);
          onChange(ids);
        }}
        popupIcon={<UnfoldMoreIcon fontSize="small" />}
        size="small"
        sx={{ flex: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={selected.length === 0 ? `Busca y añade ${label.toLowerCase()}...` : ""}
            size="small"
          />
        )}
        renderTags={(tagValue) =>
          renderCustomChips(tagValue, (id) => {
            onChange(selected.filter((i) => i !== id));
          })
        }
      />
    </Box>
  );
}
