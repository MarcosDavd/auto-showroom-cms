import { uploadImage } from '../../../lib/cloudinary';
import { v2 as cloudinary } from 'cloudinary';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images');

    if (!files.length || !(files[0] instanceof Blob)) {
      return Response.json(
        { ok: false, message: 'No se recibió ningún archivo' },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return uploadImage(buffer);
      })
    );

    return Response.json({
      ok: true,
      urls: results.map((r) => r.secure_url),
      publicIds: results.map((r) => r.public_id),
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: 'No se pudieron subir las imágenes',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/////////////////////////////////////////////////////////////////////
///////////////DELETE FUNCTION//////////////////////////////
///////////////////////////////////////////////////////////////////////////

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);

        const publicIds = searchParams.getAll('publicId');

        if (!publicIds.length) {
            return Response.json(
                {
                    ok: false,
                    message: 'No se recibieron publicIds'
                },
                { status: 400 }
            );
        }

        const results = await Promise.all(
            publicIds.map((publicId) =>
                cloudinary.uploader.destroy(publicId)
            )
        );

        return Response.json({
            ok: true,
            message: 'Imágenes eliminadas correctamente',
            results
        });

    } catch (error) {
        return Response.json(
            {
                ok: false,
                message: 'No se pudieron eliminar las imágenes',
                error: error.message
            },
            { status: 500 }
        );
    }
}