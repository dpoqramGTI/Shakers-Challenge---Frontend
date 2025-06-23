// app/page.tsx
import Link from "next/link";
import { Container, Typography, Button, Stack } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack alignItems="center" spacing={4}>
        <Typography variant="h3" component="h1" align="center">
          Bienvenido a Shakers Projects
        </Typography>
        <Typography variant="body1" align="center">
          Explora los proyectos disponibles y postúlate al que más te interese.
        </Typography>
        <Link href="/projects" style={{ textDecoration: "none" }}>
          <Button variant="contained" size="large" component="a">
            Ver proyectos
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
