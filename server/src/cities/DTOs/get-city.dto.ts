import { z } from 'zod';

export const getCitySchema = z
    .object({
        city: z.string(),
    })
    .required();

export type GetCityDto = z.infer<typeof getCitySchema>;