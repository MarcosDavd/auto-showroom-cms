import { prisma } from '../../../../lib/prisma';
import { modeloSchema } from '../../../../lib/validations/modelo';

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = modeloSchema.safeParse(body);

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

    const modelo = await prisma.modelo.create({
      data: parsed.data,
    });

    return Response.json({ ok: true, data: modelo });
  } catch (error) {
    if (error.code === 'P2002') {
      return Response.json(
        { ok: false, message: 'Esa marca ya tiene un modelo con ese nombre' },
        { status: 409 }
      );
    }

    if (error.code === 'P2003') {
      return Response.json(
        { ok: false, message: 'La marca elegida no existe' },
        { status: 400 }
      );
    }

    return Response.json(
      { ok: false, message: 'No se pudo crear el modelo' },
      { status: 500 }
    );
  }
}
