import { Box, Typography } from "@mui/material";
import PageHeading from "./pageHeading";

export default async function About () {
    return(
        <Box sx={{backgroundColor: '#ebebed', p: 2, borderRadius: 1, m:1, mt: 0}}>
            <PageHeading heading="About Us" />
            <Typography
            component={"p"}
                textAlign={"justify"}
                sx={{mt: 2, textIndent: '2em'}}
                paragraph={true}
            >
                Welcome to TripTales, your ultimate travel companion! Whether you're a seasoned globetrotter or planning your first big adventure, TripTales is here to inspire, inform, and guide you through the wonderful world of travel.
            </Typography>
            <Typography
                paragraph={true}
                textAlign={"justify"}
                sx={{textIndent: '1.5em'}}            
            >
                TripTales was founded by avid travelers who have explored multiple countries across all continents. What started as a personal blog to document our adventures has grown into a vibrant community of travel enthusiasts. We love sharing our experiences and tips with fellow travelers and are committed to helping you discover the best the world has to offer. 
            </Typography>
        </Box>
        
    ); 
}