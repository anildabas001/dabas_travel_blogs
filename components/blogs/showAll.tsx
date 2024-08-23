'use client';

import { Box, Button } from "@mui/material";
import {useRouter} from 'next/navigation';

export default function ShowAll () {
    const router = useRouter();
    return(
        <Box sx={{p: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="contained" sx={{color:"#fff", p: 1, mt: 1}} onClick={() => {router.push('/blogs')}}>
                Show All the tales
            </Button>
        </Box>
    );
}