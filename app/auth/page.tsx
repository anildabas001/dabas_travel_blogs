import AuthForm from '@/components/authorizationForm/authorizationForm';
import { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import Progress from '@/components/circularProgress';

const metadata={}
export default function Autharization () {
    return (
        <Suspense fallback={<Progress />}>
            <AuthForm />
        </Suspense>            
    );
}