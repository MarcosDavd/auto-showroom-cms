import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const marcas = await prisma.marca.findMany({
      orderBy: { nombre: 'asc' },
    });

    return Response.json({ ok: true, data: marcas });
  } catch (error) {
    return Response.json(
      { ok: false, message: 'No se pudieron obtener las marcas' },
      { status: 500 }
    );
  }
}
