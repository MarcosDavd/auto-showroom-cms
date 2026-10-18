import { prisma } from '@/lib/prisma';

const MAX_LENGTH = 100;

export async function POST(request) {
  try {
    const body = await request.json();
    const marca = typeof body.marca === 'string' ? body.marca.trim() : '';
    const modelo = typeof body.modelo === 'string' ? body.modelo.trim() : '';

    if (!marca && !modelo) {
      return Response.json({ ok: false, message: 'Seleccioná una marca o un modelo.' }, { status: 400 });
    }

    if (marca.length > MAX_LENGTH || modelo.length > MAX_LENGTH) {
      return Response.json({ ok: false, message: 'El filtro supera el largo permitido.' }, { status: 400 });
    }

    await prisma.busquedaFiltro.create({
      data: {
        marca: marca || null,
        modelo: modelo || null,
      },
    });

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json(
      { ok: false, message: 'No se pudo registrar la búsqueda.' },
      { status: 500 }
    );
  }
}