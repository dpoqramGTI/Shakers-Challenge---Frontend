import React from "react";
import { Autocomplete, TextField, Box, Chip } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMoreSharp";

interface FilterFieldProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export function FilterField({ label, options, selected, onChange }: FilterFieldProps) {

  const renderCustomChips = (selected: string[], onDelete: (value: string) => void) => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {selected.map((value) => (
        <Chip
          key={value}
          label={value}
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
          onDelete={() => onDelete(value)}
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
        value={selected}
        size="small"
        onChange={(_, newValue: string[]) => onChange(newValue)}
        popupIcon={<UnfoldMoreIcon fontSize="small" />}
        sx={{ flex: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={selected.length === 0 ? `Busca y añade ${label.toLowerCase()}...` : ""}
            size="small"
          />
        )}
        renderTags={(selected) =>
          renderCustomChips(selected, (val) =>
            onChange(selected.filter((i) => i !== val)),
          )
        }
      />
    </Box>
  );
}
