import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_IMAGES = 8;

const imageSchema = z
  .instanceof(File, { message: 'Debe ser un archivo' })
  .refine((file) => file.size <= MAX_FILE_SIZE, 'Cada imagen debe pesar como máximo 5MB')
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Formato no soportado (usá png, jpg o webp)'
  );

export const autoSchema = z.object({
  marca: z.string().trim().min(1, 'La marca es obligatoria').max(50),
  modelo: z.string().trim().min(1, 'El modelo es obligatorio').max(50),
  anio: z.coerce
    .number()
    .int('El año debe ser un número entero')
    .min(1900, 'Año inválido')
    .max(new Date().getFullYear() + 1, 'Año inválido'),
  kilometraje: z.coerce
    .number()
    .int('El kilometraje debe ser un número entero')
    .min(0, 'No puede ser negativo')
    .max(2_000_000, 'Valor demasiado alto'),
  patente: z.string().trim().min(1, 'La patente es obligatoria').max(20),
  precio: z.coerce
    .number()
    .positive('El precio debe ser mayor a 0')
    .max(100_000_000, 'Valor demasiado alto'),
  estado: z.enum(['OKM', 'USADO'], 'Elegí el estado del auto'),
  descripcion: z
    .string()
    .trim()
    .max(1000, 'Máximo 1000 caracteres')
    .optional()
    .or(z.literal('')),
  images: z
    .array(imageSchema)
    .min(1, 'Subí al menos una imagen')
    .max(MAX_IMAGES, `Máximo ${MAX_IMAGES} imágenes`),
});

export const autoUpdateSchema = autoSchema
  .omit({ images: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Enviá al menos un campo para actualizar',
  });
