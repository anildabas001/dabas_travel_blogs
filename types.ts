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

export type Status =  'success' | 'fail'

export type APIFormat = {status: Status, message: string[], data: {}}

export type UserData = {email: string; name: string}