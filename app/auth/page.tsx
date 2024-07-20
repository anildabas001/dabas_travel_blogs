import AuthForm from '@/components/authorizationForm/authorizationForm';
import { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

const metadata={}
export default function Autharization () {
    return (
        <Suspense fallback={ 
            <Box sx={{display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center'}} >
                <CircularProgress/>
            </Box>}>
            <AuthForm />
        </Suspense>
            
    );
}