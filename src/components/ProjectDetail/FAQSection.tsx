// components/ProjectDetail/FAQSection.tsx
import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { FAQ } from "@/types";

interface FAQSectionProps {
  faqs: FAQ[];
}

/**
 * FAQSection
 * 
 * Props:
 * - faqs: lista de preguntas frecuentes con pregunta y respuesta
 * 
 * Lista de preguntas frecuentes en acordeones desplegables.
 * Cada pregunta puede expandirse para mostrar su respuesta.
 */
export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => (
  <Box sx={{ my: 3, display: "flex", flexDirection: "column", gap: 2 }}>
    <Typography variant="h6" sx={{ color: "#03a3028" }}>Preguntas Frecuentes</Typography>
    {faqs.map((f, idx) => (
      <Accordion
        key={idx}
        sx={{
          border: "2px solid #edf7f6",
          boxShadow: "none",
          borderRadius: "0.5rem !important",
          position: "inherit",
          "&.Mui-expanded": { bgcolor: "#edf7f6" },
          "& .MuiAccordionSummary-root.Mui-expanded": { paddingTop: "0.75rem", minHeight: "unset" },
          "& .MuiAccordionSummary-content.Mui-expanded": { margin: "4px 0" },
          "& .MuiAccordionSummary-content .MuiTypography-root": { fontStyle: "normal" },
          "&.Mui-expanded .MuiAccordionSummary-content .MuiTypography-root": { fontStyle: "italic" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ color: "black" }}>{f.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "dimgray" }}>{f.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </Box>
);
