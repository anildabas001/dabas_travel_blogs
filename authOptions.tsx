import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {validateEmail} from '@/lib/utility';
import {signInDbVerify} from '@/lib/authDbTransactions';
import {comparePassword} from '@/lib/bcrypt';

function validateLoginFields(email: string | undefined, password: string | undefined): boolean {
    let isValid = true;
    if (!email || !password) {
        isValid = false;          
    } else {
        if (!validateEmail(email)) {
            isValid = false;
        } 
        if (password.length < 6) {
            isValid = false;
        }
    }

    return isValid;
}

const authOptions: NextAuthOptions = {
    // Configure authentication providers
    session: {
        strategy: "jwt",
    },
    providers: [      
        CredentialsProvider({            
            credentials: {
                email: { type: "text" },
                password: { type: "password" }
            },

            async authorize(credentials, request) {
                let isLoggedIn = false;

                //get email and password

                let email = credentials?.email;
                let password = credentials?.password;

                //validate both the fields

                let isValid = validateLoginFields(email, password);

                if (!isValid) {
                    throw new Error('Please fill the login form correctly.');
                }

                //verify login fields with db
                let userDb;
                try {
                    userDb = await signInDbVerify(email as string);                    
                } catch (err: any) {
                    throw new Error('Login failed.');
                }

                if (!(userDb?.email && userDb?.password)) {
                    throw new Error('Email doesn\'t exist.');
                } 

                let passwordVerify = await comparePassword(userDb.password, password as string);

                if (!passwordVerify) {
                    throw new Error('Incorrect Password.');
                } else {
                    isLoggedIn = true;
                }
                
                //throw Error if login failed else send object with email

                if (isLoggedIn) {
                  return { name: userDb, email: userDb.email, id: userDb.id };
                } else {
                  return null;
                }
            },
        })
    ],
}

export default authOptions;
  
