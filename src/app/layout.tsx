// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import AppThemeProvider from "@/components/AppThemeProvider";

export const metadata = {
  title: "Shakers Projects",
  description: "Listado de proyectos Shakers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head />
      <body>
        {/* AppThemeProvider es Client Component */}
        <AppThemeProvider>
          {children}
        </AppThemeProvider>
      </body>
    </html>
  );
}
