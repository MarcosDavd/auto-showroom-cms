import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return Response.json(
                {
                    ok: false,
                    message: " email y contraseña son requeridos"
                }, {
                status: 400
            }
            );
        }
        const admin = await prisma.admin.findUnique({
            where: { email }
        })
        if (!admin) {
            return Response.json(
                {
                    ok: false,
                    message: "Credenciales invalidas"
                }, {
                status: 401
            }
            )
        }
        const isValidate = await bcrypt.compare(password, admin.passwordHash);
        if (!isValidate) {
            return Response.json({
                ok: false,
                message: "Credenciales invalidas"
            }, {
                status: 401
            })
        }
        const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
        const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

        const accessToken = await new SignJWT({ email: admin.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setSubject(String(admin.id))
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(accessSecret);

        const refreshToken = await new SignJWT({ email: admin.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setSubject(String(admin.id))
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(refreshSecret);
        //guardo el refresh tokenen la bd
        const refreshTokenHash = createHash('sha256').update(refreshToken).digest('hex');
        await prisma.admin.update({
            where: { id: admin.id },
            data: {
                refreshTokenHash,
                lastLoginAt: new Date(),
            }
        })
        const cookieStore = await cookies();
        cookieStore.set('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 15,
            path: '/',
        });
        cookieStore.set('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/api/auth/refresh',
        });

        return Response.json(
            {
                ok: true,
                message: 'Login exitoso'
            }, {
            status: 200
        }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            {
                ok: false,
                message: 'Error al iniciar sesión',
            },
            { status: 500 }
        );
    }
}