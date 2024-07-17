import { signUpData } from '@/types';
import {query} from './db';

export async function saveUsertoDb ({name, email, password}: signUpData) {
    const text = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id';
    const values = [name, email.toLowerCase(), password];
     
    const res = await query(text, values)

    return res;
}