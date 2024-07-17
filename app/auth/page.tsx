import AuthForm from '@/components/authorizationForm/authorizationForm';
import {type Metadata } from 'next';

export const metdata: Metadata = {
    title: "Dabas Travel Blogs",
    description: "Dabas Travel Blogs Authorization Page."
}

export default function Autharization () {
    return (
        <AuthForm />    
    );
}