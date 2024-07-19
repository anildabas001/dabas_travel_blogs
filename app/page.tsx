import Image from "next/image";
import {
  Container,
  Grid,
  CssBaseline
} from "@mui/material";
import ThemeWrapper from "@/components/RootThemeWrapper";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <ThemeWrapper>
      <CssBaseline />
      <Container sx={{p: 0}} maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Header title="TripTales" />
          </Grid>
        </Grid>
        Bang
        dang
      </Container>
    </ThemeWrapper>
  );
}
