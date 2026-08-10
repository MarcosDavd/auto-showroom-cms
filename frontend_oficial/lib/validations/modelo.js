import { z } from 'zod';

export const modeloSchema = z.object({
  nombre: z.string().trim().min(1, 'El modelo es obligatorio').max(50),
  marcaId: z.coerce.number().int('Elegí una marca').positive('Elegí una marca'),
});
