'use client';
import React, {type ReactNode} from "react";
import { FormType } from "@/types";
import { Box } from "@mui/material";

export default function  CustormForm ({children, action, formType, onSubmit}: {children: ReactNode; action: (formData: FormData) => void; onSubmit: (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => void, formType: FormType}) {
    
    let formElement: ReactNode;

    if (formType === FormType.login) {
        formElement = (<Box component="form" onSubmit={onSubmit}>
            {children}
        </Box>);
    } else {
        formElement = (<Box component="form" action={action}>
            {children}
        </Box>);
    }
    return (
        <>{formElement}</>
    ) 
}