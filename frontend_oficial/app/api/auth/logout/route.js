import { prisma } from '../../../../lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request) {
    const cookieStore = await cookies();

    try {
        const accessToken = cookieStore.get('access_token')?.value;

        if (accessToken) {
            const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
            const { payload } = await jwtVerify(accessToken, accessSecret);

            await prisma.admin.update({
                where: { id: Number(payload.sub) },
                data: { refreshTokenHash: null },
            });
        }
    } catch (error) {
        console.error(error);
    }
    //si o si usar los path sino no se diferencia que cookie borrar
    cookieStore.delete({ name: 'access_token', path: '/' });
    cookieStore.delete({ name: 'refresh_token', path: '/api/auth/refresh' });

    return Response.json({ ok: true, message: 'Sesión cerrada' }, { status: 200 });
}
