import { z } from 'zod';

export const marcaSchema = z.object({
  nombre: z.string().trim().min(1, 'La marca es obligatoria').max(50),
});
