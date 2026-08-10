import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

const ESTADOS_VALIDOS = ['OKM', 'USADO'];
const LIMIT_MAXIMO = 50;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const where = {};

    const marca = searchParams.get('marca');
    if (marca) where.marca = marca;

    const modelo = searchParams.get('modelo');
    if (modelo) where.modelo = modelo;

    const anioParam = searchParams.get('anio');
    if (anioParam) {
      const anio = Number(anioParam);
      if (Number.isInteger(anio)) where.anio = anio;
    }

    const precioMinParam = searchParams.get('precioMin');
    const precioMaxParam = searchParams.get('precioMax');
    if (precioMinParam || precioMaxParam) {
      where.precio = {};
      const precioMin = Number(precioMinParam);
      const precioMax = Number(precioMaxParam);
      if (precioMinParam && !Number.isNaN(precioMin)) where.precio.gte = precioMin;
      if (precioMaxParam && !Number.isNaN(precioMax)) where.precio.lte = precioMax;
    }

    const estado = searchParams.get('estado');
    if (estado && ESTADOS_VALIDOS.includes(estado)) where.estado = estado;

    const pageParam = Number(searchParams.get('page'));
    const limitParam = Number(searchParams.get('limit'));
    const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
    const limit =
      Number.isInteger(limitParam) && limitParam > 0
        ? Math.min(limitParam, LIMIT_MAXIMO)
        : 12;

    const [autos, total] = await Promise.all([
      prisma.auto.findMany({
        where,
        orderBy: {
          creadoEn: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.auto.count({ where }),
    ]);

    return Response.json({
      ok: true,
      data: autos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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
