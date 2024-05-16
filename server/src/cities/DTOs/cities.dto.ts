import { z } from 'zod';

export const citiesSchema = z
    .object({
        limit: z.number().nonnegative().default(0).nullable(),
        name: z.string().nullable().optional(),
    })
    .optional();

export type CitiesDto = z.infer<typeof citiesSchema>;