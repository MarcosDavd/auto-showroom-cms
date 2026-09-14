import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const patente = searchParams.get('patente');

    if (!patente) {
      return Response.json(
        {
          ok: false,
          message: 'Debe proporcionar una patente',
        },
        { status: 400 }
      );
    }

    const auto = await prisma.auto.findUnique({
      where: {
        patente: patente,
      },
    });

    if (!auto) {
      return Response.json(
        {
          ok: false,
          message: 'No se encontró ningún auto con esa patente',
        },
        { status: 404 }
      );
    }

    return Response.json({
      ok: true,
      data: auto,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: 'No se pudo obtener el auto',
        error: error.message,
      },
      { status: 500 }
    );
  }
}