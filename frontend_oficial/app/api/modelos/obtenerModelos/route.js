import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const modelos = await prisma.modelo.findMany({
      orderBy: { nombre: 'asc' },
    });

    return Response.json({ ok: true, data: modelos });
  } catch (error) {
    return Response.json(
      { ok: false, message: 'No se pudieron obtener los modelos' },
      { status: 500 }
    );
  }
}
