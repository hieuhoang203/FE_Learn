import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes for different roles
const protectedRoutes = {
  admin: ['/admin'],
  teacher: ['/teacher'],
  student: ['/student'],
  user: ['/user']
}

const authRoutes = ['/login', '/register'];
const publicRoutes = ['/homie', '/', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route =>
    pathname.startsWith(route)
  );

  // If user is authenticated and trying to access auth routes
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/homie', request.url));
  }

  // Check if accessing protected routes
  const allProtectedRoutes = Object.values(protectedRoutes).flat();
  const isProtectedRoute = allProtectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // If user is not authenticated and trying to access protected route
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based route protection
  if (token) {
    // In a real application, you would decode the JWT token to get user role
    // For demo purposes, we'll simulate role checking

    if (pathname.startsWith('/admin')) {
      // Only admin can access admin routes
      // In real app: check if user role is admin
    } else if (pathname.startsWith('/teacher')) {
      // Only teachers and admins can access teacher routes
      // In real app: check if user role is teacher or admin
    } else if (pathname.startsWith('/student')) {
      // Only students and admins can access student routes
      // In real app: check if user role is student or admin
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
