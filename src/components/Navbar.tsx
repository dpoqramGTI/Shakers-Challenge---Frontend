"use client";

import Image from "next/image";
import React from "react";
import imagenNav from "@/images/imagenNav.webp";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import shakersIcon from "@/images/shakersIcon.svg";

interface NavbarProps {
  title?: string;
  onMenuClick?: () => void;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  title = "Buscar Proyectos",
  onMenuClick,
  onButton1Click,
  onButton2Click,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1.5rem",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* Left side: en móvil, icono de hamburguesa + logo; en desktop, solo el título */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {isMobile ? (
          <>
            <IconButton
              onClick={onMenuClick}
              aria-label="Menú"
              size="small"
              sx={{ p: 0.5 }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
            <Image
              src={shakersIcon}
              alt="Logo"
              width={22}
              height={22}
              style={{ borderRadius: ".3rem", objectFit: "cover" }}
            />
          </>
        ) : (
          <div style={{ fontWeight: 700, fontSize: "1.25rem" }}>{title}</div>
        )}
      </div>

      {/* Right side: iconos fijos */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <IconButton onClick={onButton1Click} aria-label="Mensajes" size="small">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#181b1a" d="M16 5.333c-7.732 0-14 4.7-14 10.5c0 1.982.74 3.833 2.016 5.414L2 25.667l5.613-1.44c2.34 1.316 5.237 2.106 8.387 2.106c7.732 0 14-4.7 14-10.5s-6.268-10.5-14-10.5z"/></svg>
        </IconButton>
        <IconButton onClick={onButton2Click} aria-label="Notificaciones" size="small">
          <NotificationsIcon fontSize="medium" sx={{ color: "#181b1a" }} />
        </IconButton>
        <Image
          src={imagenNav}
          alt="Navbar"
          width={30}
          height={30}
          style={{ borderRadius: ".5rem", objectFit: "cover", padding: "0.1rem" }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
