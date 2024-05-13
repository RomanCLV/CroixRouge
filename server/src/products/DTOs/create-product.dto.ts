import { z } from 'zod';

export const createProductSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    state: z.number(),
    city: z.object({ id: z.number() }),
    size: z.object({ id: z.number() }),
    gender: z.object({ id: z.number() }),
    category: z.object({ id: z.number() }),
  })
  .required();

export type CreateProductDto = z.infer<typeof createProductSchema>;