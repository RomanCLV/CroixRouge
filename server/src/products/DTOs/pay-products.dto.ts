import { z } from 'zod';

export const payProductSchema = z
  .object({
    products: z.number().nonnegative().array(),
  })
  .required();

export type PayProductDto = z.infer<typeof payProductSchema>;