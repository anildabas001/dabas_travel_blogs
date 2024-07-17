'use server';

import {type formState} from '@/types';
import {encyptPassword} from '@/lib/bcrypt';
import { signUpData } from '@/types';
import {saveUsertoDb} from '@/lib/authDbTransactions';

function validateEmail (email: string): boolean {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
}


function validate ({name, email, password}: {name: string; email: string; password: string;}): {message: string[] ; formValid: boolean} {
    let formValid: boolean = true;
    let message: string[] = [];
    
    if (!name || !email || !password) {
        formValid = false;
        message.push('Please fill the complete sign up form.');
    } else {
        if (!validateEmail(email)) {
            formValid = false;
            message.push('Please enter the valid email address.')
        }
        else if (password.length < 6) {
            formValid = false;
            message.push('Password must be at least 6 characters long.')
        }
    
    }
    
    return  {
        formValid,
        message
    }
}

export async function signUpAction (initialState: formState, formData: FormData): Promise<formState> {
    let message: string[] = [];
    let status: 'success' | 'fail' = 'success';
    //retrieve form fields from formData
    let name = formData.get('name') as string;
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;

    //validating the form data
    let validityResult = validate(
        {
            name: name === 'null' ? '' : name, 
            email: email === 'null' ? '' : email, 
            password: password === 'null' ? '' : password
        }
    );

    if (!validityResult.formValid) {
        return {
            status: 'fail',
            message: validityResult.message,            
        }
    }
    
    //encrypting the password

    let encryptedPassword = await encyptPassword(password);

    //save the user details to db

    try {
        let userId = await saveUsertoDb({name, email, password: encryptedPassword});
        console.log(userId);
    } catch (error: any) {
        if (error.message.includes('duplicate key')) {
            message.push('Email already exists.');
        } else {
            message.push('Error occured while registering user.');
        }
        status = 'fail';
    }   
    
    return { message: message, status: status }
}