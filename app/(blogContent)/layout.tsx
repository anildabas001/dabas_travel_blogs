import Header from "@/components/header/header";
import { Container, Box } from "@mui/material";
import { ReactNode } from "react";

export default function BlogLayout ({children}: {children: ReactNode}) {
    return (
        <Container sx={{p: 0}} maxWidth="lg">
            <Header title={"TripTales"}></Header>
            <main>
                <Box sx={{p: 2}}>
                    {children}
                </Box>
            </main>                        
        </Container> 
    );
}