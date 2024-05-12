import { z } from 'zod';

export const citiesSchema = z
    .object({
        limit: z.number().nonnegative().optional(),
    })
    .optional();

export type CitiesDto = z.infer<typeof citiesSchema>;