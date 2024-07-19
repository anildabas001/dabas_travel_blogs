'use client';
import React, {type ReactNode} from "react";
import { FormType } from "@/types";

export default function  CustormForm ({children, action, formType, onSubmit}: {children: ReactNode; action: (formData: FormData) => void; onSubmit: (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => void, formType: FormType}) {
    
    let formElement: ReactNode;

    if (formType === FormType.login) {
        formElement = (<form onSubmit={onSubmit}>
            {children}
        </form>);
    } else {
        formElement = (<form action={action}>
            {children}
        </form>);
    }
    return (
        <>{formElement}</>
    ) 
}