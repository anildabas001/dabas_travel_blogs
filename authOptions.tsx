import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

            async authorize(credentials, _request) {
                const isLoggedIn = false;

                if (isLoggedIn) {
                  return { id: "0" };
                } else {
                  return null;
                }
            },
        })
    ],
}

export default authOptions;
  
