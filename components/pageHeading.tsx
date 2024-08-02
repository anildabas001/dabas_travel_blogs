import { Box, Typography } from "@mui/material";

export default function PageHeading ({heading}: {heading: string}) {
    return (
        <Box sx={{mt: 2}}>
            <Typography
                component="h4"
                variant="h4"
                textAlign={"center"}
            >
                {heading}
            </Typography>
        </Box>       
    );
}