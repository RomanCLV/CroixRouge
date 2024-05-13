import { z } from 'zod';

export const isAdminSchema = z
    .object({
        city: z.string(),
    })
    .required();

export type IsAdminDto = z.infer<typeof isAdminSchema>;