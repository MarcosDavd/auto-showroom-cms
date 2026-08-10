import { prisma } from '../../../../lib/prisma';
import { jwtVerify, SignJWT } from 'jose';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refresh_token')?.value;

        if (!refreshToken) {
            return Response.json(
                { ok: false, message: 'No autenticado' },
                { status: 401 }
            );
        }

        const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);
        const { payload } = await jwtVerify(refreshToken, refreshSecret);

        const admin = await prisma.admin.findUnique({
            where: { id: Number(payload.sub) },
        });

        const refreshTokenHash = createHash('sha256').update(refreshToken).digest('hex');

        if (!admin || admin.refreshTokenHash !== refreshTokenHash) {
            return Response.json(
                { ok: false, message: 'Sesión inválida' },
                { status: 401 }
            );
        }

        const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
        const newAccessToken = await new SignJWT({ email: admin.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setSubject(String(admin.id))
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(accessSecret);

        cookieStore.set('access_token', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 15,
            path: '/',
        });

        return Response.json({ ok: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json(
            { ok: false, message: 'No autenticado' },
            { status: 401 }
        );
    }
}