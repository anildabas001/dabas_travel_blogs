export type formState = {
    message: string[];
    status: 'fail' | 'success' | '';
}

export type signUpData = {
    email: string;
    password: string;
    name: string;
}

export enum FormType {
    'login' = 'Login',
    'signUp' = 'Sign up'
}