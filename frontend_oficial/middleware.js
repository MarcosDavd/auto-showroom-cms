import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    //request.cookies.get(), no next/headers cookies()
    //dentro de middleware.js el objeto request ya te 
    // da acceso directo a las cookies, es la API específica de este contexto
    const accessToken = request.cookies.get('access_token')?.value;
    const isApiRoute = request.nextUrl.pathname.startsWith('/api/');

    if (!accessToken) {
        return handleUnauthorized(request, isApiRoute);
    }

    try {
        const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
        await jwtVerify(accessToken, accessSecret);
        return NextResponse.next();
    } catch (error) {
        return handleUnauthorized(request, isApiRoute);
    }
}

function handleUnauthorized(request, isApiRoute) {
    if (isApiRoute) {
        return NextResponse.json(
            { ok: false, message: 'No autenticado' },
            { status: 401 }
        );
    }
    return NextResponse.redirect(new URL('/login-administration', request.url));
}

export const config = {
    matcher: [
        '/administration/:path*',
        '/api/autos/crearAuto',
        '/api/autos/actualizarAuto',
        '/api/autos/eliminarAuto',
        '/api/marcas/crearMarca',
        '/api/modelos/crearModelo',
    ],
};
