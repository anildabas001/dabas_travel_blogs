import Image from "next/image";
import {
  Container,
  Grid,
  CssBaseline
} from "@mui/material";
import ThemeWrapper from "@/components/RootThemeWrapper";
import Header from "@/components/header/header";
import trip_image from "@/assets/images/travel_blog.jpg";
import MessageWindow from "@/components/messageWindow";

export default function Home() {
  return (
    <ThemeWrapper>
      <CssBaseline />
      <Container sx={{p: 0}} maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Header title="TripTales" />
          </Grid>
          <Grid item xs={12}>
            <main>
              <section>
                <MessageWindow image={trip_image} title={"Welcome to TripTales"} message={"Where Every Journey Tells a Story"}/>
              </section>
            </main>
          </Grid>
        </Grid>       
      </Container>
    </ThemeWrapper>
  );
}
