import { z } from 'zod';

export const createCitySchema = z
    .object({
        name: z.string().max(64),
        address: z.string().max(128),
        longitude: z.number(),
        latitude: z.number(),
        image: z.string().max(256),
    })
    .required();

export type CreateCityDto = z.infer<typeof createCitySchema>;