// components/projectList/OrgAvatar.tsx
import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

interface OrgAvatarProps {
  logo?: string;
  name: string;
  size?: number; // Tamaño en píxeles (ancho y alto)
}

/**
 * OrgAvatar
 *
 * Props:
 * - logo: URL del logo de la organización (opcional)
 * - name: nombre de la organización
 * - size: tamaño del avatar en píxeles (ancho y alto)
 *
 * Muestra el logo o la inicial de la organización con su nombre.
 */
export const OrgAvatar: React.FC<OrgAvatarProps> = ({ logo, name, size = 150 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { xs: "100%", sm: size },
        maxWidth: { xs: 75, sm: size },
        p: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: { xs: "80%", sm: "100%" },
          maxWidth: { xs: 75, sm: size },
          aspectRatio: "1 / 1",
          position: "relative",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {logo ? (
          <Image
            src={logo}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width:600px) 80vw, 150px"
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#e0e0e0",
              fontSize: { xs: "2rem", sm: "2rem" },
              color: "#616161",
            }}
          >
            {name.charAt(0)}
          </Box>
        )}
      </Box>
      <Typography
        variant="subtitle2"
        color="darkgray"
        fontSize="0.75rem"
        sx={{
          mt: 1,
          textAlign: "center",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};
