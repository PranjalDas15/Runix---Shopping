import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const customer = req.cookies.get('auth_Customer'); 
    const seller = req.cookies.get('auth_Seller');

    if(req.nextUrl.pathname.startsWith('/user')) {
        if(customer){
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', req.url)); 
        }
    }

    if(req.nextUrl.pathname.startsWith('/admin')) {
        if(seller) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
}

export const config = {
    matcher: ['/user/:path', '/user' , '/admin/:path', '/admin']
}