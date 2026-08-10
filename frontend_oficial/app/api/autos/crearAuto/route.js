import { prisma } from '../../../../lib/prisma';
import { uploadImage } from '../../../../lib/cloudinary';
import { autoSchema } from '../../../../lib/validations/auto';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();

    const parsed = autoSchema.safeParse({
      marca: formData.get('marca'),
      modelo: formData.get('modelo'),
      anio: formData.get('anio'),
      kilometraje: formData.get('kilometraje'),
      patente: formData.get('patente'),
      precio: formData.get('precio'),
      estado: formData.get('estado'),
      descripcion: formData.get('descripcion') ?? '',
      images: formData.getAll('images'),
    });

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

    const { marca, modelo, anio, kilometraje, patente, precio, estado, descripcion, images } =
      parsed.data;

    const results = await Promise.all(
      images.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return uploadImage(buffer);
      })
    );

    const auto = await prisma.auto.create({
      data: {
        marca,
        modelo,
        anio,
        kilometraje,
        patente,
        precio,
        estado,
        descripcion: descripcion || null,
        urlImagen: results.map((r) => r.secure_url),
        publicIdImagen: results.map((r) => r.public_id),
      },
    });

    return Response.json({ ok: true, data: auto });
  } catch (error) {
    console.log(error)
    if (error.code === 'P2002') {
      return Response.json(
        { ok: false, message: 'Ya existe un auto registrado con esa patente' },
        { status: 409 }
      );
    }

    return Response.json(
      {
        ok: false,
        message: 'No se pudo crear el auto',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
