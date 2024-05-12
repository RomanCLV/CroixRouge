import { z } from 'zod';

export const citiesSchema = z
    .object({
        limit: z.number().nonnegative().default(0),
        name: z.string().optional(),
    })
    .optional();

export type CitiesDto = z.infer<typeof citiesSchema>;