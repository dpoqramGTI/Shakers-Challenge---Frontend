// app/projects/layout.tsx
import Navbar from "@/components/common/Navbar";
import React from "react";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem", maxWidth: "1440px", margin: "0 auto" }}>
        {children}
      </main>
    </>
  );
}
