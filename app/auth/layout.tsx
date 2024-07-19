import { type ReactNode } from "react"
import { Grid } from "@mui/material";

export default function AuthLayout ({children}: {children: ReactNode;}) {
    return (
        <Grid container style={{width: '100%', height: '100%'}}>
            {children}
        </Grid>                
           
    )
}