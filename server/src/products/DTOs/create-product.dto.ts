import { z } from 'zod';

export const createProductSchema = z
  .object({
    title: z.string().max(64),
    description: z.string().max(512),
    price: z.number().nonnegative(),
    state: z.number().min(1).max(5),
    city: z.string(),
    size: z.string(),
    gender: z.string(),
    category: z.string(),
    images: z.string().array()
  })
  .required();

export type CreateProductDto = z.infer<typeof createProductSchema>;