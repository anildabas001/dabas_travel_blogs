import { type NextRequest, NextResponse } from "next/server";
import authOptions from "./app/api/auth/[...nextauth]/authOptions";
import { getToken } from "next-auth/jwt";

export default async function middleware (request: NextRequest) {
    let validUserSession: boolean = false;
    const usersession = await getToken({ req: request, secret: process.env.AUTH_SECRET});
    const url = request.nextUrl.clone()
    const requestHeaders = new Headers(request.headers); 

    if (usersession) {               
        requestHeaders.set("x-user", JSON.stringify(usersession));   
        validUserSession = true;
    }

    if (request.nextUrl.pathname === '/auth' && validUserSession) {
        console.log('redirecting')
        url.pathname = '/'
        return NextResponse.redirect(url);
    }

    if (request.nextUrl.pathname === '/write' && !validUserSession) {
        console.log('redirecting')
        url.pathname = '/auth'
        return NextResponse.redirect(url);
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}      

export const config = {
    matcher: ['/', '/write', '/api/posts', '/auth']
}