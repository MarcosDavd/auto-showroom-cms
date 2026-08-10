import { prisma } from '../../../../lib/prisma';

export async function DELETE(request) {
    try {
        const {searchParams} = new URL(request.url);
        const idParam = searchParams.get('id');
        console.log('ID del auto a eliminar:', idParam);
        const id = parseInt(idParam, 10);// tengo que parsearlo sino Prisma tira error 
        const existingAuto = await prisma.auto.findFirst({
            where: {
                id: id,
            },
        });
        console.log('Auto encontrado:', existingAuto);
        if (!existingAuto) {
            return Response.json(
                {
                    ok: false,
                    message: 'Auto no encontrado',
                },
                { status: 404 }
            );
        }
        await prisma.auto.delete({
            where: {
                id: id,
            },
        });
        return Response.json(
            {
                ok: true,
                message: 'Auto eliminado correctamente',
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                ok: false,
                message: 'Error al eliminar el auto',
            },
            { status: 500 }
        );
    }
}