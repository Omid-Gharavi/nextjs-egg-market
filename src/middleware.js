import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
    const cookieStore = cookies(); // Initialize cookies from headers
    const token = cookieStore.get('token') ? JSON.parse(cookieStore.get('token').value) : null;

    if (!token) {
        return NextResponse.redirect(new URL('/auth/register', request.url));
    }

    // const pathname = request.nextUrl.pathname
    // const response = NextResponse.next()
    // response.headers.set('x-pathname', pathname)
    // return response
    // return NextResponse.next();
}


export const config = {
    matcher: ['/my', '/my/:path*']
}