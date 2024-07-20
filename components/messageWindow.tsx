import { Paper, Grid, Box,  Typography} from "@mui/material";
import { StaticImageData } from "next/image";

export default function MessageWindow ({title, message, image}: {title: string; message: string; image: StaticImageData}) {
    return(
        <Paper sx={{
            position: 'relative',
            mb: 4,
            mt: 2,
            height: "270px",
            color: '#fff',
            backgroundColor: '#000',
            overflow: 'hidden', // Ensure the overlay covers the entire Paper component
        } }>
            <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: '0.5'
        }}
      />
            <Grid container sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item md={6}>
                  <Box
                    sx={{
                      position: 'relative',
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
                    }}
                  >
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                      {title}!!
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      {message}
                    </Typography>            
                  </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}