import { prisma } from '../../../../lib/prisma';
import { autoUpdateSchema } from '../../../../lib/validations/auto';

export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const idParam = searchParams.get('id');
        const id = parseInt(idParam, 10);

        const existingAuto = await prisma.auto.findFirst({
            where: { id },
        });

        if (!existingAuto) {
            return Response.json(
                {
                    ok: false,
                    message: 'Auto no encontrado',
                },
                { status: 404 }
            );
        }

        const body = await request.json();
        const parsed = autoUpdateSchema.safeParse(body);

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

        const { descripcion, ...resto } = parsed.data;
        const data = { ...resto };
        if (descripcion !== undefined) {
            data.descripcion = descripcion || null;
        }

        const auto = await prisma.auto.update({
            where: { id },
            data,
        });

        return Response.json({ ok: true, data: auto });
    } catch (error) {
        if (error.code === 'P2002') {
            return Response.json(
                { ok: false, message: 'Ya existe un auto registrado con esa patente' },
                { status: 409 }
            );
        }

        return Response.json(
            {
                ok: false,
                message: 'No se pudo actualizar el auto',
            },
            { status: 500 }
        );
    }
}
