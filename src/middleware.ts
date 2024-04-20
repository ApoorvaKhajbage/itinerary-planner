import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path  = request.nextUrl.pathname

    const isPublicPath = path === '/sign-in' || path === '/sign-up' || path === '/verifyemail' || path === '/' || path === '/verifymessage'
    const isPrivatePath = path === '/dashboard' || path === '/profile' || path === '/form'
    const token = request.cookies.get('token')?.value || ''

    if(isPrivatePath && !token){
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/verifyemail',
    '/dashboard',
    '/profile',
    '/form',
  ],
}