import React, {type ReactNode} from "react";
import Button from '@mui/material/Button';
import { useFormStatus } from "react-dom";

export default function submitButton ({children}: {children: ReactNode}) {
    let {pending} = useFormStatus();

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={pending}
        >
            {children}
        </Button>
    ); 
}