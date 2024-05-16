import { z } from 'zod';

export const createCartSchema = z
    .object({
        productId: z.number().nonnegative(),
    })
    .required();

export type CreateCartDto = z.infer<typeof createCartSchema>;