import { prisma } from '../../../../lib/prisma';
import { marcaSchema } from '../../../../lib/validations/marca';

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = marcaSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          ok: false,
          message: 'Datos inválidos',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const marca = await prisma.marca.create({
      data: parsed.data,
    });

    return Response.json({ ok: true, data: marca });
  } catch (error) {
    if (error.code === 'P2002') {
      return Response.json(
        { ok: false, message: 'Ya existe una marca con ese nombre' },
        { status: 409 }
      );
    }

    return Response.json(
      { ok: false, message: 'No se pudo crear la marca' },
      { status: 500 }
    );
  }
}
