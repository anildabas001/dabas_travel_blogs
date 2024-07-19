import React, {type ReactNode} from "react";
import Button from '@mui/material/Button';
import { useFormStatus } from "react-dom";
import { FormType } from '@/types';

export default function SubmitButton ({children, formType, disabled }: {children: ReactNode; formType: string; disabled: boolean}) {
    let {pending} = useFormStatus();
    console.log('dssddfs', formType, disabled)
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formType === FormType.login ? disabled : pending}
        >
            {children}
        </Button>
    ); 
}