import { signUpData } from '@/types';
import {query} from './db';
import { type Status } from "@/types";

export async function saveUsertoDb ({name, email, password}: signUpData) {
    const text = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id';
    const values = [name, email.toLowerCase(), password];
     
    const res = await query(text, values);

    return res.rows[0];
}

export async function signInDbVerify (email: string) {
    const text = 'SELECT id, email, password, name from users where email=$1 Limit 1';
    const values = [email.toLowerCase()];
    
    const res = await query(text, values);

    return res.rows[0];
}

export async function getUserDetails (email: string) {
    const text = 'SELECT email, name from users where email=$1 Limit 1';
    const values = [email.toLowerCase()];
    
    const res = await query(text, values);

    return res.rows[0];
}

export async function getRecentBlogs () {
    const text = 'SELECT * from posts ORDER BY publicationDate DESC LIMIT 3';

    const res = await query(text);
    console.log('most recent rows', res.rows)
    return res.rows;
}