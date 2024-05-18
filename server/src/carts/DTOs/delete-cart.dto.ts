import { z } from 'zod';

export const deleteCartSchema = z
    .object({
        productId: z.number().nonnegative().nullable(),
    })
    .required();

export type DeleteCartDto = z.infer<typeof deleteCartSchema>;