import { Box, Typography } from "@mui/material";

export default function PageHeading ({heading}: {heading: string}) {
    return (
        <Box sx={{mt: 2}}>
            <Typography
                component="h3"
                variant="h3"
                textAlign={"center"}
            >
                {heading}
            </Typography>
        </Box>       
    );
}