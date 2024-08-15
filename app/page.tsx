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
import RecentBlogs from "@/components/blogs/recentBlogs";
import { Suspense } from "react";
import About from "@/components/about";
import Contact from "@/components/contact/contact";
import Footer from "@/components/footer";

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
              <Grid container spacing={2}>
                <Grid item md={8} xs={12}>
                  <section>
                    <Suspense fallback={"Loading..."}>
                      <RecentBlogs />
                    </Suspense>                    
                  </section>                  
                </Grid>
                <Grid item md={4} xs={12}>
                  <section>
                    <About />
                  </section>    
                  <section>
                    <Contact />
                  </section>                
                </Grid>
              </Grid>
            </main>
          </Grid>
        </Grid>    
        <Footer sx={{ mt: 8, mb: 4 }} />   
      </Container>
    </ThemeWrapper>
  );
}
