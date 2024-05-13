import { z } from 'zod';

export const updateImageSchema = z
    .object({
        imagePath: z.string().default("")
    })
    .required();

export type UpdateImageDto = z.infer<typeof updateImageSchema>;