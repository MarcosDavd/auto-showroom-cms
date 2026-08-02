import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const autos = await prisma.auto.findMany({
      orderBy: {
        creadoEn: 'desc',
      },
    });

    return Response.json({
      ok: true,
      data: autos,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: 'No se pudieron obtener los autos',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
